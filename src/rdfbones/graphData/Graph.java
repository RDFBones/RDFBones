package rdfbones.graphData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.DebugLib;
import rdfbones.lib.GraphLib;
import rdfbones.lib.JSON;
import rdfbones.lib.MainGraphSPARQLDataGetter;
import rdfbones.lib.QueryLib;
import rdfbones.lib.SPARQLDataGetter;
import rdfbones.lib.SPARQLUtils;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.Triple;
import rdfbones.formProcessing.WebappConnector;

public class Graph {

  // Input
  public String inputNode;
  public Triple triple = null;
  public String inputPredicate = null;

  // Triples
  public List<Triple> dataTriples = new ArrayList<Triple>();
  public List<Triple> schemeTriples;

  public List<String> nodes;
  public List<String> typeNodes;

  // Data Input - Storage
  public List<Triple> triplesToStore;
  public List<String> newInstances;
  public List<String> inputInstances;
  public List<String> constantLiterals;
  public List<String> inputLiterals;
  public List<String> inputClasses;
  public List<String> mainInputNodes;
  public Map<String, String> mainInputValues;
  public Map<String, String> calculatedMainInputs;

  
  // Data Input - type query
  public List<String> classesToSelect;
  public List<Triple> typeQueryTriples;

  // Data Retrival
  public List<Triple> dataRetreivalQuery;
  public List<String> urisToSelect;
  public List<String> literalsToSelect;

  public Map<RDFNode, Graph> initialGraphMap;
  public Map<String, Graph> graphMap = new HashMap<String, Graph>();
  public Map<String, Graph> subGraphs = new HashMap<String, Graph>();
  public Map<String, Graph> optionalGraphs = new HashMap<String, Graph>();

  public Map<String, VariableDependency> variableDependencies =
      new HashMap<String, VariableDependency>();
  public JSONArray existingData = new JSONArray();
  public Map<String, String> existingTriples;
  public Map<String, String> graphDataMap;

  public SPARQLDataGetter dataRetriever;
  public SPARQLDataGetter typeRetriever;
  WebappConnector webapp;
  public Graph mainGraph;

  public Graph(List<Triple> triples, List<Triple> schemeTriples, WebappConnector webapp) {

    this.inputNode = new String("subjectUri");
    this.mainGraph = this;
    this.webapp = webapp;
    this.initialize(triples);
    this.initGraphStructure();
    this.setGraphDescriptor(schemeTriples);
    this.setMainInputMap();
  }

  public Graph(Triple triple, String inputNode, List<Triple> triples) {
    this.triple = triple;
    this.inputNode = inputNode;
    this.initialize(triples);
  }

  public Graph() {
    // TODO Auto-generated constructor stub
  }

  public void initialize(List<Triple> triples) {

    this.initialGraphMap = new HashMap<RDFNode, Graph>();
    List<Triple> neighbours = GraphLib.getAndRemoveTriples(triples, this.inputNode);
    for (Triple triple : neighbours) {
      RDFNode node = GraphLib.getObjectNode(triple, this.inputNode);
      initialGraphMap.put(node, new Graph(triple, node.varName, triples));
    }
  }

  public void initGraphStructure() {
    this.initGraphMap(this);
  }

  public void initGraphMap(Graph graph) {

   for (RDFNode key : this.initialGraphMap.keySet()) {
      Graph subGraph = this.initialGraphMap.get(key);
      Triple triple = subGraph.triple;
      if (triple instanceof MultiTriple) {
        subGraph.inputNode = GraphLib.getObject1(triple, key.varName);
        subGraph.inputPredicate = triple.predicate;
        subGraph.mainGraph = graph.mainGraph;
        subGraph.initGraphStructure();
        if (subGraph.triple != null)
          subGraph.dataTriples.add(triple);
        graph.subGraphs.put(QueryLib.getPredicateKey(triple.predicate), (Graph) subGraph);
      } else {
        graph.dataTriples.add(triple);
        subGraph.initGraphMap(graph);
      }
    }
  }

  public void setGraphDescriptor(List<Triple> schemeTriples) {

    //log("SubgraphDescriptor");
    GraphLib.setSchemeTriples(this, schemeTriples);
    GraphLib.setDataInputVars(this);
    GraphLib.setDataRetrievalVars(this);
    GraphLib.setGraphMap(this);
    if (this.inputPredicate == null) {
      this.dataRetriever =
          new MainGraphSPARQLDataGetter(mainGraph, this.dataRetreivalQuery,
              this.urisToSelect, this.literalsToSelect);
    } else {
      this.dataRetriever =
          new SPARQLDataGetter(mainGraph, this.dataRetreivalQuery, this.urisToSelect,
              this.literalsToSelect, this.inputNode);
    }
    if (this.typeQueryTriples.size() > 0 && this.inputClasses.size() > 0
        && this.classesToSelect.size() > 0) {
      this.typeQueryTriples.addAll(GraphLib.optionalClassLabelTripels(this.classesToSelect));
      List<String> literalsToSelect = GraphLib.classLabels(this.classesToSelect);
      DebugLib.debugList(literalsToSelect, this);
      this.typeRetriever =
          new SPARQLDataGetter(mainGraph, this.typeQueryTriples, this.classesToSelect,
              literalsToSelect, this.inputClasses, true);
    }
    for (String key : this.subGraphs.keySet()) {
      this.subGraphs.get(key).setGraphDescriptor(schemeTriples);
    }
  }

  public void setMainInputMap(){
    
    this.mainInputValues = new HashMap<String, String>();
    for(String mainInput : this.mainInputNodes){
      this.mainInputValues.put(mainInput, this.webapp.getInputParameter(mainInput));
    }
  }

  /*
   * Data Retrieval
   */
  public void getExistingData(String subject, String object) {

    this.existingData =
        QueryUtils.getJSON(((MainGraphSPARQLDataGetter) this.dataRetriever).getData(
            subject, object));
    this.getGraphData();
  }

  public JSONArray getGraphData(String value) {

    // Here the parent graph input is used as well
    this.existingData = QueryUtils.getJSON(this.dataRetriever.getData(value));
    this.getGraphData();
    return this.existingData;
  }

  private void getGraphData() {
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
      String inputValue = JSON.string(inputObject, this.inputClasses.get(0));
      List<Map<String, String>> data = this.typeRetriever.getData(inputValue);
      if (data.size() > 0) {
        variableMap.putAll(data.get(0));
      } else {
        log("noResult");
      }
    }
    return generateN3(inputObject, variableMap);
  }

  void setInstanceMap(JSONObject obj, Map<String, String> instanceMap) {

    // New Instances
    for (String newInstance : this.newInstances) {
      if (!this.inputNode.equals(newInstance)) {
        instanceMap.put(newInstance, this.mainGraph.getWebapp().getUnusedURI());
      }
    }
    for(String mainInputNode : this.mainInputNodes){
      instanceMap.put(mainInputNode, this.mainGraph.mainInputValues.get(mainInputNode));
    }
    // InputData
    for (String inputClass : this.inputClasses) {
      instanceMap.put(inputClass, JSON.string(obj, inputClass));
    }
    for (String inputInstance : this.inputInstances) {
      if(!this.mainInputNodes.contains(inputInstance))
        instanceMap.put(inputInstance, JSON.string(obj, inputInstance));
    }
    for (String inputLiteral : this.inputLiterals) {
      instanceMap.put(inputLiteral, JSON.string(obj, inputLiteral));
    }
  }

  public String generateN3(JSONObject inputObject, Map<String, String> variableMap) {

    // Creating string to create
    this.graphDataMap = variableMap;
    log("VariableMap");
    DebugLib.mapLog(variableMap, this);
    Map<String, String> labelMap = GraphLib.getLabels(variableMap);
    log("LabelMap");
    DebugLib.mapLog(labelMap, this);
    List<Triple> triplesToStore = GraphLib.addLabelTriples(this.triplesToStore);
    String triplesString = SPARQLUtils.assembleTriples(triplesToStore);
    triplesString = QueryUtils.subUrisForQueryLiterals(triplesString, labelMap);
    triplesString = QueryUtils.subUrisForQueryVars(triplesString, variableMap);
    for (String subgraphKey : this.subGraphs.keySet()) {
      Graph subGraph = this.subGraphs.get(subgraphKey);
      String key = subGraph.inputNode;
      String value = variableMap.get(key);
      JSONArray array = JSON.array(inputObject, subgraphKey);
      for (int i = 0; i < array.length(); i++) {
        JSONObject jsonObject = JSON.object(array, i);
        triplesString += subGraph.saveData(jsonObject, key, value);
      }
    }
    return triplesString;
  }

  public void debug() {
    this.debug(0);
  }

  public void debug(int n) {
    DebugLib.debug(n, this);
  }

  public void debugMulti(int n) {
    DebugLib.debugMulti(n, this);
  }

  public void dependencyDebug() {

    this.mainGraph.getWebapp().log(JSON.debug(this.dependencyDescriptor()));
    for (String key : this.variableDependencies.keySet()) {
      VariableDependency dep = this.variableDependencies.get(key);
      this.mainGraph.getWebapp().log(dep.queryDebug());
    }
  }

  public JSONObject dependencyDescriptor() {

    JSONObject object = JSON.obj();
    for (String dependencyKey : this.variableDependencies.keySet()) {
      VariableDependency dependency = mainGraph.variableDependencies.get(dependencyKey);
      JSON.put(object, dependencyKey, JSON.array(dependency.inputs));
    }
    return object;
  }

  public void debugMap(int n){
    String tab = new String(new char[n]).replace("\0", "\t");
    if(this.triple != null)
      System.out.println(tab + this.triple.subject.varName + "\t"  + 
           this.triple.predicate + "\t" + this.triple.object.varName);  
    n++;
    for(RDFNode key : this.initialGraphMap.keySet()){
      System.out.println(tab + "\t" + key.varName);
      this.initialGraphMap.get(key).debugMap(n);
    }
  }
  
  public void log(String msg) {
    this.mainGraph.getWebapp().log(msg);
  }
  
  public WebappConnector getWebapp() {
    return webapp;
  }

  public void setWebapp(WebappConnector webapp) {
    this.webapp = webapp;
  }
  
}
