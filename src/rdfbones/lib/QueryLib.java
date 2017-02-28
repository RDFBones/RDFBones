package rdfbones.lib;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;

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
  
  public static String getPredicateKey(String predicate){
    
    return predicate.substring(predicate.indexOf(":") + 1, predicate.length());
  }
  
  public static Map<String, List<Map<String, String>>> groupBy(List<Map<String, String>> list, String varName){
  	
    Map<String, List<Map<String, String>>> map = new HashMap<String, List<Map<String, String>>>();
  	for(Map<String, String> dataMap : list){
  		String key = dataMap.get(varName);
  		if(!map.containsKey(key)){
  			List<Map<String, String>> dataList = new ArrayList<Map<String, String>>();
  			map.put(key, dataList);
  		}
  		map.get(key).add(dataMap);
  	}
  	return map;
  }
  
  public static JSONObject getObject(Map<String, List<Map<String, String>>> map, String key, List<String> nodes){
  	
  	Map<String, String> dataMap = map.get(key).get(0);
		JSONObject object = JSON.obj();
		for(String node : nodes){
			JSON.put(object, node, dataMap.get(node));
		}
  	return object;
  }
}

  
  