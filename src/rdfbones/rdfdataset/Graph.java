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
import rdfbones.lib.SPARQLUtils;
import rdfbones.lib.SubSPARQLDataGetter;
import webappconnector.WebappConnector;

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

  public JSONArray existingData = new JSONArray();
  public Map<String, String> existingTriples;

  public SubSPARQLDataGetter dataRetriever;
  public SubSPARQLDataGetter typeRetriever;
  private WebappConnector webapp;

  public Graph() {
    // TODO Auto-generated constructor stub
  }

  public void initNodes(List<Triple> dataTriples, List<Triple> schemeTriples) {

    this.dataTriples = dataTriples;
    this.schemeTriples = GraphLib.getSchemeTriples(dataTriples, schemeTriples);
    GraphLib.setDataInputVars(this);
    GraphLib.setDataRetrievalVars(this);
  }

  public void initWebappConnetor(WebappConnector webapp) {
    this.webapp = webapp;
    this.dataRetriever.webapp = webapp;
    if(this.typeRetriever != null){
      this.typeRetriever.webapp = webapp;
    }
    for (String subGraphKey : this.subGraphs.keySet()) {
      Graph subGraph = this.subGraphs.get(subGraphKey);
      subGraph.initWebappConnetor(webapp);
    }
  }

  public void init(WebappConnector webapp) {

    this.webapp = webapp;
    this.dataRetriever =
        new SubSPARQLDataGetter(webapp, this.dataRetreivalQuery, this.urisToSelect,
            this.literalsToSelect, this.inputNode);
    if (this.typeQueryTriples.size() > 0 && this.inputClasses.size() > 0
        && this.classesToSelect.size() > 0) {
      this.webapp.log("Graph.java 84 : typeRetriever");
      this.typeRetriever =
          new SubSPARQLDataGetter(webapp, this.typeQueryTriples, this.classesToSelect,
              null, this.inputClasses.get(0));
    }
    // Subgraph initialisation
    for (String subGraphKey : this.subGraphs.keySet()) {
      Graph subGraph = this.subGraphs.get(subGraphKey);
      subGraph.init(webapp);
    }
  }

  /*
   * Data Retrieval
   */
  
  public void getExistingData() {
    // This runs only at the main graph
    if (this.inputNode.equals("subject")) {
      this.webapp.log("ObjectGetter");
      if (this.webapp.requestMap.containsKey("objectUri")) {
        // The existing data has to be queried
        getGraphData(this.webapp.getInputParameter("subject"));
      }
    }
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
      this.webapp.log("Graph.java 135 : TypeRetriever is performed");
      this.webapp.log("Graph.java 135 : inputClass.get(0) : " + this.inputClasses.get(0));
      List<Map<String, String>> data =
          this.typeRetriever.getData(variableMap.get(this.inputClasses.get(0)));
      if(data.size() > 0){
        variableMap.putAll(data.get(0));
      } else {
        this.webapp.log("noResult");
      }
    }
    this.webapp.log("variableMap : " + variableMap.toString());
    return generateN3(inputObject, variableMap);
  }

  void setInstanceMap(JSONObject obj, Map<String, String> instanceMap) {

    // New Instances
    for (String newInstance : this.newInstances) {
      if (this.inputNode.equals(newInstance)) {
        instanceMap.put(newInstance, instanceMap.get(newInstance));
      } else {
        instanceMap.put(newInstance, this.webapp.getUnusedNewURI());
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
    this.webapp.log("Graph.java 186 : " + instanceMap.toString());
  }

  public String generateN3(JSONObject inputObject, Map<String, String> variableMap) {

    // Creating string to create
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

  public void debug(int n) {

    String tab = new String(new char[n]).replace("\0", "\t");
    this.webapp.log(tab + "InputNode : " + this.inputNode);

    this.webapp.log(tab + "DataTriples : "
        + ArrayLib.debugTriples(tab, this.dataTriples));
    this.webapp.log(tab + "SchemeTriples : "
        + ArrayLib.debugTriples(tab, this.schemeTriples));
    this.webapp.log(tab + "TriplesToStore : "
        + ArrayLib.debugTriples(tab, this.triplesToStore));

    this.webapp
        .log(tab + "newInstances :      " + ArrayLib.debugList(this.newInstances));
    this.webapp.log(tab + "inputInstances :      "
        + ArrayLib.debugList(this.inputInstances));
    this.webapp.log(tab + "constantLiterals :      "
        + ArrayLib.debugList(this.constantLiterals));
    this.webapp.log(tab + "inputLiterals :      "
        + ArrayLib.debugList(this.inputLiterals));
    this.webapp
        .log(tab + "inputClasses :      " + ArrayLib.debugList(this.inputClasses));
    this.webapp.log(tab + "classesToSelect :      "
        + ArrayLib.debugList(this.classesToSelect));
    this.webapp.log(tab + "typeQueryTriples :      "
        + ArrayLib.debugTriples(tab, this.typeQueryTriples));

    if (this.dataRetriever != null) {
      this.webapp.log(tab + "DataRetriever Query : \n      "
          + this.dataRetriever.getReadableQuery());
    }
    if (this.typeRetriever != null) {
      this.webapp.log(tab + "TypeRetriver Query :      "
          + this.typeRetriever.getReadableQuery() + "\n");
    }

    int k = n + 1;
    this.webapp.log(tab + "Subgraphs :  " + subGraphs.keySet().size());
    if (subGraphs.keySet().size() > 0) {
      for (String key : subGraphs.keySet()) {
        this.webapp.log(tab + "Key : " + key);
        subGraphs.get(key).debug(k);
      }
    }
  }
}
