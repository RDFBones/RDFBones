package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Graph;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.JSON;
import rdfbones.lib.SPARQLDataGetter;
import rdfbones.lib.SPARQLUtils;
import rdfbones.lib.StringSPARQLDataGetter;
import rdfbones.rdfdataset.*;
import webappconnector.VIVOWebappConnector;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.PropertyInstanceDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;

/**
 * AutocompleteController generates autocomplete content via the search index.
 */

public class DataTransformationAJAXController extends VitroAjaxController {

  public static final String PARAMETER_UPLOADED_FILE = "datafile";

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory
      .getLog(DataTransformationAJAXController.class);

  NewURIMaker newUri;
  JSONObject requestData;
  
  String subjectUri;
  String dataTransformation;
  String dataTransformationType;
  String measurementDatum;
  String measurementDatumType;
  String measurementValue;
  JSONArray inputs;
  String editKey;
  
  private static Map<String, String> prefixDef = new HashMap<String, String>();

  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    WebappConnector connector = new VIVOWebappConnector(vreq);
    Graph connectorGraph = new Graph();
    connectorGraph.setWebapp(connector);
    this.newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());

    this.requestData = JSON.getObject(vreq.getParameter("requestData"));
    editKey = getParameter("editKey");
    
    JSONObject resp = new JSONObject();
    
    switch (getParameter("task")) {

    case "createNew":
      
      inputs = JSON.array(requestData, "inputs");
      subjectUri = getParameter("subjectUri");
      dataTransformationType = getParameter("dataTransformationType");
      measurementDatumType = getParameter("measurementDatumType");
      measurementValue = getParameter("measurementValue");
      dataTransformation = this.getUnusedURI();
      measurementDatum = this.getUnusedURI();
      
      String triplesToStore = getTripleString();
      if(connector.addTriples(triplesToStore, editKey)){
        log.info("succesfully");
      } else {
        log.info("unSuccesfully");
      }
      JSONObject dataObject = JSON.obj();
      JSON.put(dataObject, "createdTriples", triplesToStore);
      JSON.put(dataObject, "dataTransformation", dataTransformation);
      JSON.put(dataObject, "measurementDatum", measurementDatum);
      JSON.put(resp, "dataObject", dataObject);
      log.info("Ende");
      break;

    case "addInput":

      String dt1 = "<" + getParameter("dataTransformation") + ">";
      String inputUri1 = "<" + getParameter("inputUri") + ">";
      connector.addTriples(dt1 + " obo:OBI_0000299" , inputUri1);
      break;

    case "removeInput": 

      String dt2 = "<" + getParameter("dataTransformation") + ">";
      String inputUri2 = "<" + getParameter("inputUri") + ">";
      connector.removeTriples(dt2 + " obo:OBI_0000299" , inputUri2);
      break;
      
    case "delete":

      inputs = JSON.array(requestData, "inputs");
      subjectUri = JSON.string(requestData, "subjectUri");
      dataTransformationType = JSON.string(requestData, "DTType");
      measurementDatumType = JSON.string(requestData, "measurementDatumType");
      measurementValue = JSON.string(requestData, "measValue");
      connector.removeTriples(getTripleString(), editKey);
      break;

    case "edit":

      String oldValue = getParameter("newMeasurementValue");
      String newValue = getParameter("oldMeasurementValue");
      measurementDatum = getParameter("meausurementDatum");
      String toRemove = "<" + measurementDatum + "> "  + 
          "obo:IAO_0000004" +  "\"" + oldValue + "\" . " ;
      String toAdd = "<" + measurementDatum + "> "  + 
          "obo:IAO_0000004" +  "\"" + newValue + "\" . " ;
      connector.removeTriples(toRemove, editKey);
      connector.addTriples(toAdd, editKey);
      break;

    case "initial":

      subjectUri = JSON.string(requestData, "subjectUri");
      StringSPARQLDataGetter dataTransDataGetter = new StringSPARQLDataGetter(connectorGraph, SPARQL_DTs(), 
          ArrayLib.getList("uri"), ArrayLib.getList("label"), 1);
      JSON.put(resp,"dataTransformations", dataTransDataGetter.getJSON(ArrayLib.getList(subjectUri)));

      StringSPARQLDataGetter existingDataGetter = new StringSPARQLDataGetter(connectorGraph, SPARQL_existingData(), 
          ArrayLib.getList("dataTransformation","dataTransformationType", "measurementDatum", "measurementDatumType"), 
          ArrayLib.getList("dataTransformationTypeLabel", "measurementValue"), 1);
      JSON.put(resp,"existingData", existingDataGetter.getJSON(ArrayLib.getList(subjectUri)));
      break;
    
    case "inputs":
      
      StringSPARQLDataGetter inputsDataGetter = new StringSPARQLDataGetter(connectorGraph, SPARQL_inputs(), 
          ArrayLib.getList("measDatum"), ArrayLib.getList("typeLabel", "cardinality", "catLabel", "literalValue"), 1);
      subjectUri = JSON.string(requestData, "subjectUri");
      JSON.put(resp, "inputs", inputsDataGetter.getJSON(subjectUri));
       break;
      
    case "outputType":
      
      StringSPARQLDataGetter outputTypeDataGetter = new StringSPARQLDataGetter(connectorGraph, SPARQL_OutputTypes(), 
          ArrayLib.getList("measDatumType","literalType"), ArrayLib.getList("label"), 1);
      log.info(SPARQL_OutputTypes());
      dataTransformationType = JSON.string(requestData, "dataTransformationType");
      log.info(dataTransformationType);
      JSON.put(resp, "inputs", outputTypeDataGetter.getJSON(dataTransformationType));
      break;
     
    default:
      break;
    }
    
    JSON.put(resp, "queries", connector.getQueries());
    response.getWriter().write(resp.toString());  
  }

  public String getUnusedURI() {
    try {
      return this.newUri.getUnusedNewURI(null);
    } catch (InsertException e) {
      e.printStackTrace();
    }
    return new String("");
  }

  private static List<Triple> getDataTriples() {

    List<Triple> dataTriples = new ArrayList<Triple>();
    dataTriples.add(new Triple("subjectUri", "obo:BFO_0000051", "dataTransformation"));
    dataTriples.add(new Triple("dataTransformation", "obo:OBI_0000299",
        "measurementDatum"));
    dataTriples.add(new LiteralTriple("measurementDatum", "obo:IAO_0000004",
        "measurementValue"));
    // Type triples
    dataTriples.add(new Triple("dataTransformation", "vitro:mostSpecificType",
        "dataTransformationType"));
    dataTriples.add(new Triple("measurementDatum", "vitro:mostSpecificType",
        "measurementDatumType"));
    return dataTriples;
  }
  
  public String SPARQL_DTs(){
  
    //In this case the subjectUri
    String query = ""
        + "SELECT ?uri ?label"
        + "WHERE { "
        + "  ?subjectUri     vitro:mostSpecificType      ?SDEType ."
        + "  ?SDEType        rdfs:subClassOf             ?restriction ."
        + "  ?restriction    owl:onProperty              obo:BFO_0000051 . "
        + "  ?restriction    owl:someValuesFrom          ?uri . "
        + "  ?uri            rdfs:subClassOf             obo:OBI_0200000 . "  
        + "  OPTIONAL { ?uri    rdfs:label     ?label . } "
        + "  FILTER ( ?subjectUri = <input1> ) "
        + "}"; 
    return query;
  }
  
  public String SPARQL_existingData(){
    
    String query = ""
        + "SELECT ?dataTransformation ?dataTransformationType ?dataTransformationTypeLabel ?measurementDatum ?measurementDatumType ?measurementValue "
        + "WHERE { "
        + "  ?subjectUri           obo:BFO_0000051               ?dataTransformation . "
        + "  ?dataTransformation   rdf:type                      obo:OBI_0200000 . "
        + "  ?dataTransformation   vitro:mostSpecificType        ?dataTransformationType . "
        + "  OPTIONAL { ?dataTransformationType   rdfs:label     ?dataTransformationTypeLabel . }"
        + "  ?dataTransformation                   obo:OBI_0000299               ?measurementDatum . "
        + "  ?measurementDatum     obo:IAO_0000004               ?measurementValue . " 
        + "  ?measurementDatum     vitro:mostSpecificType        ?measurementDatumType ."    
        + "  FILTER ( ?subjectUri = <input1> ) "
        + "}";
    return query;
  }
  
  public String SPARQL_inputs(){
  
    String query = ""
        + "SELECT ?measDatum ?typeLabel ?cardinality ?catLabel ?literalValue"
        + "WHERE { "
        + "  ?subjectUri     obo:BFO_0000051            ?assayOrDT . "
        + "  ?assayOrDT      obo:OBI_0000299            ?measDatum . "
        + "  ?measDatum      rdf:type                   ?measDatumType . " 
        + "  ?DTType         rdfs:subClassOf            ?restriction . "
        + "  ?restriction    owl:onProperty             obo:OBI_0000293 . "
        + "  ?restriction    owl:qualifiedCardinality   ?cardinality . "
        + "  ?restriction    owl:onClass                ?measDatumType . "
        + "  OPTIONAL { ?measDatumType  rdfs:label       ?typeLabel . } "
        + "  OPTIONAL { ?measDatum      obo:IAO_0000004  ?literalValue . } "
        + "  OPTIONAL {  "
        + "     ?measDatum          obo:OBI_0000999   ?categoricalLabel . "
        + "     ?categoricalLabel   rdfs:label        ?catLabel . "
        + "  }"
        + "  FILTER ( ?subjectUri = <input1> ) "
        + "}";
    return query;
  }
  
  //In this case the subjectUri
  public String SPARQL_OutputTypes(){

    String query = ""
        + "SELECT ?measDatumType ?label ?literalType "
        + "WHERE {{ "
        + "     ?DTType              rdfs:subClassOf              ?restriction1 ." 
        + "     ?restriction1        owl:onProperty               obo:OBI_0000299 . "
        + "     ?restriction1        owl:qualifiedCardinality     ?cardinality . "
        + "     ?restriction1        owl:onClass                  ?measDatumType . "
        + "     ?measDatumType       rdfs:subClassOf              ?superMeasDatumType ."    
        + "     ?superMeasDatumType  rdfs:subClassOf              ?restriction2 . "
        + "     ?restriction2        owl:onProperty               <http://vivoweb.org/ontology/core#hasValue> . "
        + "     ?restriction2        owl:onDataRange              ?literalType . "
        + "     OPTIONAL { ?measDatumType      rdfs:label     ?label . } "
        + " } UNION {"
        + "     ?DTType              rdfs:subClassOf              ?restriction1 . "
        + "     ?restriction1        owl:onProperty               obo:OBI_0000299 . "   
        + "     ?restriction1        owl:qualifiedCardinality     ?cardinality . "
        + "     ?restriction1        owl:onClass                  ?measDatumType . "
        + "     ?measDatumType       rdfs:subClassOf              ?restriction2 . "
        + "     ?restriction2        owl:onProperty               <http://vivoweb.org/ontology/core#hasValue> . "
        + "     ?restriction2        owl:someValuesFrom           ?literalType . "
        + "     OPTIONAL { ?measDatumType      rdfs:label         ?label . }  "
        + " } "
        + " FILTER ( ?DTType = <input1> )"
        + "}"; 
    return query;
  }

  String getParameter(String key){
    
    return JSON.string(requestData, key); 
  }
  
  private Map<String, String> getDataMap(){
    
    Map<String, String> map = new HashMap<String, String>();
    map.put("subjectUri", subjectUri);
    map.put("dataTransformation", dataTransformation);
    map.put("dataTransformationType", dataTransformationType);
    map.put("measurementDatum", measurementDatum);
    map.put("measurementDatumType", measurementDatumType);
    return map;
  }
  
  private Map<String, String> getLiteralMap(){
  
    Map<String, String> map = new HashMap<String, String>();
    map.put("measurementValue", measurementValue);
    return map;
  }

  private String getInputs(){
    String triple = new String("");
    for (int i = 0; i < this.inputs.length(); i++) {
      String input = JSON.stringArr(this.inputs, i);  
      triple += "<" + input + ">   obo:OBI_0000293 <" + this.dataTransformation + "> .\n"; 
    }
    return triple;
  }
  
  private String getTripleString(){
    
    String triplesString = SPARQLUtils.assembleTriples(getDataTriples());
    triplesString += " ?dataTransformation  rdf:type obo:OBI_0200000  . ";
    triplesString = QueryUtils.subUrisForQueryLiterals(triplesString, getLiteralMap());
    triplesString = QueryUtils.subUrisForQueryVars(triplesString, getDataMap());
    triplesString += getInputs();
    return triplesString;
  }
  
}
