package edu.cornell.mannlib.vitro.webapp.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DeleteBoneOrgan implements DeleteConfig{

  public static Map<String, String> predicateMap = new HashMap<String, String>(){{
      put("regionalPart", "obo:regional_part_of");
      put("hasPart", "obo:BFO_0000051");
      put("isAbout", "obo:IAO_0000136");
      put("hasCategoricalValue", "obo:OBI_0000999");
    }
  };
 
  public static String[] inputs = {"boneOrgan"};
  
  public Map<String, String> getPredicateMap(){
    return predicateMap;
  }

  static String[] objectTriple1 = { "boneSegment", "regionalPart", "boneOrgan" };
  static String[] objectTriple2 = { "completeness", "isAbout", "boneSegment" };
  static String[] objectTriple3 = { "completeness", "hasCategoricalValue", "completenessState" };
  static String[] objectTriple4 = { "skeletalInventory", "hasPart", "completeness" };
  
  public static List<String[]> getObjectTriples(){
    
    List<String[]> objectTriples = new ArrayList<String[]>();
    objectTriples.add(objectTriple1);
    objectTriples.add(objectTriple2);
    objectTriples.add(objectTriple3);
    objectTriples.add(objectTriple4);
    return objectTriples;
  }
  
  public static List<String[]> getDataTriples(){

    return new ArrayList<String[]>();
  } 
  
}
