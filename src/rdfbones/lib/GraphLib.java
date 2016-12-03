package rdfbones.lib;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import rdfbones.form.Form;
import rdfbones.form.FormConfiguration;
import rdfbones.formProcessing.DependencyCalculator;
import rdfbones.formProcessing.GraphProcessor;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.SubGraphInfo;
import rdfbones.graphData.UnionForm;
import rdfbones.rdfdataset.*;

public class GraphLib {

  public static FormConfiguration getFormConfig(List<Triple> dataTriples, 
    List<Triple> schemeTriples, Form form, WebappConnector webapp){
    
    List<Triple> schemeCopy1 = ArrayLib.copyList(schemeTriples);
    Graph graph = GraphProcessor.getGraph(dataTriples, schemeCopy1, "object");
    List<Triple> schemeCopy2 = ArrayLib.copyList(schemeTriples);
    DependencyCalculator.calculate(graph, schemeCopy2, form); 
    graph.init(webapp);
    return new FormConfiguration(graph, form);
  }
 
  public static List<String> getNodes(List<Triple> dataTriples,
    List<Triple> restrictionTriples) {

    List<String> nodes = new ArrayList<String>();
    nodes.addAll(getNodes(dataTriples));
    nodes.addAll(getNodes(restrictionTriples));
    return nodes;
  }

  public static List<String> getNodes(List<Triple> triples) {

    List<String> nodes = new ArrayList<String>();
    for (Triple triple : triples) {
      ArrayLib.addDistinct(nodes, triple.subject.varName);
      ArrayLib.addDistinct(nodes, triple.object.varName);
    }
    return nodes;
  }

  public static String getSubject(Triple triple, String varName) {

    if (triple.subject.varName.equals(varName)) {
      return triple.subject.varName;
    } else {
      return triple.object.varName;
    }
  }

  public static String getObject(Triple triple, String varName) {

    if (triple.subject.varName.equals(varName) && !Boolean.FALSE.equals(triple.fromSubject)) {
      return triple.object.varName;
    } else if(triple.object.varName.equals(varName) && !Boolean.TRUE.equals(triple.fromSubject)){
      return triple.subject.varName;
    } else {
      return null;
    }
  }

  public static RDFNode getSubjectNode(Triple triple, String varName) {

    if (triple.subject.varName.equals(varName)) {
      return triple.subject;
    } else {
      return triple.object;
    }
  }

  public static RDFNode getObjectNode(Triple triple, String varName) {

    if (triple.subject.varName.equals(varName)) {
      return triple.object;
    } else {
      return triple.subject;
    }
  }

  public static List<Triple> getNotRestrictionTriples(List<Triple> triples, String node) {

    List<Triple> toReturn = new ArrayList<Triple>();
    for (Triple triple : triples) {
      if (triple.subject.varName.equals(node) || triple.object.varName.equals(node)) {
        if (!(triple instanceof RestrictionTriple)) {
          toReturn.add(triple);
        }
      }
    }
    return toReturn;
  }

  public static List<String> getObjectNodes(List<Triple> triples) {

    List<String> object = new ArrayList<String>();
    for (Triple triple : triples) {
      object.add(triple.object.varName);
    }
    return object;
  }

  public static List<Triple> getAndRemoveTypeTriples(List<Triple> triples,
    List<String> nodes) {

    List<Triple> toReturn = new ArrayList<Triple>();
    List<Integer> nums = getTypeNums(triples, nodes);
    ArrayLib.set(toReturn, triples, nums);
    ArrayLib.remove(triples, nums);
    return toReturn;
  }

  public static List<Triple> getAndRemoveSubClassTriples(List<Triple> triples,
    List<String> nodes) {

    List<Triple> toReturn = new ArrayList<Triple>();
    List<Integer> nums = getSubClassNums(triples, nodes);
    ArrayLib.set(toReturn, triples, nums);
    ArrayLib.remove(triples, nums);
    return toReturn;
  }

  public static List<Integer> getTypeNums(List<Triple> triples, List<String> nodes) {

    return getTripleNums(triples, nodes, "rdf:type");
  }

  public static List<Integer> getSubClassNums(List<Triple> triples, List<String> nodes) {

    return getTripleNums(triples, nodes, "rdfs:subClassOf");
  }

  public static List<Integer> getTripleNums(List<Triple> triples, List<String> nodes,
    String predicate) {

    List<Integer> typeNums = new ArrayList<Integer>();
    Integer i = 0;
    for (Triple triple : triples) {
      if (nodes.contains(triple.subject.varName) && triple.predicate.equals(predicate)) {
        typeNums.add(i);
      }
      i++;
    }
    return typeNums;
  }

  public static List<Triple> getTypeTriples(List<Triple> triples, List<String> nodes) {
    return getTriples(triples, nodes, "rdf:type");
  }

  public static List<Triple>
    getSubClassTriples(List<Triple> triples, List<String> nodes) {
    return getTriples(triples, nodes, "rdf:subClassOf");
  }

  public static List<Triple> getTriples(List<Triple> triples, List<String> nodes,
    String predicate) {

    List<Triple> typeTriples = new ArrayList<Triple>();
    for (String node : nodes) {
      typeTriples.add(getTriple(triples, node, predicate));
    }
    return typeTriples;
  }

  public static Triple getTriple(List<Triple> triples, String node, String predicate) {

    for (Triple triple : triples) {
      if (triple.subject.varName.equals(node) && triple.predicate.equals(predicate)) {
        return triple;
      }
    }
    return null;
  }

  public static List<Triple> getRestrictionTriples(List<String> nodes,
    List<Triple> triples) {

    List<Triple> addTo = new ArrayList<Triple>();
    for (Triple triple : triples) {
      if (nodes.contains(triple.subject.varName)
          && nodes.contains(triple.object.varName)) {
        addTo.add(triple);
      }
    }
    return addTo;
  }

  public static List<Triple> getAndRemoveRestrictionTriples(List<String> nodes,
    List<Triple> triples) {

    List<Integer> nums = new ArrayList<Integer>();
    Integer i = 0;
    for (Triple triple : triples) {
      if (nodes.contains(triple.subject.varName)
          && nodes.contains(triple.object.varName)) {
        nums.add(i);
      }
      i++;
    }
    List<Triple> toReturn = new ArrayList<Triple>();
    ArrayLib.set(toReturn, triples, nums);
    ArrayLib.remove(triples, nums);
    return toReturn;
  }

  public static List<String> getNewInstances(List<Triple> triples) {

    List<String> newInstances = new ArrayList<String>();
    for (Triple triple : triples) {
      if (!(triple.subject instanceof ExistingInstance)
          && !(triple.subject instanceof InputNode)) {
        ArrayLib.addDistinct(newInstances, triple.subject.varName);
      }
      if (!(triple.object instanceof ExistingInstance)
          && !(triple.object instanceof InputNode)) {
        ArrayLib.addDistinct(newInstances, triple.object.varName);
      }
    }
    return newInstances;
  }

  public static List<String> getExistingInstances(List<Triple> triples) {

    List<String> newInstances = new ArrayList<String>();
    for (Triple triple : triples) {
      if ((triple.subject instanceof ExistingInstance)) {
        ArrayLib.addDistinct(newInstances, triple.subject.varName);
      }
      if (triple.object instanceof ExistingInstance) {
        ArrayLib.addDistinct(newInstances, triple.object.varName);
      }
    }
    return newInstances;
  }

  public static List<Triple> getSchemeTriples(List<Triple> graphTriples,
    List<Triple> restrictionTriples) {

    /*
     * Note :
     * 
     * Now the algorithm does not remove the found restriction triples it works
     * but due to efficiency it has to implemented later.
     */
    List<Triple> restTriples = new ArrayList<Triple>();
    List<String> nodes = GraphLib.getNodes(graphTriples);
    // Get type triples
    restTriples.addAll(GraphLib.getAndRemoveTypeTriples(restrictionTriples, nodes));
    List<String> typeNodes = GraphLib.getObjectNodes(restTriples);
    restTriples.addAll(GraphLib.getAndRemoveRestrictionTriples(typeNodes,
        restrictionTriples));
    restTriples.addAll(GraphLib.getAndRemoveSubClassTriples(restrictionTriples,
        typeNodes));
    return restTriples;
  }

  public static void setDataInputVars(Graph graph) {

    // Variables to set
    graph.triplesToStore = new ArrayList<Triple>();
    graph.newInstances = new ArrayList<String>();
    graph.inputInstances = new ArrayList<String>();
    graph.constantLiterals = new ArrayList<String>();
    graph.inputLiterals = new ArrayList<String>();
    graph.inputClasses = new ArrayList<String>();

    graph.typeQueryTriples = new ArrayList<Triple>();
    graph.classesToSelect = new ArrayList<String>();

    graph.triplesToStore.addAll(graph.dataTriples);

    // newInstamces, literals inputs
    for (Triple triple : graph.schemeTriples) {
      if (!triple.predicate.equals("rdf:type")) {
        graph.typeQueryTriples.add(triple);
      }
      if (triple.subject instanceof InputNode && !(triple instanceof ExistingRestrictionTriple)){
        ArrayLib.addDistinct(graph.inputClasses, triple.subject.varName);
      }
      if (triple.object instanceof InputNode) {
        ArrayLib.addDistinct(graph.inputClasses, triple.object.varName);
      }
    }

    for (Triple triple : graph.dataTriples) {
      if (triple.subject instanceof InputNode) {
        ArrayLib.addDistinct(graph.inputInstances, triple.subject.varName);
      } else {
        ArrayLib.addDistinct(graph.newInstances, triple.subject.varName);
      }

      if (triple.object instanceof InputNode) {
        if (triple instanceof LiteralTriple) {
          ArrayLib.addDistinct(graph.inputLiterals, triple.object.varName);
        } else {
          ArrayLib.addDistinct(graph.inputInstances, triple.object.varName);
        }
      } else {
        if (triple instanceof LiteralTriple) {
          ArrayLib.addDistinct(graph.constantLiterals, triple.object.varName);
        } else {
          ArrayLib.addDistinct(graph.newInstances, triple.object.varName);
        }
      }
    }

    // triplesToStore, typeQueryTriples, classesToSelect
    for (Triple triple : graph.schemeTriples) {
      if (triple instanceof RestrictionTriple) {
        ArrayLib.addDistinct(graph.classesToSelect, triple.subject.varName);
        ArrayLib.addDistinct(graph.classesToSelect, triple.object.varName);
      } else {
        
        if (triple.predicate.equals("rdf:type")) {
          if (!(triple.subject instanceof InputNode)) {
            graph.triplesToStore.add(triple);
          }
          if (!(triple.object instanceof InputNode)) {
            ArrayLib.addDistinct(graph.classesToSelect, triple.object.varName);
          }
          /*
          if (triple.subject instanceof InputNode) {
            graph.typeQueryTriples.add(triple);
          }*/
        }
      }
    }
  }

  public static void setDataRetrievalVars(Graph graph) {

    // Variables to set
    graph.dataRetreivalQuery = new ArrayList<Triple>();
    graph.urisToSelect = new ArrayList<String>();
    graph.literalsToSelect = new ArrayList<String>();
    graph.dataRetreivalQuery.addAll(graph.dataTriples);

    for (String var : graph.newInstances) {
      graph.urisToSelect.add(var);
      graph.urisToSelect.add(var + "Type");
      graph.dataRetreivalQuery.add(QueryLib.getMSTTriple(var));
    }

    for (String var : graph.inputInstances) {
      graph.urisToSelect.add(var);
      graph.urisToSelect.add(var + "Type");
      if(graph.typeQueryTriples.size() > 0){
        graph.typeQueryTriples.add(QueryLib.getMSTTriple(var));
      }
      graph.literalsToSelect.add(var + "Label");
      graph.dataRetreivalQuery.add(QueryLib.getOptionalLabelTriple(var));
    }
    
    for (String var : graph.inputLiterals) {
      graph.literalsToSelect.add(var);
    }
    for (String var : graph.constantLiterals) {
      graph.literalsToSelect.add(var);
    }
  }

  public static List<String> getMainInputVars(List<Triple> triples) {
    List<String> mainInputVars = new ArrayList<String>();
    for (Triple triple : triples) {
      if (triple.subject instanceof MainInputNode) {
        mainInputVars.add(triple.subject.varName);
      }
      if (triple.object instanceof MainInputNode) {
        mainInputVars.add(triple.object.varName);
      }
    }
    return mainInputVars;
  }

  public static void incrementRestrictionTriples(List<Triple> triples) {

    int i = 0;
    for (Triple triple : triples) {
      if (triple instanceof RestrictionTriple) {
        ((RestrictionTriple) triple).i = i;
        i++;
      }
    }
  }

  public static List<Triple> getSubclassTriples(String input, List<Triple> triples) {
    List<Triple> subClassTriples = new ArrayList<Triple>();
    for (Triple triple : triples) {
      if (triple.predicate.equals("rdfs:subClassOf")
          && triple.subject.varName.equals(input)) {
        subClassTriples.add(triple);
      }
    }
    return subClassTriples;
  }

  public static boolean containsGreedy(List<Triple> triples) {

    for (Triple triple : triples) {
      if (triple instanceof GreedyRestrictionTriple) {
        return true;
      }
    }
    return false;
  }
  
  public static GreedyRestrictionTriple isGreedy(List<Triple> triples, String startNode) {

    for (Triple triple : triples) {
      if ((triple.subject.varName.equals(startNode) || triple.object.varName
          .equals(startNode)) && (triple instanceof GreedyRestrictionTriple)) {
        return (GreedyRestrictionTriple) triple;
      }
    }
    return null;
  }
  
  public static String assembleTriples(List<Triple> triples){
    
    String tripleString = new String("");
    for(Triple triple : triples){
      tripleString += triple.getTriple();
    }
    return tripleString;
  }
  
  public static UnionForm getUnionForm(List<Triple> triples, String startNode){
    
    List<Triple> graphTriples = new ArrayList<Triple>();
    List<String> nodeBuffer = new ArrayList<String>();
    String greedyNode = null;
    nodeBuffer.add(startNode);
    while(true){
      SubGraphInfo info = GraphLib.subGraphInfoRemove(triples, startNode, nodeBuffer.remove(0));
      if(info.greedyNode != null && greedyNode == null){
        greedyNode = info.greedyNode;
      } 
      
        graphTriples.addAll(info.triples);
        nodeBuffer.addAll(info.nodes);
      if(nodeBuffer.size() == 0){
        break;
      }
    }
    return new UnionForm(graphTriples, greedyNode);  
  }
  
  public static SubGraphInfo subGraphInfoRemove(List<Triple> triples, String startNode, String node){

    SubGraphInfo info = new SubGraphInfo();
    List<Integer> nums = new ArrayList<Integer>();
    Integer i = 0;
    for(Triple triple : triples){
      if(triple.subject.varName.equals(node) || triple.object.varName.equals(node)){
        if(triple instanceof GreedyRestrictionTriple && !startNode.equals(node)){
          info.greedyNode = node;
          info.greedyTriple = triple;
        } else {
          info.triples.add(triple);
          nums.add(i);
          info.nodes.add(GraphLib.getObject(triple, node));
        }
      }
      i++;
    }
    ArrayLib.remove(triples, nums);
    return info;
  }
  
  public static SubGraphInfo subGraphInfo(List<Triple> triples, String node){
    
    SubGraphInfo info = new SubGraphInfo();
    for(Triple triple : triples){
      if(triple.subject.equals(node) || triple.object.equals(node)){
        info.triples.add(triple);
        info.nodes.add(GraphLib.getObject(triple, node));
      }
    }
    return info;
  }
}