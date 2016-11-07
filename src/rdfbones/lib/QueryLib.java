package rdfbones.lib;

public class QueryLib {

  public static String getMSTTriple(String varName){
    
    return new String("?" + varName + "\tvitro:mostSpecificType\t?" + varName + "Type .\n");
  }
}