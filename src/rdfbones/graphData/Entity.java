package rdfbones.graphData;

import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.search.controller.DataTransformationAJAXController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.lib.JSON;

public class Entity {

  public String object;
  String varName;
  String label;
  String subject;
  String property;
  String type;

  private static final Log log = LogFactory
      .getLog(Entity.class);
  
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
    triples += N3Utils.getLiteralTriple(this.subject, "rdfs:label", label, null);
    return triples;
  }
  
  public String getConnector(String subject, String property){

    return N3Utils.getDataTriple(subject, property, this.subject);
  }
  
  private String getLabel(JSONObject json, String varName, String prefix){
    
    String label;
    if(JSON.string(json, varName).length() > 0){
      label = prefix +  "." + JSON.string(json, varName); 
    } else {
      //String[] splitted1 = type.split("\\#");
      //String[] splitted2 = type.split("#");
      //log.info("1 " + splitted1[0] + " " + splitted1[1]);
      //log.info("2 " + splitted2[0] + " " + splitted2[1]);
      label = prefix +  "." + type.split("\\#")[1];
    }
    return label;
  }
}
