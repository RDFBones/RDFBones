package edu.cornell.mannlib.vitro.webapp.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DeleteCoherentDivision implements DeleteConfig{

  public static Map<String, String> predicateMap = new HashMap<String, String>(){{
      put("systemicPartOf", "obo:systemic_part_of");
      put("regionalPartOf", "obo:regional_part_of");
      put("isAbout", "obo:IAO_0000136");
      put("hasPart", "obo:BFO_0000051");
      put("compState", "obo:OBI_0000999");
  }
  };
 
  public static String[] inputs = {"coherentDivision"};
  
  public Map<String, String> getPredicateMap(){
    return predicateMap;
  }

  static String[] objectTriple0 = { "boneDivision", "systemicPartOf", "coherentDivision"};
  static String[] objectTriple1 = { "boneOrgan", "systemicPartOf", "boneDivision"};
  static String[] objectTriple2 = { "boneSegment", "regionalPartOf", "boneOrgan"};
  static String[] objectTriple3 = { "completeness", "isAbout", "boneSegment" };
  static String[] objectTriple4 = { "skeletalInventory", "hasPart", "completeness" };
  static String[] objectTriple5 = { "completeness", "compState", "completenessState" };
  
  public static List<String[]> getObjectTriples(){
    
    List<String[]> objectTriples = new ArrayList<String[]>();
    objectTriples.add(objectTriple0);
    objectTriples.add(objectTriple1);
    objectTriples.add(objectTriple2);
    objectTriples.add(objectTriple3);
    objectTriples.add(objectTriple4);
    objectTriples.add(objectTriple5);
    return objectTriples;
  }
  
  public static List<String[]> getDataTriples(){

    return new ArrayList<String[]>();
  } 
  
}
