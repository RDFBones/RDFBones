package rdfbones.lib;

import java.util.List;
import java.util.Map;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Graph;
import rdfbones.graphData.GraphPath;
import rdfbones.rdfdataset.Triple;

public class DebugLib {

  static public void debug(int n, Graph graph) {

    String tab = new String(new char[n]).replace("\0", "\t");
    DebugLib.logString("inputNode", tab, graph, graph.varName);
    DebugLib.logString("firstNode", tab, graph, graph.firstNode);
    DebugLib.logTripleList("dataTriples", tab, graph, graph.dataTriples);
    DebugLib.logTripleList("schemeTriples", tab, graph, graph.schemeTriples);
    DebugLib.logTripleList("triplesToStore", tab, graph, graph.triplesToStore);
    DebugLib.logTripleList("labelTriples", tab, graph, graph.labelTriples);
    DebugLib.logList("nodes", tab, graph, graph.nodes);
    DebugLib.logList("newInstances", tab, graph, graph.newInstances);
    DebugLib.logList("inputInstances", tab, graph, graph.inputInstances);
    DebugLib.logList("constantLiterals", tab, graph, graph.constantLiterals);
    DebugLib.logList("inputLiterals", tab, graph, graph.inputLiterals);
    DebugLib.logList("inputClasses", tab, graph, graph.inputClasses);
    DebugLib.logList("typeNodes", tab, graph, graph.typeNodes);
    DebugLib.logList("formNodes", tab, graph, graph.formNodes);
    DebugLib.logList("nodesAsInput", tab, graph, graph.nodesAsInput);
    DebugLib.logList("labelClasses", tab, graph, graph.labelClasses);
    DebugLib.logList("classesToSelect", tab, graph, graph.classesToSelect);
    DebugLib.logList("mainInputNodes", tab, graph, graph.mainInputNodes);
    DebugLib.logMap("mainInputValues", tab, graph, graph.mainInputValues);
    DebugLib.logTripleList("TypeQueryTriple", tab, graph, graph.typeQueryTriples);
    DebugLib.logDataGetter("DataRetriever Query", tab, graph, graph.dataRetriever);
    DebugLib.logDataGetter("TypeRetriever Query", tab, graph, graph.typeRetriever);
    int k = n + 1;
    graph.log(tab + "Subgraphs :  " + graph.subGraphs.keySet().size());
    for (String key : graph.subGraphs.keySet()) {
      graph.mainGraph.getWebapp().log(tab + "Key : " + key);
      graph.subGraphs.get(key).debug(k);
    }
  }

  public static void logString(String msg, String tab, Graph graph, String str) {
    
    if (str != null || str != "") {
      graph.log(tab + msg + ":\t" + str);
    }
  }

  public static void logList(String msg, String tab, Graph graph, List<String> logList) {
    
    if(logList != null && logList.size() > 0){
      graph.log(tab + msg + ":\t" + StringUtil.debugList(logList));
    } 
  }
  
  public static void logMap(String msg, String tab, Graph graph, Map<String, String> map) {
    
    if(map != null){
      graph.log(tab + msg + ":\t" + map.toString());
    } 
  }

  public static void logTripleList(String msg, Graph graph,
    List<Triple> logList) {
  	logTripleList(msg, "\t", graph, logList);
  }

  public static void logTripleList(String msg, WebappConnector webapp,
    List<Triple> logList) {
  	logTripleList(msg, "\t", webapp, logList);
  }
  
  public static void logTripleList(List<Triple> triples, String msg){
  	
  	System.out.println(msg + "\n" + StringUtil.debugTriples("", triples));
  }
  
  public static void logTripleList(String msg, String tab, Graph graph,
    List<Triple> logList) {
    if(logList != null && logList.size() > 0){
      graph.log(tab + msg + StringUtil.debugTriples(tab, logList));
    }
  }
  
  public static void logTripleList(String msg, String tab, WebappConnector webapp,
    List<Triple> logList) {
    if(logList != null && logList.size() > 0){
    	webapp.log(tab + msg + StringUtil.debugTriples(tab, logList));
    }
  }
  
  public static void logDataGetter(String msg, String tab, Graph graph,
    SPARQLDataGetter dataGetter) {
    if(dataGetter != null){
      graph.log(tab + msg + "\n" + StringUtil.getQuery(dataGetter.getQueryTriples(), tab));
    }
  }

  public static void debugMulti(int n, Graph graph) {
    String tab = new String(new char[n]).replace("\0", "\t");
    n++;
    if (graph.varName != null) {
      graph.mainGraph.getWebapp().log(tab + "InputNode : " + graph.varName);
    }
    graph.mainGraph.getWebapp().log(tab + "Triple");
    if (graph.triple != null)
      graph.mainGraph.getWebapp().log(
          tab + graph.triple.subject.varName + "\t" + graph.triple.predicate + "\t"
              + graph.triple.object.varName);
    graph.mainGraph.getWebapp().log(tab + "Triples");
    for (Triple triple : graph.dataTriples) {
      graph.mainGraph.getWebapp().log(
          tab + triple.subject.varName + "\t" + triple.predicate + "\t"
              + triple.object.varName);
    }
    graph.mainGraph.getWebapp().log(
        tab + "SchemeTriples : " + ArrayLib.debugTriples(tab, graph.schemeTriples));
    graph.mainGraph.getWebapp().log(tab + "Subgraphs");
    for (String key : graph.subGraphs.keySet()) {
      graph.mainGraph.getWebapp().log(tab + key);
      graph.subGraphs.get(key).debugMulti(n);
    }
  }

  static public String debugMap(Map<String, Graph> map) {

  	String msg = new String("");
  	for (String key : map.keySet()) {
      msg += key + "   " + map.get(key).toString() + "\n";
    }
  	return msg;
  }
  
  static public void debugMap(Map<String, Graph> map, Graph graph) {

    for (String key : map.keySet()) {
      graph.mainGraph.getWebapp().log(key + "   " + map.get(key).toString());
    }
  }
  
  public static void mapLog(Map<String, String> map, Graph graph){
    for (String key : map.keySet()) {
      graph.log(key + "   " + map.get(key));
    }
  }
  
  public static void debugList(List<String> list, Graph graph){
    graph.log(ArrayLib.debugList(list));
  }
  
  public static void debugList(List<Map<String, String>> list){
  	
  	for(Map<String, String> map : list){
  		for(String key : map.keySet()){
  			System.out.print(key + " : " +  map.get(key) + ", ");
  		}
  		System.out.print("\n");
  	}
  }
}
