package rdfbones.rdfdataset;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.GraphLib;
import rdfbones.lib.JSON;
import rdfbones.lib.MainGraphSPARQLDataGetter;
import rdfbones.lib.SPARQLDataGetter;
import rdfbones.lib.SPARQLUtils;
import rdfbones.lib.VariableDependency;
import rdfbones.formProcessing.WebappConnector;

public class Graph {

  // Input
  public String inputNode;

  // Triples
  public List<Triple> dataTriples;
  public List<Triple> schemeTriples;

  // Data Input - Storage
  public List<Triple> triplesToStore;
  public List<String> newInstances;
  public List<String> inputInstances;
  public List<String> constantLiterals;
  public List<String> inputLiterals;
  public List<String> inputClasses;
  // Data Input - type query
  public List<String> classesToSelect;
  public List<Triple> typeQueryTriples;

  // Data Retrival
  public List<Triple> dataRetreivalQuery;
  public List<String> urisToSelect;
  public List<String> literalsToSelect;

  // Type retriever query
  public Map<String, Graph> subGraphs = new HashMap<String, Graph>();
  public Map<String, Graph> optionalSubGraphs = new HashMap<String, Graph>();

  public Map<String, VariableDependency> variableDependencies = 
      new HashMap<String, VariableDependency>();
  public JSONArray existingData = new JSONArray();
  public Map<String, String> existingTriples;
  public Map<String, String> graphDataMap;

  public SPARQLDataGetter dataRetriever;
  public SPARQLDataGetter typeRetriever;
  WebappConnector webapp;
  Graph mainGraph;
  
  public WebappConnector getWebapp() {
    return webapp;
  }

  public void setWebapp(WebappConnector webapp) {
    this.webapp = webapp;
  }

  public Graph() {
    // TODO Auto-generated constructor stub
  }

  public void initNodes(List<Triple> dataTriples, List<Triple> schemeTriples) {

    this.dataTriples = dataTriples;
    this.schemeTriples = GraphLib.getSchemeTriples(dataTriples, schemeTriples);
    GraphLib.setDataInputVars(this);
    GraphLib.setDataRetrievalVars(this);
  }
  
  public void init(WebappConnector webapp) {
    this.webapp = webapp;
    init(this);
  }
  
  public void init(Graph mainGraph) {

    this.mainGraph = mainGraph;
    if(this.inputNode.equals("subject")){
      this.dataRetriever =
          new MainGraphSPARQLDataGetter(mainGraph, this.dataRetreivalQuery, this.urisToSelect,
              this.literalsToSelect);
    } else {
      this.dataRetriever =
          new SPARQLDataGetter(mainGraph, this.dataRetreivalQuery, this.urisToSelect,
              this.literalsToSelect, this.inputNode);
    }
    if (this.typeQueryTriples.size() > 0 && this.inputClasses.size() > 0
        && this.classesToSelect.size() > 0) {
      this.typeRetriever =
          new SPARQLDataGetter(mainGraph, this.typeQueryTriples, this.classesToSelect,
              null, this.inputClasses);
    }
    // Subgraph initialisation
    for (String subGraphKey : this.subGraphs.keySet()) {
      Graph subGraph = this.subGraphs.get(subGraphKey);
      subGraph.init(mainGraph);
    }
  }

  /*
   * Data Retrieval
   */
  public void getExistingData(String subject, String object) {
    
    log("DataRetriever Query : \n      " + this.dataRetriever.getQuery());
    this.existingData = QueryUtils.getJSON(
        ((MainGraphSPARQLDataGetter)this.dataRetriever).getData(subject, object));
    
    this.getSubGraphData();
  }

  public JSONArray getGraphData(String value) {
    // Here the parent graph input is used as well
    this.existingData = QueryUtils.getJSON(this.dataRetriever.getData(value));
    this.getSubGraphData();
    return this.existingData;
  }

  private void getSubGraphData() {
    for (int i = 0; i < this.existingData.length(); i++) {
      for (String key : this.subGraphs.keySet()) {
        Graph subGraph = this.subGraphs.get(key);
        try {
          JSONObject object = JSON.object(this.existingData, i);
          String initialValue = JSON.string(object, subGraph.inputNode);
          object.put(key, subGraph.getGraphData(initialValue));
        } catch (JSONException e) {
          log("Unsuccesful");
          e.printStackTrace();
        }
      }
    }
  }

  /*
   * Saving Data
   */
  
  public String saveInitialData(JSONObject inputObject) {
    Map<String, String> variableMap = new HashMap<String, String>();
    return this.setMapAndSave(inputObject, variableMap);
  }

  public String saveData(JSONObject inputObject, String key, String value) {

    Map<String, String> variableMap = new HashMap<String, String>();
    variableMap.put(key, value);
    return this.setMapAndSave(inputObject, variableMap);
  }
  
  public String setMapAndSave(JSONObject inputObject, Map<String, String> variableMap) {

    this.setInstanceMap(inputObject, variableMap);
    if (this.typeRetriever != null) {
      this.mainGraph.getWebapp().log("Graph.java 135 : TypeRetriever is performed");
      this.mainGraph.getWebapp().log("Graph.java 135 : inputClass.get(0) : " + this.inputClasses.get(0));
      List<Map<String, String>> data =
          this.typeRetriever.getData(variableMap.get(this.inputClasses.get(0)));
      if(data.size() > 0){
        variableMap.putAll(data.get(0));
      } else {
        this.mainGraph.getWebapp().log("noResult");
      }
    }
    this.mainGraph.getWebapp().log("variableMap : " + variableMap.toString());
    return generateN3(inputObject, variableMap);
  }

  void setInstanceMap(JSONObject obj, Map<String, String> instanceMap) {

    // New Instances
    for (String newInstance : this.newInstances) {
      if (!this.inputNode.equals(newInstance)) {
        instanceMap.put(newInstance, this.mainGraph.getWebapp().getUnusedURI());
      }
    }
    // InputData
    for (String inputClass : this.inputClasses) {
      instanceMap.put(inputClass, JSON.string(obj, inputClass));
    }
    for (String inputInstance : this.inputInstances) {
      instanceMap.put(inputInstance, JSON.string(obj, inputInstance));
    }
    for (String inputLiterals : this.inputLiterals) {
      instanceMap.put(inputLiterals, JSON.string(obj, inputLiterals));
    }
    this.mainGraph.getWebapp().log("Graph.java 186 : " + instanceMap.toString());
  }

  public String generateN3(JSONObject inputObject, Map<String, String> variableMap) {

    // Creating string to create
    this.graphDataMap = variableMap;
    String triplesToStore = SPARQLUtils.assembleTriples(this.triplesToStore);
    triplesToStore = QueryUtils.subUrisForQueryVars(triplesToStore, variableMap);
    for (String subgraphKey : this.subGraphs.keySet()) {
      Graph subGraph = this.subGraphs.get(subgraphKey);
      String key = subGraph.inputNode;
      String value = variableMap.get(key);
      JSONArray array = JSON.array(inputObject, subgraphKey);
      for (int i = 0; i < array.length(); i++) {
        JSONObject jsonObject = JSON.object(array, i);
        triplesToStore += subGraph.saveData(jsonObject, key, value);
      }
    }
    return triplesToStore;
  }
  
  public void debug(){
    this.debug(0);
  }
  
  public void debug(int n) {

    String tab = new String(new char[n]).replace("\0", "\t");
    this.mainGraph.getWebapp().log(tab + "InputNode : " + this.inputNode);

    this.mainGraph.getWebapp().log(tab + "DataTriples : "
        + ArrayLib.debugTriples(tab, this.dataTriples));
    this.mainGraph.getWebapp().log(tab + "SchemeTriples : "
        + ArrayLib.debugTriples(tab, this.schemeTriples));
    this.mainGraph.getWebapp().log(tab + "TriplesToStore : "
        + ArrayLib.debugTriples(tab, this.triplesToStore));

    this.mainGraph.getWebapp()
        .log(tab + "newInstances :      " + ArrayLib.debugList(this.newInstances));
    this.mainGraph.getWebapp().log(tab + "inputInstances :      "
        + ArrayLib.debugList(this.inputInstances));
    this.mainGraph.getWebapp().log(tab + "constantLiterals :      "
        + ArrayLib.debugList(this.constantLiterals));
    this.mainGraph.getWebapp().log(tab + "inputLiterals :      "
        + ArrayLib.debugList(this.inputLiterals));
    this.mainGraph.getWebapp()
        .log(tab + "inputClasses :      " + ArrayLib.debugList(this.inputClasses));
    this.mainGraph.getWebapp().log(tab + "classesToSelect :      "
        + ArrayLib.debugList(this.classesToSelect));
    this.mainGraph.getWebapp().log(tab + "typeQueryTriples :      "
        + ArrayLib.debugTriples(tab, this.typeQueryTriples));
    
    if (this.dataRetriever != null) {
      this.mainGraph.getWebapp().log(tab + "DataRetriever Query : \n      "
          + this.dataRetriever.getQuery());
    }
    
    if (this.typeRetriever != null) {
      this.mainGraph.getWebapp().log(tab + "TypeRetriver Query :      "
          + this.typeRetriever.getQuery() + "\n");
    }
    
    int k = n + 1;
    this.mainGraph.getWebapp().log(tab + "Subgraphs :  " + subGraphs.keySet().size());
    if (subGraphs.keySet().size() > 0) {
      for (String key : subGraphs.keySet()) {
        this.mainGraph.getWebapp().log(tab + "Key : " + key);
        subGraphs.get(key).debug(k);
      }
    }
  }
  
  public void dependencyDebug(){
    
    this.mainGraph.getWebapp().log(JSON.debug(this.dependencyDescriptor()));
    for(String key : this.variableDependencies.keySet()){
      VariableDependency dep = this.variableDependencies.get(key);
      this.mainGraph.getWebapp().log(dep.queryDebug());
    }
  }
  
  public JSONObject dependencyDescriptor(){
    
    JSONObject object = JSON.obj();
    for(String dependencyKey : this.variableDependencies.keySet()){
      VariableDependency dependency = mainGraph.variableDependencies.get(dependencyKey);
      JSON.put(object, dependencyKey, JSON.array(dependency.inputs));
    }
    return object;
  }
  
  void log(String msg){
    this.mainGraph.getWebapp().log(msg);
  }
}
