package rdfbones.rdfdataset;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.GraphLib;
import rdfbones.lib.SPARQLDataGetter;
import rdfbones.lib.SPARQLUtils;
import rdfbones.lib.SubSPARQLDataGetter;

public class Graph {

  //Input
  public String inputNode;
  
  //Triples
  public List<Triple> dataTriples;
  public List<Triple> schemeTriples;
  
  //Data Input - Storage
  public List<Triple> triplesToStore;
  public List<String> newInstances;
  public List<String> inputInstances;
  public List<String> constantLiterals;
  public List<String> inputLiterals;
  public List<String> inputClasses;
  //Data Input - type query
  public List<String> classesToSelect;
  public List<Triple> typeQueryTriples;

  //Data Retrival
  public List<Triple> dataRetreivalQuery;
  public List<String> urisToSelect;
  public List<String> literalsToSelect;

  //Type retriever query
  public Map<String, Graph> subGraphs = new HashMap<String, Graph>();
  public Map<String, Graph> optionalSubGraphs = new HashMap<String, Graph>();

  public JSONArray existingData = new JSONArray();
  public Map<String, String> existingTriples;

  public SubSPARQLDataGetter dataRetriever;
  public SubSPARQLDataGetter typeRetriever;
  public NewURIMaker newUriMaker;
  
  private static final Log log = LogFactory.getLog(Graph.class);

  public Graph() {
    // TODO Auto-generated constructor stub
  }
  
  public void setNewUriMaker(NewURIMaker newUriMaker){
    this.newUriMaker = newUriMaker;
    for(String key : this.subGraphs.keySet()){
      this.subGraphs.get(key).setNewUriMaker(newUriMaker);
    }
  }
  
  public void initNodes(List<Triple> dataTriples, List<Triple> schemeTriples){
    
    this.dataTriples = dataTriples;
    this.schemeTriples = GraphLib.getSchemeTriples(dataTriples, schemeTriples);
    GraphLib.setDataInputVars(this);
    GraphLib.setDataRetrievalVars(this);
  }
  
  public void init(VitroRequest vreq) throws JSONException{
   
    this.dataRetriever = new SubSPARQLDataGetter(vreq, this.dataRetreivalQuery,  
        this.urisToSelect, this.literalsToSelect, this.inputNode);
    if(this.typeQueryTriples.size() > 0 && this.inputClasses.size() > 0){
      this.typeRetriever = new SubSPARQLDataGetter(vreq,
          this.typeQueryTriples, this.classesToSelect, null, this.inputClasses.get(0));
    }
    //Subgraph initialisation
    for(String subGraphKey : this.subGraphs.keySet()){
      Graph subGraph = this.subGraphs.get(subGraphKey);
      subGraph.init(vreq);
    }
  }
  
  public void getExistingData(VitroRequest vreq) throws JSONException{
    //This runs only at the main graph
    if(this.inputNode.equals("subject")){
      log.info("ObjectGetter");
      if(vreq.getParameterMap().containsKey("objectUri") || true){ 
        //The existing data has to be queried
        getGraphData(vreq.getParameter("subject"));
      }
    }
  }
  
  public JSONArray getGraphData(String value) throws JSONException{
 
    //Here the parent graph input is used as well
    this.existingData = QueryUtils.getJSON(this.dataRetriever.getData(value));
    this.getSubGraphData();
    return this.existingData;
  }
  
  private void getSubGraphData(){
    for(int i = 0; i < this.existingData.length(); i++){
        for(String key : this.subGraphs.keySet()){
          Graph subGraph = this.subGraphs.get(key);
        try {
          JSONObject object = this.existingData.getJSONObject(i);
          String initialValue = object.getString(subGraph.inputNode);
          object.put(key, subGraph.getGraphData(initialValue));
        } catch (JSONException e) {
          e.printStackTrace();
        }
      }
    }
  }
  
  public String saveData(JSONObject inputObject, VitroRequest vreq) throws JSONException{
    
    
    Map<String, String> variableMap = new HashMap<String, String>();
    this.setInstanceMap(inputObject, vreq, variableMap);
    if(this.typeRetriever != null){
      List<Map<String, String>> data = this.typeRetriever.getData(variableMap.get(this.inputClasses.get(0)));
      variableMap.putAll(data.get(0));
    }
    return generateN3(inputObject, vreq, variableMap);
  }
  
  public Map<String, String> getVariableMap(JSONObject inputObject, VitroRequest vreq) throws JSONException{
      
      Map<String, String> variableMap = new HashMap<String, String>();
      this.setInstanceMap(inputObject, vreq, variableMap);
      //this.setTypeMap(inputObject, vreq, variableMap);
      if(this.typeRetriever != null){
        List<Map<String, String>> data = this.typeRetriever.getData(variableMap.get(this.inputClasses.get(0)));
        variableMap.putAll(data.get(0));
      }
      return variableMap;
  }
  
  
  public String saveInitialData(JSONObject inputObject, VitroRequest vreq) throws JSONException{
    return generateN3(inputObject, vreq, this.getVariableMap(inputObject, vreq));
  }
  
  public String saveData(JSONObject inputObject, VitroRequest vreq, 
    String key, String value) throws JSONException{
    
    Map<String, String> variableMap = this.getVariableMap(inputObject, vreq);
    variableMap.put(key, value);
    return generateN3(inputObject, vreq, variableMap);
  }
  
  void setInstanceMap(JSONObject obj, VitroRequest vreq, Map<String, String> instanceMap) throws JSONException{
    
    //New Instances
    for(String newInstance : this.newInstances){
     if(this.inputNode.equals(newInstance)){
      instanceMap.put(newInstance, instanceMap.get(newInstance));
     } else {
       try {
        instanceMap.put(newInstance, this.newUriMaker.getUnusedNewURI(null));
      } catch (InsertException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
     }
    }
    //InputData 
    for(String inputClass : this.inputClasses){
      instanceMap.put(inputClass, obj.getString(inputClass));
    }
    for(String inputInstance : this.inputInstances){
      instanceMap.put(inputInstance, obj.getString(inputInstance));
    }
    for(String inputLiterals : this.inputLiterals){
      instanceMap.put(inputLiterals, obj.getString(inputLiterals));
    }
  } 
  
  public String generateN3(JSONObject inputObject, VitroRequest vreq, Map<String, String> variableMap) throws JSONException{
    
    //Creating string to create
    String triplesToStore = SPARQLUtils.assembleTriples(this.triplesToStore);
    triplesToStore = QueryUtils.subUrisForQueryVars(triplesToStore, variableMap);
    for(String subgraphKey : this.subGraphs.keySet()){
      Graph subGraph = this.subGraphs.get(subgraphKey);
      String key = subGraph.inputNode;
      String value = variableMap.get(key);
      JSONArray array = inputObject.getJSONArray(subgraphKey);
      for(int i = 0; i < array.length(); i++){
        JSONObject jsonObject = array.getJSONObject(i); 
        triplesToStore += subGraph.saveData(jsonObject, vreq, key, value);
      }
    }
    return triplesToStore;
  }
  
  public void debug(int n){
    
    String tab = new String(new char[n]).replace("\0", "\t");
    log.info(tab + "InputNode : " + this.inputNode);

    log.info(tab + "DataTriples : " + ArrayLib.debugTriples(tab, this.dataTriples));
    log.info(tab + "SchemeTriples : " + ArrayLib.debugTriples(tab, this.schemeTriples));
    log.info(tab + "TriplesToStore : " + ArrayLib.debugTriples(tab, this.triplesToStore));
    
    log.info(tab + "newInstances :      " + ArrayLib.debugList(this.newInstances));
    log.info(tab + "inputInstances :      " + ArrayLib.debugList(this.inputInstances));
    log.info(tab + "constantLiterals :      " + ArrayLib.debugList(this.constantLiterals));
    log.info(tab + "inputLiterals :      " + ArrayLib.debugList(this.inputLiterals));
    log.info(tab + "inputClasses :      " + ArrayLib.debugList(this.inputClasses));
    log.info(tab + "classesToSelect :      " + ArrayLib.debugList(this.classesToSelect));
    log.info(tab + "typeQueryTriples :      " + ArrayLib.debugTriples(tab, this.typeQueryTriples));
    
    if(this.dataRetriever != null){
      log.info(tab + "DataRetriever Query : \n      " +  this.dataRetriever.getReadableQuery());
    }
    if(this.typeRetriever != null){
      log.info(tab + "TypeRetriver Query :      " +  this.typeRetriever.getReadableQuery() + "\n");
    }
    
    int k = n + 1;
    log.info(tab + "Subgraphs :  " + subGraphs.keySet().size());
    if(subGraphs.keySet().size() > 0){
      for(String key : subGraphs.keySet()){
        log.info(tab + "Key : " + key);
        subGraphs.get(key).debug(k);
      }  
    }
  }
}
