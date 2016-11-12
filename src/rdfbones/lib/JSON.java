package rdfbones.lib;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JSON {

  
  public static JSONObject getDummy1() throws JSONException{
    
    JSONObject measurementDatum1 = obj();
    measurementDatum1.put("measurementDatumType", "measType1");
    measurementDatum1.put("categoricalLabel", "catLab1");
    
    JSONObject measurementDatum2 = obj();
    measurementDatum2.put("measurementDatumType", "measType2");
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
    specimenCollectionProcess.put("assayType", "assayType1");
    specimenCollectionProcess.put("measurementDatum", measurementDatum);
    specimenCollectionProcess.put("boneSegment", boneSegment);

    specimenCollectionProcessArray.put(specimenCollectionProcess);
    
    JSONObject data = obj();
    
    data.put("subject", "subjectUri");
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
  
  public static String getString(JSONObject obj, String key) throws JSONException{
    
    if(obj.has(key)){
      return obj.getString(key);
    } else {
      return new String("");
    }
  }
 
}
