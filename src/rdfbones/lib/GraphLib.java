package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;

import rdfbones.rdfdataset.*;

public class GraphLib {

  public static List<String> getNodes(List<Triple> dataTriples, List<Triple> restrictionTriples){
    
    List<String> nodes = new ArrayList<String>();
    nodes.addAll(getNodes(dataTriples));
    nodes.addAll(getNodes(restrictionTriples));
    return nodes;
  }
  
  public static List<String> getNodes(List<Triple> triples){
    
    List<String> nodes = new ArrayList<String>();
    for(Triple triple : triples){
      ArrayLib.addDistinct(nodes, triple.subject.varName);
      ArrayLib.addDistinct(nodes, triple.object.varName);
    }
    return nodes; 
  }
  
  public static String getSubject(Triple triple, String varName){
    
    if(triple.subject.varName.equals(varName)){
      return triple.subject.varName;
    } else {
      return triple.object.varName;
    }
  }
  
  public static String getObject(Triple triple, String varName){
    
    if(triple.subject.varName.equals(varName)){
      return triple.object.varName;
    } else {
      return triple.subject.varName;
    }
  }
  
  public static List<String> getObjectNodes(List<Triple> triples){
   
    List<String> object = new ArrayList<String>();
    for(Triple triple : triples){
      object.add(triple.object.varName);
    }
    return object;
  }
  
  public static List<Triple> getAndRemoveTypeTriples(List<Triple> triples, List<String> nodes){
    
    List<Triple> toReturn = new ArrayList<Triple>();
    List<Integer> nums = getTypeNums(triples, nodes);
    ArrayLib.set(toReturn, triples, nums);
    ArrayLib.remove(triples, nums);
    return toReturn;
  }

  public static List<Triple> getAndRemoveSubClassTriples(List<Triple> triples, List<String> nodes){
    
    List<Triple> toReturn = new ArrayList<Triple>();
    List<Integer> nums = getSubClassNums(triples, nodes);
    ArrayLib.set(toReturn, triples, nums);
    ArrayLib.remove(triples, nums);
    return toReturn;
  }

  public static List<Integer> getTypeNums(List<Triple> triples, List<String> nodes){
 
    return getTripleNums(triples, nodes, "rdf:type");
  }
  
  public static List<Integer> getSubClassNums(List<Triple> triples, List<String> nodes){
    
    return getTripleNums(triples, nodes, "rdfs:subClassOf");
  }
  
  public static List<Integer> getTripleNums(List<Triple> triples, List<String> nodes, String predicate){
  
    List<Integer> typeNums = new ArrayList<Integer>();
    Integer i = 0;
    for(Triple triple : triples){
      if(nodes.contains(triple.subject.varName) && triple.predicate.equals(predicate)){
        typeNums.add(i);
      }
      i++;
    }
    return typeNums;
  }
  
  public static List<Triple> getTypeTriples(List<Triple> triples, List<String> nodes){
      return getTriples(triples, nodes, "rdf:type");
  }

  public static List<Triple> getSubClassTriples(List<Triple> triples, List<String> nodes){
      return getTriples(triples, nodes, "rdf:subClassOf");
  }
  
  public static List<Triple> getTriples(List<Triple> triples, List<String> nodes, String predicate){
  
    List<Triple> typeTriples = new ArrayList<Triple>();
    for(String node : nodes){
      typeTriples.add(getTriple(triples, node, predicate));
    }
    return typeTriples;
  }
  
  public static Triple getTriple(List<Triple> triples, String node, String predicate){
    
    for(Triple triple : triples){
      if(triple.subject.varName.equals(node) && triple.predicate.equals(predicate)){
        return triple;
      }
    }
    return null;
  }
  
  public static List<Triple> getRestrictionTriples(List<String> nodes, List<Triple> triples){
    
    List<Triple> addTo = new ArrayList<Triple>();
    for(Triple triple : triples){
      if(nodes.contains(triple.subject.varName) && nodes.contains(triple.object.varName)){
        addTo.add(triple);
      }
    }
    return addTo;
  }
  
  public static List<Triple> getAndRemoveRestrictionTriples(List<String> nodes, List<Triple> triples){
    
    List<Integer> nums = new ArrayList<Integer>();
    Integer i = 0;
    for(Triple triple : triples){
      if(nodes.contains(triple.subject.varName) && nodes.contains(triple.object.varName)){
         nums.add(i);
      }
      i++;
    }
    List<Triple> toReturn = new ArrayList<Triple>();
    ArrayLib.set(toReturn, triples, nums);
    ArrayLib.remove(triples, nums);
    return toReturn;
  }
  
  public static List<String> getNewInstances(List<Triple> triples){
    
    List<String> newInstances = new ArrayList<String>();
    for(Triple triple : triples){
      if(!(triple.subject instanceof ExistingInstance) && !(triple.subject instanceof InputNode)){
        ArrayLib.addDistinct(newInstances, triple.subject.varName);
      }
      if(!(triple.object instanceof ExistingInstance) && !(triple.object instanceof InputNode)){
        ArrayLib.addDistinct(newInstances, triple.object.varName);
      }
    }
    return newInstances;
  }
  
  public static List<String> getExistingInstances(List<Triple> triples){
    
    List<String> newInstances = new ArrayList<String>();
    for(Triple triple : triples){
      if((triple.subject instanceof ExistingInstance)){
        ArrayLib.addDistinct(newInstances, triple.subject.varName);
      }
      if(triple.object instanceof ExistingInstance){
        ArrayLib.addDistinct(newInstances, triple.object.varName);
      }
    }
    return newInstances;
  }
  
  public static List<Triple> getSchemeTriples(List<Triple> graphTriples,List<Triple> restrictionTriples){
    
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
  
  public static void setDataInputVars(Graph graph){
    
    //Variables to set
    graph.triplesToStore = new ArrayList<Triple>();
    graph.newInstances = new ArrayList<String>();
    graph.inputInstances = new ArrayList<String>();
    graph.constantLiterals = new ArrayList<String>();
    graph.inputLiterals = new ArrayList<String>();
    graph.inputClasses = new ArrayList<String>();

    graph.typeQueryTriples = new ArrayList<Triple>();
    graph.classesToSelect = new ArrayList<String>();
    
    graph.triplesToStore.addAll(graph.dataTriples);

    //newInstamces, literals inputs
    for(Triple triple : graph.schemeTriples){
      if(!triple.predicate.equals("rdf:type")){
        graph.typeQueryTriples.add(triple);  
      }
      if(triple.subject instanceof InputNode){
        graph.inputClasses.add(triple.subject.varName);
      }
      if(triple.object instanceof InputNode){
        graph.inputClasses.add(triple.object.varName);
      }
    }
    
    for(Triple triple : graph.dataTriples){
      if(triple.subject instanceof InputNode){
        ArrayLib.addDistinct(graph.inputInstances, triple.subject.varName);
      } else {
        ArrayLib.addDistinct(graph.newInstances, triple.subject.varName);
      }
      
      if(triple.object instanceof InputNode){
        if(triple instanceof LiteralTriple){
          ArrayLib.addDistinct(graph.inputLiterals, triple.object.varName);
        } else {
          ArrayLib.addDistinct(graph.inputInstances, triple.object.varName);
        }
      } else {
        if(triple instanceof LiteralTriple){
          ArrayLib.addDistinct(graph.constantLiterals, triple.object.varName);
        } else {
          ArrayLib.addDistinct(graph.newInstances, triple.object.varName);
        }
      }
    }
    
    //triplesToStore, typeQueryTriples, classesToSelect
    for(Triple triple : graph.schemeTriples){
      if(triple instanceof RestrictionTriple){
         ArrayLib.addDistinct(graph.classesToSelect, triple.subject.varName);
         ArrayLib.addDistinct(graph.classesToSelect, triple.object.varName);
      } else {
        if(triple.predicate.equals("rdf:type")){
          if(!(triple.subject instanceof InputNode)){
            graph.triplesToStore.add(triple);
          }
          if(!(triple.object instanceof InputNode)){
            ArrayLib.addDistinct(graph.classesToSelect, triple.object.varName);
          }
         if(triple.subject instanceof InputNode){
           graph.typeQueryTriples.add(triple);
         }
        }
      }
    }
  }
  
  public static void setDataRetrievalVars(Graph graph){
    
    //Variables to set
    graph.dataRetreivalQuery = new ArrayList<Triple>();
    graph.urisToSelect = new ArrayList<String>();
    graph.literalsToSelect = new ArrayList<String>();
    graph.dataRetreivalQuery.addAll(graph.dataTriples);
    
    for(String var : graph.newInstances){
      graph.urisToSelect.add(var);
      graph.urisToSelect.add(var + "Type");
      graph.dataRetreivalQuery.add(QueryLib.getMSTTriple(var));
    }
    
    for(String var : graph.inputInstances){
      graph.urisToSelect.add(var);
      graph.urisToSelect.add(var + "Type");
      graph.typeQueryTriples.add(QueryLib.getMSTTriple(var));
      graph.literalsToSelect.add(var + "Label");
      graph.dataRetreivalQuery.add(QueryLib.getOptionalLabelTriple(var));
    };
    
    for(String var : graph.inputLiterals){
      graph.literalsToSelect.add(var);
    }
    for(String var : graph.constantLiterals){
      graph.literalsToSelect.add(var);
    }
  }
    
}