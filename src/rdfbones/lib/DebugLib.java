package rdfbones.lib;

import java.util.Map;

import rdfbones.graphData.GraphPath;
import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.Triple;

public class DebugLib {

  static public void debug(int n, Graph graph) {

    String tab = new String(new char[n]).replace("\0", "\t");
    graph.mainGraph.getWebapp().log(tab + "InputNode : " +  graph.inputNode);
    graph.mainGraph.getWebapp().log(
        tab + "DataTriples : " + ArrayLib.debugTriples(tab, graph.dataTriples));
    graph.mainGraph.getWebapp().log(
        tab + "SchemeTriples : " + ArrayLib.debugTriples(tab, graph.schemeTriples));
    graph.mainGraph.getWebapp().log(
        tab + "TriplesToStore : " + ArrayLib.debugTriples(tab, graph.triplesToStore));
    graph.mainGraph.getWebapp().log(
        tab + "newInstances :      " + ArrayLib.debugList(graph.newInstances));
    graph.mainGraph.getWebapp().log(
        tab + "inputInstances :      " + ArrayLib.debugList(graph.inputInstances));
    graph.mainGraph.getWebapp().log(
        tab + "constantLiterals :      " + ArrayLib.debugList(graph.constantLiterals));
    graph.mainGraph.getWebapp().log(
        tab + "inputLiterals :      " + ArrayLib.debugList(graph.inputLiterals));
    graph.mainGraph.getWebapp().log(
        tab + "inputClasses :      " + ArrayLib.debugList(graph.inputClasses));
    graph.mainGraph.getWebapp().log(
        tab + "classesToSelect :      " + ArrayLib.debugList(graph.classesToSelect));
    graph.mainGraph.getWebapp().log(
        tab + "typeQueryTriples :      "
            + ArrayLib.debugTriples(tab, graph.typeQueryTriples));

    if (graph.dataRetriever != null) {
      graph.mainGraph.getWebapp()
          .log(
              tab + "DataRetriever Query : \n      "
                  + graph.dataRetriever.getQueryTriples());
    }

    if (graph.typeRetriever != null) {
      graph.mainGraph.getWebapp().log(
          tab + "TypeRetriver Query :      " + graph.typeRetriever.getQueryTriples()
              + "\n");
    }
    int k = n + 1;
    graph.mainGraph.getWebapp().log(
        tab + "Subgraphs :  " + graph.subGraphs.keySet().size());
    if (graph.subGraphs.keySet().size() > 0) {
      for (String key : graph.subGraphs.keySet()) {
        graph.mainGraph.getWebapp().log(tab + "Key : " + key);
        graph.subGraphs.get(key).debug(k);
      }
    }
  }

  public static void debugMulti(int n, Graph graph) {
    String tab = new String(new char[n]).replace("\0", "\t");
    n++;
    if (graph.inputNode != null) {
      graph.mainGraph.getWebapp().log(tab + "InputNode : " + graph.inputNode);
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

  static public void debugMap(Map<String, Graph> map, Graph graph) {

    for (String key : map.keySet()) {
      graph.mainGraph.getWebapp().log(key + "   " + map.get(key).toString());
    }
  }
}
