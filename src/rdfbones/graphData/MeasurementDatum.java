package rdfbones.graphData;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.JSON;
import rdfbones.lib.StringSPARQLDataGetter;

public class MeasurementDatum {

  WebappConnector connector;

  JSONObject descriptor;

  public JSONObject formData;

  Boolean literalField = false;
  String inputType;
  String subject;
  String property;
  String label;
  String type;
  String value;
  String dataType;
  String catLabType;
  String varName;

  public MeasurementDatum(WebappConnector connector, JSONObject formData) {

    this.connector = connector;
    this.formData = formData;
    if (JSON.string(formData, "dataType").length() > 0) {
      this.literalField = true;
    }
  }

  public MeasurementDatum(WebappConnector connector, JSONObject formData, String property) {

    this.connector = connector;
    this.property = property;
    this.formData = formData;
  }

  public String getTriples(String subjectVarName, String varName, String prefix){
  
    String inputType = JSON.string(this.formData, subjectVarName + "Type");
    JSONObject result = getResult1(inputType);
   
    if(JSON.string(result, "catLabType").length() == 0 && JSON.string(result, "dataType").length() == 0){
      result = getResult2(JSON.string(result, "type"));
    }
    
    Entity measurementDatum = new Entity(connector, result, prefix);
    String triples = measurementDatum.getTriples();
    
    if(JSON.string(result, "catLabType").length() > 0){
      //Instance selector
      StringSPARQLDataGetter instanceDataGetter =
          new StringSPARQLDataGetter(this.connector, SPARQL_Labels(),
              ArrayLib.getList("uri"), ArrayLib.getList("label")); 
      JSONArray instances = instanceDataGetter.getJSON(JSON.string(result, "catLabType"));
      String firstInstance = JSON.string(JSON.getJSON(instances, 0), "uri");

      JSON.put(result, "instances", instances);
      JSON.put(result, "value", firstInstance);

      triples += N3Utils.getDataTriple("uri", "obo:OBI_0000999", "value", result);
    } else {
      //Literal field
      literalField = true;
      dataType = JSON.string(result, "dataType");
      JSON.put(result, "value", "0.00");
      JSON.put(result, "dataType", dataType);

      triples += N3Utils.getLiteralTriple("uri", "obo:IAO_0000004", "value", "dataType", result);
    }
    triples += N3Utils.getDataTriple(JSON.string(formData, subjectVarName), this.property, measurementDatum.subject);
    JSON.put(formData, varName, result);
    return triples;
  }

  public JSONObject getResult1(String inputType){
    
    StringSPARQLDataGetter outputTypeDataGetter =
        new StringSPARQLDataGetter(this.connector, SPARQL_OutputTypes(),
            ArrayLib.getList("type", "dataType", "catLabType"),
            ArrayLib.getList("label"));
    return outputTypeDataGetter.getSingleResult(ArrayLib.getList(inputType, this.property));
  }
 
  public JSONObject getResult2(String inputType){
    
    StringSPARQLDataGetter outputTypeDataGetter =
        new StringSPARQLDataGetter(this.connector, SPARQL_OutputTypes_2(),
            ArrayLib.getList("type", "dataType", "catLabType"),
            ArrayLib.getList("label"));
    return outputTypeDataGetter.getSingleResult(ArrayLib.getList(inputType));
  }
  
  public static JSONObject getMD(WebappConnector connector, String subject, String property){
    
    StringSPARQLDataGetter outputTypeDataGetter =
        new StringSPARQLDataGetter(connector, SPARQL_Existing_Scalar_MD(),
            ArrayLib.getList("uri", "type", "catLabType", "catLab", "dataType"),
            ArrayLib.getList("value", "catLabLabel"));
   
    JSONObject output = outputTypeDataGetter.getSingleResult(ArrayLib.getArray(subject, property));
   
    if(JSON.string(output, "value").length() > 0){
      String[] data = JSON.string(output, "value").split("^^");
      JSON.put(output, "value", JSON.string(output, "value").split("^^")[0]);
      if(data.length > 1){
        JSON.put(output, "type", JSON.string(output, "value").split("^^")[1]);
      }
    } else {
      JSON.put(output, "value", JSON.string(output, "catLab"));
      StringSPARQLDataGetter instanceDataGetter =
          new StringSPARQLDataGetter(connector, SPARQL_Labels(),
              ArrayLib.getList("uri"), ArrayLib.getList("label")); 
      JSONArray instances = instanceDataGetter.getJSON(JSON.string(output, "catLabType"));
      JSON.put(output, "instances", instances);
    }
    return output;
  }

  public String getConnector(String subject, String property) {

    return N3Utils.getDataTriple(subject, this.property, this.subject);
  }

  public void edit() {

    String toRemove;
    String toAdd;
    if (this.literalField) {
      toRemove =
          N3Utils.getLiteralTriple("uri", "obo:IAO_0000004", "value", "dataType",
              this.formData);
      toAdd =
          N3Utils.getLiteralTriple("uri", "obo:IAO_0000004", "newValue", "dataType",
              this.formData);
    } else {
      toRemove = N3Utils.getDataTriple("uri", "obo:OBI_0000999", "value", this.formData);
      toAdd = N3Utils.getDataTriple("uri", "obo:OBI_0000999", "newValue", this.formData);
    }
    this.connector.removeTriples(toRemove);
    this.connector.addTriples(toAdd);
  }

  public static String SPARQL_Existing_Scalar_MD() {

    String close =  " . \n ";
    String query = "SELECT ?uri ?type ?catLab ?catLabType ?catLabLabel ?value  (datatype(?value) as ?dataType)" 
    + " WHERE { \n "
    + "  ?subject  ?property     ?uri  " + close 
    + "  ?uri       vitro:mostSpecificType    ?type " + close 
    + "  ?uri       rdfs:label                ?label " + close  
    + "  OPTIONAL { ?uri    obo:IAO_0000004    ?value  } " + close
    + "  OPTIONAL { "
    + "     ?uri         obo:OBI_0000999    ?catLab "  + close
    + "     ?catLab      vitro:mostSpecificType    ?catLabType "  + close
    + "     ?catLab      rdfs:label         ?catLabLabel " + close  
    + "   }"
    + " FILTER ( ?subject = <input1> ) " + close
    + " FILTER ( ?property = <input2> ) " + close 
    + " } ";
    return query;
  }
 
  public static String SPARQL_OutputTypes() {

    String query =
        ""
            + "SELECT ?type ?label ?dataType ?catLabType "
            + "WHERE { "
            + "     ?inputType          rdfs:subClassOf              ?r . \n"
            + "     ?r                  owl:onProperty               ?property . \n "
            + "     ?r                  owl:onClass                  ?type . \n "
            + "     OPTIONAL { ?type    rdfs:label   ?label . } \n "
            + "     OPTIONAL {  \n "
            + "       ?type              rdfs:subClassOf              ?r1 . \n "
            + "       ?r1                owl:onProperty               obo:IAO_0000004 . \n "
            + "       ?r1                owl:onDataRange                ?dataType .   \n "
            + "     } . \n "
            + "     OPTIONAL {  \n "
            + "       ?type              rdfs:subClassOf       ?r2 . \n "
            + "       ?r2                owl:onProperty               obo:OBI_0000999 . \n "
            + "       ?r2                owl:onClass                  ?catLabType .   \n "
            + "     }  \n  " 
            + "     FILTER ( ?inputType  = <input1> )"
            + "     FILTER ( ?property = <input2> )" + "}";
    return query;
  }

  public static String SPARQL_OutputTypes_2() {

    String query =
        ""
            + "SELECT ?type ?label ?dataType ?catLabType "
            + "WHERE { "
            + "     ?inputType                 rdfs:subClassOf        ?type . \n "
            + "     OPTIONAL { ?type    rdfs:label   ?label . } \n "
            + "     OPTIONAL {  \n "
            + "       ?type              rdfs:subClassOf              ?r1 . \n "
            + "       ?r1                owl:onProperty               obo:IAO_0000004 . \n "
            + "       ?r1                owl:onDataRange                ?dataType .   \n "
            + "     } . \n "
            + "     OPTIONAL {  \n "
            + "       ?type              rdfs:subClassOf       ?r2 . \n "
            + "       ?r2                owl:onProperty               obo:OBI_0000999 . \n "
            + "       ?r2                owl:onClass                  ?catLabType .   \n "
            + "     }  \n  " 
            + "     FILTER ( ?inputType  = <input1> )"
            + "} ";
    return query;
  }
  
  public static String SPARQL_Labels() {

    String query =
        "" + "SELECT ?uri ?label "
            + "WHERE { "
            + "     ?uri     rdf:type   ?labelType  . \n "
            + "     OPTIONAL { ?uri     rdfs:label   ?label . } \n "
            + "     FILTER ( ?labelType = <input1> )" + "}";
    return query;
  }

  public String literalTriples(Map<String, String> map) {

    String triples =
        "" + "?subject         ?property         ?uri    ."
            + "?uri             rdf:type          ?type . "
            + "?uri             rdfs:label        \"?label\" . "
            + "?uri             obo:IAO_0000004  \"?value\"^^?dataType  .";
    return QueryUtils.subUrisForQueryVars(triples, map);
  }

  public String instanceTriples(Map<String, String> map) {

    String triples =
        "" + "?subject         ?property         ?uri    ."
            + "?uri             rdf:type          ?type . "
            + "?uri             rdfs:label        \"?label\" . "
            + "?uri             obo:OBI_0000999   ?value . ";
    return QueryUtils.subUrisForQueryVars(triples, map);

  }

  private String getInstanceTriples() {
    return new String("?uri  obo:OBI_0000999   ?value . ");
  }

}