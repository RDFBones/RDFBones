package rdfbones.lib;

import rdfbones.rdfdataset.OptionalTriple;
import rdfbones.rdfdataset.Triple;

public class QueryLib {

  public static String getMSTTripleString(String varName){
    
    return new String("?" + varName + "\tvitro:mostSpecificType\t?" + varName + "Type.");
  }
  
  public static String getLabelTripleString(String varName){
    
    return new String("OPTIONAL { ?" + varName + "\trdfs:label\t?" + varName + "Label }.");
  }
  
  public static Triple getMSTTriple(String varName){
    
    return new Triple(varName, "vitro:mostSpecificType", varName + "Type");
  }
  
  public static Triple getLabelTriple(String varName){
    
    return new Triple(varName, "rdfs:label", varName + "Label");
  }
  
  public static Triple getOptionalLabelTriple(String varName){
    
    return new OptionalTriple(varName, "rdfs:label", varName + "Label");
  }
  
}