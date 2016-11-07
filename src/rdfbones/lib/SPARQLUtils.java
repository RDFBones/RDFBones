package rdfbones.lib;

import java.util.List;

import rdfbones.rdfdataset.Triple;

public class SPARQLUtils {

  
  public static String assembleSelectVars(List<String> vars){
    
    String select = new String("");
    for(String var : vars){
      select += " ?" + var;
    }
    return select;
  }
  
  public static String assembleQueryTriples(List<Triple> triples){
    
    String tripleString = new String("");
    for(Triple triple : triples){
      tripleString += triple.getTriple();
    }
    return tripleString;
  }
}
