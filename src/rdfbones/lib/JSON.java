package rdfbones.lib;

import java.util.Iterator;

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
  
  public static JSONObject obj(String varName) throws JSONException{
    return obj().put(varName, varName + "URI");
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
  
  public static JSONObject object(JSONArray obj, int index){
    
    try {
      return obj.getJSONObject(index);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return new JSONObject();
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
  
  public static void put(JSONObject obj, String key, Object value){
    
    try {
      obj.put(key, value);
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }

  public static void add(JSONArray array, JSONObject object){
    
    array.put(object);
  }
  
  public static String JSONDebug(JSONObject object, int n){
    
    String json = new String("");
    String tab = new String(new char[n]).replace("\0", "\t");
    Iterator<?> keys = object.keys();
    n++;
    json += "{";
    while(keys.hasNext()){
      String key = (String)keys.next();
      Object value = JSON.obj(object, key);
      if(value instanceof String){
        json += "\n" + tab + key + " : \"" + value + "\"";
      } else {
        json += "\n" + tab + key + " : " + JSONDebug((JSONObject)value, n);
      } 
    json += "}";

    }
    return json;
  }
}
