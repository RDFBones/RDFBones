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
    if (JSON.string(formData, "dataType") != null) {
      this.literalField = true;
    }
  }

  public MeasurementDatum(WebappConnector connector, JSONObject formData, String property) {

    this.connector = connector;
    this.property = property;
    this.formData = formData;
  }

  public String getTriples(String subjectVarName, String varName, String prefix){
    
    StringSPARQLDataGetter outputTypeDataGetter =
        new StringSPARQLDataGetter(this.connector, SPARQL_OutputTypes(),
            ArrayLib.getList("type", "dataType", "catLabType"),
            ArrayLib.getList("label"));
    
    JSONObject result = outputTypeDataGetter.getSingleResult(ArrayLib.getList(JSON.string(this.formData, subjectVarName + "Type"),
        this.property));

    Entity measurementDatum = new Entity(connector, result, prefix);
    String triples = measurementDatum.getTriples();
   
    dataType = JSON.string(result, "dataType");
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
      JSON.put(result, "value", "0.00");
      triples += N3Utils.getLiteralTriple("uri", "obo:IAO_0000004", "value", "dataType", result);
    }
    JSON.put(formData, varName, result);
    return triples;
  }

  public String getConnector(String subject, String property) {

    return N3Utils.getDataTriple(subject, property, this.subject);
  }

  public void edit() {

    String toRemove;
    String toAdd;
    if (this.literalField) {
      toRemove =
          N3Utils.getLiteralTriple("uri", "obo:IAO_0000004", "value", "dataType",
              this.formData);
      toAdd =
          N3Utils.getLiteralTriple("uri", "obo:IAO_0000004", "value", "dataType",
              this.formData);
    } else {
      toRemove = N3Utils.getDataTriple("uri", "obo:IAO_0000004", "value", this.formData);
      toAdd = N3Utils.getDataTriple("uri", "obo:IAO_0000004", "newValue", this.formData);
    }
    this.connector.removeTriples(toRemove);
    this.connector.addTriples(toAdd);
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
            + "       ?MDType            rdfs:subClassOf              ?r1 . \n "
            + "       ?r1                owl:onProperty               obo:IAO_0000004 . \n "
            + "       ?r1                owl:dataRange                ?dataType .   \n "
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

  public String SPARQL_Labels() {

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