package rdfbones.lib;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JSON {

  
  public static JSONObject getDummy1() throws JSONException{
    
    JSONObject measurementDatum1 = obj();
    measurementDatum1.put("measurementDatumType", "http://purl.obolibrary.org/obo/OBI_0000938");
    measurementDatum1.put("categoricalLabel", "catLab1");
    
    JSONObject measurementDatum2 = obj();
    measurementDatum2.put("measurementDatumType", "http://purl.obolibrary.org/obo/OBI_0000938");
    measurementDatum2.put("categoricalLabel", "catLab2");
    
    JSONArray measurementDatum = arr();
    measurementDatum.put(measurementDatum1);
    measurementDatum.put(measurementDatum2);
    
    JSONObject boneSegment1 = obj();
    boneSegment1.put("boneSegment", "boneSegment1");
    
    JSONObject boneSegment2 = obj();
    boneSegment2.put("boneSegment", "boneSegment2");
    
    JSONArray boneSegment = arr();
    boneSegment.put(boneSegment1);
    boneSegment.put(boneSegment2);
    
    JSONArray specimenCollectionProcessArray = new JSONArray();
    JSONObject specimenCollectionProcess = new JSONObject();
    specimenCollectionProcess.put("assayType", "http://w3id.org/rdfbones/extensions/FrSexEst#Assay.ExternalOccipitalProtuberance");
    specimenCollectionProcess.put("measurementDatum", measurementDatum);
    specimenCollectionProcess.put("boneSegment", boneSegment);

    specimenCollectionProcessArray.put(specimenCollectionProcess);
    
    JSONObject data = obj();
    
    data.put("subject", "http://vivo.mydomain.edu/individual/n5195");
    data.put("specimenCollectionProcess", specimenCollectionProcessArray);
    
    return data;
  }
  
  public static JSONObject obj(){
    return new JSONObject();
  }  
  
  public static JSONArray arr(){
    return new JSONArray();
  }
  
  public static JSONObject obj1(String varName) throws JSONException{
    return obj().put("uri", varName);
  }
  
  public static String string(JSONObject obj, String key){
    
    if(obj.has(key)){
      try {
        return obj.getString(key);
      } catch (JSONException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
    } 
    return new String("");
  }
 
  public static Object obj(JSONObject obj, String key){
    try {
      return obj.get(key);
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return null;
  }
  
  public static JSONObject object(JSONObject obj, String key){
    if(obj.has(key)){
      try {
        return obj.getJSONObject(key);
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }
    return new JSONObject();
  }
  
  public static Object objectOrArray(JSONObject obj, String key){
    if(obj.has(key)){
      try {
        return obj.get(key);
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }
    return new JSONObject();
  }
  
  
  public static JSONObject object(JSONArray obj, int index){
    
    try {
      return obj.getJSONObject(index);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return new JSONObject();
  }
  
  public static JSONArray array(List<String> array){
    
    JSONArray jsonArray = new JSONArray();
    for(String element : array){
      jsonArray.put(element);
    }
    return jsonArray;
  }
  
  public static JSONArray array(JSONObject obj, String key){
    if(obj.has(key)){
      try {
        return obj.getJSONArray(key);
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }
    return new JSONArray();
  }
  
  public static JSONObject copyObject(JSONObject object){
  	
  	JSONObject ret = JSON.obj();
  	Iterator<?> keys = object.keys();
  	while(keys.hasNext()){
  		JSON.copyValue(ret, object, (String) keys.next());
  	}
  	return ret;
  }
  
  public static void copyValue(JSONObject to, JSONObject from, String key){
  	
  	JSON.put(to, key, JSON.string(from, key));
  }
  
  
  public static void put(JSONObject obj, String key, Object value){
    
    try {
      obj.put(key, value);
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }
  
  public static JSONObject getJSON(JSONArray array, int i){
    
    try {
      return (JSONObject) array.get(i);
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return null;
  }
  
  
  public static Object get(JSONArray array, int i){
    
    try {
      return array.get(i);
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return null;
  }
  
  public static String getStr(JSONArray array, int i){
    
    try {
      return array.getString(i);
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return null;
  }
  
  public static void add(JSONArray array, JSONObject object){
    
    array.put(object);
  }
  
  public static String debug(JSONArray array){
    JSONObject obj = JSON.obj();
    JSON.put(obj, "array", array);
    return debug(obj, 0);
  }
  
  public static String debug(JSONObject object){
    return debug(object, 0);
  }
  public static String debug(JSONObject object, int n){
    
    String json = new String("");
    String tab = new String(new char[n]).replace("\0", "\t");
    Iterator<?> keys = object.keys();
    n++;
    json += "{";
    while(keys.hasNext()){
      String key = (String)keys.next();
      Object value = JSON.obj(object, key);
      if(value instanceof String){
        json += "\n" + tab + key + " : \"" + value + "\",";
      } else if((value instanceof Integer) || (value instanceof Boolean)){
        json += "\n" + tab + key + " : " + value.toString() + ",";
      } else if(value instanceof JSONArray){
        json += "\n" + tab + key + " : " + debugArray((JSONArray) value, n) + ",";
      } else {
      	json += "\n" + tab + key + " : " + debug((JSONObject)value, n) + ",";	
      } 
    }
    json += "}";
    return json;
  }
  
  public static String debugArray(JSONArray array, int n){
    
    String str = new String("");
    String tab = new String(new char[n]).replace("\0", "\t");
    n++;
    str += "[";
    for(int i = 0; i < ((JSONArray)array).length(); i++){
      Object element;
      element = JSON.get((JSONArray)array, i);
      if(element instanceof String){
         str += "\"" + element + "\", ";
      } else if(element instanceof JSONObject){
         str += debug((JSONObject)element, n);
      }
    }
    str += "]";
    return str;
  }
  
  public static JSONObject obj(String objectDescriptor){
    
    try {
      return new JSONObject(objectDescriptor); 
    } catch(JSONException e){
      e.printStackTrace();
    }
    return null;
  }
 
  public static JSONArray arr(String arrayDescriptor){
    
    try {
      return new JSONArray(arrayDescriptor); 
    } catch(JSONException e){
      e.printStackTrace();
    }
    return null;
  }
  
  public static String stringArr(JSONArray array, int i){
	  
	  try{
		 return array.getString(i);
	  } catch(JSONException e){
		  e.printStackTrace();
	  }
	  return null;
  }
  
  public static JSONObject get(JSONObject obj, String key){
	  
	  try {
		  return obj.getJSONObject(key);
	  } catch (JSONException e){
		  e.printStackTrace();
	  }
	  return null;
  }
  
  public static JSONObject getObject(String string){
	  
	try {
		return new JSONObject(string);
	} catch (JSONException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return new JSONObject();
  }
  
  public static void putObject(JSONArray array, JSONObject object){
		array.put(object);
  }
  
  public static void putString(JSONArray array, String str){
		array.put(str);
  }
  
  /*
  public static void put(JSONArray array, JSONObject object){
	  try {
		 array.put(value)(object);
	  } catch (JSONException e){
		  e.printStackTrace();
	  }
  }*/
  
  public static List<Map<String, String>> convert(JSONArray array){
  	
  	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
  	for(int i = 0; i < array.length(); i++){
  		list.add(convert(JSON.getJSON(array, i)));
  	}
  	return list;
  }
  
  public static Map<String, String> convert(JSONObject object){
		
  	Map<String, String> map = new HashMap<String, String>();
  	Iterator<?> keys = object.keys();
  	while(keys.hasNext()){
  		String key = (String) keys.next();
  		map.put(key, JSON.string(object, key));
  	}
  	return map;
  }
  
  public static JSONObject convert(Map<String, String> object){
		
		JSONObject json = JSON.obj();
		for(String key : object.keySet()){
			JSON.put(json, key, object.get(key));
		}
		return json;
  }

  public static void append(JSONObject object, String key, String value){
  	
  	String val;
  	if(object.has(key)){
  		val = JSON.string(object, key) + "\n" + value;
  	} else {
  		val = value;
  	}
  	JSON.put(object, key, val);
  }
}
