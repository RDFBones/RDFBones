package edu.cornell.mannlib.vitro.webapp.dao.jena;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;

public class N3Utils {

    private static final Log log = LogFactory.getLog(N3Utils.class);
    private static Map<String, String> prefixDef = new HashMap<String, String>(){{
      put("rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#");
      put("rdfs","http://www.w3.org/2000/01/rdf-schema#");
      put("obo","http://purl.obolibrary.org/obo/");
      put("bibo","http://purl.org/ontology/bibo/");
      put("rdfbones","http://w3id.org/rdfbones/core#");
      put("vitro-public", "http://vitro.mannlib.cornell.edu/ns/vitro/public#");
      put("vitro", "http://vitro.mannlib.cornell.edu/ns/vitro/0.7#");
    }};
    
    public static void setInputMap(Map<String, String> inputMap, 
      String[] inputParameters, VitroRequest vreq){
        for(String param : inputParameters){
          log.info("SetInputMap");
          log.info(param);
          inputMap.put(param, vreq.getParameter(param));
        }
    }
    
    public static void setOutputMap(Map<String, String> outputMap, 
      String[] outputParameters, Map<String, String> inputMap){
        for(String param : outputParameters){
          outputMap.put(param, inputMap.get(param));
        }
    }
    
    public static String[] subInputMap(Map<String, String> values, String[] triples){
      String[] toReturn = new String[triples.length];
      Integer n = 0;
      for(String triple : triples){
        for(String key : values.keySet()){
            if(triple.contains("?" + key)){
              //triple = triple.replace("?" + key, "<" + values.get(key) + ">");
              triple = triple.replace("?" + key, values.get(key));
            }
          }
        toReturn[n] = triple;
        n++;
      }
      return toReturn;
    }
    
    
    public static String getSubject(String triple){
      log.info(triple.split("\\s+")[0]);
      return triple.split("\\s+")[0];
    }
    
    public static String getPredicate(String triple){
      String predicate = triple.split("\\s+")[1];
      for(String prefix : prefixDef.keySet()){
        if(predicate.contains(prefix + ":")){
          predicate = predicate.replace(prefix + ":", prefixDef.get(prefix));
          break;
        } 
       }
      log.info("Predicate:" + predicate);
       return predicate;
    }
    
    public static String getObject(String triple){
      String object = triple.split("\\s+")[2];
      for(String prefix : prefixDef.keySet()){
        if(object.contains(prefix + ":")){
          object = object.replace(prefix + ":", prefixDef.get(prefix));
          break;
        } 
       }
      log.info("Object:" + object);
       return object;
    }

    public static String getLiteralObject(String triple){
      String[] res =  triple.split("\\s+");
      String ret = new String();
      int n = 0;
      for(String part : res){
        if(n > 1){
          ret += part + " ";
        }
        n++;
      }
      log.info("Object: " + ret.substring(0, ret.length()-1));
      return ret.substring(0, ret.length()-1);
      //return ret + "^^http://www.w3.org/2001/XMLSchema#string";
    }
    
    public static String setPrefixes(String[] prefixes, String query){
      String prefixList = new String();
      for(String prefix : prefixDef.keySet()){
        prefixList += "PREFIX " + prefix + ": <" + prefixDef.get(prefix) + ">\n";
      }
      String queryToReturn = prefixList + query;
      return  queryToReturn;
    }

    public static String subInputUriQuery(String query, 
      String[] parameters, VitroRequest vreq){
      String toReturn = query;
      for(String param : parameters){
        toReturn = toReturn.replace("?" + param, "<" + vreq.getParameter(param) + ">");
       }
      return toReturn;
    }
    
    public static String subInputLiteralQuery(String query, 
      String[] parameters, VitroRequest vreq){
      String toReturn = query;
      for(String param : parameters){
        toReturn = toReturn.replace("?" + param, "'" + vreq.getParameter(param) + "'");
       }
      return toReturn;
    }
    
    public static void setJsonArray(JSONArray arr, List<Map<String, String>> results){
      for(Map<String, String> result : results){
          JSONObject jsonObj = new JSONObject();
          for (String key : result.keySet()) {
            try {
             jsonObj.put(key, result.get(key));
            } catch (JSONException e) {
             // TODO Auto-generated catch block
             e.printStackTrace();
           }
          }
          arr.put(jsonObj);
       }
   }
}