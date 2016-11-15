package rdfbones.formProcessing;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import rdfbones.rdfdataset.Triple;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.Graph;
import rdfbones.lib.GraphLib;

public class GraphProcessor {

  public static Graph getGraph(List<Triple> triples, List<Triple> schemeTriples, String startNode){

    Triple multiTriple = null;
    boolean valid = true;
    //Iterate through the multitriples
    for(Triple triple : triples){
        if(triple.subject.varName.equals(startNode)
            || triple.object.varName.equals(startNode)){
        if(triple instanceof MultiTriple){
          //We are here only once
          multiTriple = triple;
        } else { //If we are here then the condition is not fulfilled
          valid = false;
          break;
        }
      }
    }
    List<Triple> graphTriples = new ArrayList<Triple>();
    if(valid){
      graphTriples.add(multiTriple);
      triples.remove(multiTriple);
      return getSubGraph(triples, schemeTriples, startNode, 
          GraphLib.getObject(multiTriple, startNode), graphTriples);  
    } else {
      return getSubGraph(triples, schemeTriples, null, startNode, graphTriples);
    }
  }
  
  public static Graph getSubGraph(List<Triple> triples, List<Triple> schemeTriples, 
    String inputNode, String startNode, List<Triple> graphTriples){
    
    Graph graph = new Graph();
    if(graphTriples.size() > 0){
      graph.inputNode = inputNode;
    } else {
      graph.inputNode = startNode;
    }
    Map<String, String> subGraphNodes = new HashMap<String, String>();
    List<String> graphNodes = new ArrayList<String>();
    graphNodes.add(startNode);
    int i = 0;
    while(true){
      List<Integer> tripleNums = new ArrayList<Integer>();
      for(Triple triple : triples){
        if(triple.subject.varName.equals(startNode) || triple.object.varName.equals(startNode)){
          String object = GraphLib.getObject(triple, startNode);
          if(triple instanceof MultiTriple){
             subGraphNodes.put(object, GraphLib.getSubject(triple, startNode));
          } else {
             graphTriples.add(triple);
             graphNodes.add(object);
             tripleNums.add(i);
          }
        }
        i++;
      }
      i = 0;
      //Removing the found triples from graph
      for(int j = tripleNums.size(); j > 0; j--){
        triples.remove(tripleNums.get(j-1).intValue());
      }
      if(graphNodes.size() == 0){
        //The graph is completely discovered
        break;
      } else {
        //There are node to discover
        startNode = graphNodes.get(0);
        graphNodes.remove(0);
      }
    }
    //Set the found triple to the graph
    graph.initNodes(graphTriples, schemeTriples);
    for(String subGraphNode : subGraphNodes.keySet()){
      String node = subGraphNodes.get(subGraphNode);
      graph.subGraphs.put(subGraphNode, getGraph(triples, schemeTriples, node));
    }
    return graph;
  }
}

