package edu.cornell.mannlib.vitro.webapp.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DeleteInstance implements DeleteConfig{

  public static Map<String, String> predicateMap = new HashMap<String, String>(){{
      put("rdfType", "rdf:type");
  }
  };
 
  public static String[] inputs = {"instance"};
  
  public Map<String, String> getPredicateMap(){
    return predicateMap;
  }

  static String[] objectTriple1 = { "instance", "rdfType", "type" };
  
  public static List<String[]> getObjectTriples(){
    
    List<String[]> objectTriples = new ArrayList<String[]>();
    objectTriples.add(objectTriple1);
    return objectTriples;
  }
  
  public static List<String[]> getDataTriples(){

    return new ArrayList<String[]>();
  } 
  
}
