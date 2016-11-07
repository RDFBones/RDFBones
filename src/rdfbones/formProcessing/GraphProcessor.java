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

  public static Graph getGraph(List<Triple> triples, List<Triple> restrictionTriples, String startNode){

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
    if(valid){
        List<Triple> graphTriples = new ArrayList<Triple>();
        graphTriples.add(multiTriple);
        triples.remove(multiTriple);
        return getSubGraph(triples, restrictionTriples, startNode, GraphLib.getObject(multiTriple, startNode), graphTriples);  
    } else {
      List<Triple> graphTriples = new ArrayList<Triple>();
      return getSubGraph(triples, restrictionTriples, null, startNode, graphTriples);
    }
  }
  
  public static Graph getSubGraph(List<Triple> triples, List<Triple> restrictionTriples, String initialNode, String startNode, List<Triple> graphTriples){
    
    Graph graph = new Graph();
    if(graphTriples.size() > 0){
      graph.multiTriple = graphTriples.get(0);
      graph.startNode = initialNode;
    } else {
      graph.startNode = startNode;
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
    graph.dataTriples = graphTriples;
    graph.restrictionTriples = getRestrictionTriples(graphTriples, restrictionTriples);
    graph.initNodes();
    for(String subGraphNode : subGraphNodes.keySet()){
      String node = subGraphNodes.get(subGraphNode);
      graph.subGraphs.put(subGraphNode, getGraph(triples, restrictionTriples, node));
    }
    return graph;
  }
  
  static List<Triple> getRestrictionTriples(List<Triple> graphTriples, 
      List<Triple> restrictionTriples){
    
    /*
     * Note :
     * 
     * Now the algorithm does not remove the found restriction triples
     * it works but due to efficiency it has to implemented later.
     */
    List<Triple> restTriples = new ArrayList<Triple>();
    List<String> nodes = GraphLib.getNodes(graphTriples);
    //Get type triples
    restTriples.addAll(GraphLib.getAndRemoveTypeTriples(restrictionTriples, nodes));
    List<String> typeNodes = GraphLib.getObjectNodes(restTriples);
    restTriples.addAll(GraphLib.getAndRemoveRestrictionTriples(typeNodes, restrictionTriples));
    restTriples.addAll(GraphLib.getAndRemoveSubClassTriples(restrictionTriples, typeNodes));
    return restTriples;
  }
}

