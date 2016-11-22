package rdfbones.lib;

import java.util.List;

import rdfbones.rdfdataset.OptionalTriple;
import rdfbones.rdfdataset.Triple;

public class SPARQLUtils {

  public static String assembleSelectVars(List<String> uris, List<String> literals){
    
    String select = new String("");
    for(String var : uris){
      select += " ?" + var;
    }
    for(String var : literals){
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
  
  public static String assembleTriples(List<Triple> triples){
    
    String tripleString = new String("");
    for(Triple triple : triples){
      tripleString += triple.getTriple();
    }
    return tripleString;
  }
}
