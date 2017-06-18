package rdfbones.graphData;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.JSON;
import rdfbones.lib.StringSPARQLDataGetter;

public class Entity {

  public String object;
  String varName;
  String label;
  String subject;
  String property;
  String type;
  WebappConnector connector;
  
  public Entity(WebappConnector connector){
    
    this.connector = connector;
  }
  
  public Entity(){
    
  }
  
  public Entity(WebappConnector connector, JSONObject json){
    
    this(connector, json, "");
  }
  
  public Entity(WebappConnector connector, JSONObject json, String prefix){

    this.type = JSON.string(json, "type");
    this.subject = connector.getUnusedURI();
    this.label = getLabel(json, "label", prefix);
    JSON.put(json, "uri", this.subject);
    JSON.put(json, "label", this.label);
  }
  
  public Entity(WebappConnector connector, JSONObject json, String varName, String prefix){
    
    this.varName = varName;
    this.type = JSON.string(json, varName + "Type");
    this.subject = connector.getUnusedURI();
    this.label =  getLabel(json, varName + "TypeLabel", prefix);
    JSON.put(json, varName, this.subject);
    JSON.put(json, varName + "Label", this.label);
  }

  public String getTriples() {

    String triples = new String("");
    triples += N3Utils.getDataTriple(this.subject, "rdf:type", this.type);
    triples += N3Utils.getLiteralTriple(this.subject, "rdfs:label", label, (String) null);
    return triples;
  }
  
  public static String getTriples(JSONObject object){
    String triples = new String("");
    triples += N3Utils.getDataTriple("uri", "rdf:type", "type", object);
    triples += N3Utils.getLabelTriple("uri", "rdfs:label", "label", object);
    return triples;
  }
  
  public static String getTriples(JSONObject object, String varName){
    
    String triples = new String("");
    triples += N3Utils.getDataTriple(varName, "rdf:type", varName + "Type", object);
    triples += N3Utils.getLabelTriple(varName, "rdfs:label", varName + "Label", object);
    return triples;
  }
  
  public String getConnector(String subject, String property){

    return N3Utils.getDataTriple(subject, property, this.subject);
  }
  
  public String getConnector(String subject, String property, String subProperty){

    String triples = N3Utils.getDataTriple(subject, property, this.subject);
    triples += N3Utils.getDataTriple(subject, subProperty, this.subject);
    return triples;
  }
  
  private String getLabel(JSONObject json, String varName, String prefix){
    
    String label;
    if(JSON.string(json, varName).length() > 0){
      label = prefix +  "." + JSON.string(json, varName); 
    } else {
      String[] types = type.split("#");
      if(types.length > 1){
        label = prefix +  "." + type.split("#")[1];
      } else {
        label = prefix +  "." + type.split("#")[0];
      }
    }
    return label;
  }
  
  public JSONArray getEntities(String subject, String property, String type, String varName){
    
    String tab = "\t";
    String close =  " . \n ";
    String varname = "?" + varName;
    String varNameType = "?" + varName + "Type";
    String varNameLabel = "?" + varName + "Label";
    String varNameTypeLabel = "?" + varName + "TypeLabel";

    String query = "SELECT " + varname + tab + varNameType + tab + varNameLabel +
    " WHERE { " +
      "<" + subject + "> " + property + " "  + varname + close +
      varname + " rdf:type " + type + close +
      varname + " rdfs:label "  + varNameLabel + close + 
      varname + " vitro:mostSpecificType  " + varNameType + close +
      "OPTIONAL { " + varNameType + " rdfs:label  " + varNameTypeLabel + " } " +
     " } ";
   
   StringSPARQLDataGetter instanceDG =
        new StringSPARQLDataGetter(this.connector, query,
            ArrayLib.getList(varName, varName + "Type"), ArrayLib.getList(varName + "Label", varName + "TypeLabel"));
    return processTypeLabels(varName, instanceDG.getJSON(new ArrayList<String>()));
  }
  
  
  JSONArray processTypeLabels(String varName, JSONArray array){
    
    for(int i = 0; i < array.length(); i++){
      JSONObject obj = (JSONObject) JSON.get(array, i);
      if(!(JSON.string(obj, varName + "TypeLabel").length() > 0)){
        String label = JSON.string(obj, varName + "Type").split("#")[1];
        JSON.put(obj, varName + "TypeLabel", label);
      }
    }
    return array;
  }
}
