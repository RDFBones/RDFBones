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

  private DataPropertyStatementDao dataDao;
  private ObjectPropertyStatementDao objectDao;
  private PropertyInstanceDao propDao;

  NewURIMaker newUri;

  private String[] objectTriplesAdd;
  private String[] dataTriplesAdd;
  private String[] objectTriplesRemove;
  private String[] dataTriplesRemove;

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

    this.dataDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    this.objectDao = vreq.getWebappDaoFactory().getObjectPropertyStatementDao();
    this.propDao = vreq.getWebappDaoFactory().getPropertyInstanceDao();

    WebappConnector connector = new VIVOWebappConnector(vreq);
    Graph connectorGraph = new Graph();
    connectorGraph.setWebapp(connector);

    this.newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());
    List<Triple> triples = getDataTriples();
  
    editKey = vreq.getParameter("editKey");
    JSONObject requestData = JSON.getObject(vreq.getParameter("requestData"));
    
    // Data
    JSONObject resp = new JSONObject();
    switch (vreq.getParameter("task")) {

    case "createNew":
      
      inputs = JSON.array(requestData, "inputs");
      subjectUri = JSON.string(requestData, "subjectUri");
      dataTransformationType = JSON.string(requestData, "DTType");
      measurementDatumType = JSON.string(requestData, "measurementDatumType");
      measurementValue = JSON.string(requestData, "measValue");
      dataTransformation = this.getUnusedURI();
      measurementDatum = this.getUnusedURI();
      
      if(connector.addTriples(getTripleString(), editKey)){
        log.info("succesfully");
      } else {
        log.info("unSuccesfully");
      }
      JSONObject dataObject = JSON.obj();
      JSON.put(dataObject, "dataTransformation", dataTransformation);
      JSON.put(dataObject, "measurementDatum", measurementDatum);
      JSON.put(resp, "dataObject", dataObject);
      log.info("Ende");
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

      String oldValue = JSON.string(requestData, "newMeasurementValue");
      String newValue = JSON.string(requestData, "oldMeasurementValue");
      measurementDatum = JSON.string(requestData, "meausurementDatum");
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
          ArrayLib.getList("DT","?DTType", "measurementDatum"), ArrayLib.getList("DTTypeLabel", "measurementValue"), 1);
      JSON.put(resp,"existingData", existingDataGetter.getJSON(ArrayLib.getList(subjectUri)));
      break;
    
    case "inputs":
      
      StringSPARQLDataGetter inputsDataGetter = new StringSPARQLDataGetter(connectorGraph, SPARQL_inputs(), 
          ArrayLib.getList("measDatum"), ArrayLib.getList("typeLabel", "cardinality", "catLabel", "literalValue"), 1);
      subjectUri = JSON.string(requestData, "subjectUri");
      JSON.put(resp, "inputs", inputsDataGetter.getData(subjectUri));
       break;
      
    case "outputType":
      
      StringSPARQLDataGetter outputTypeDataGetter = new StringSPARQLDataGetter(connectorGraph, SPARQL_OutputTypes(), 
          ArrayLib.getList("measDatumType"), ArrayLib.getList("label", "literalType"), 1);
      dataTransformationType = JSON.string(requestData, "dataTransformationType");
      JSON.put(resp, "inputs", outputTypeDataGetter.getData(dataTransformationType));
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
    dataTriples.add(new Triple("dataTransformation", "rdf:type",
        "dataTransformationType"));
    dataTriples.add(new Triple("measurementDatum", "rdf:type",
        "measurementDatumType"));
    return dataTriples;
  }
  
  private static List<Triple> dataTransformationTriples() {

    List<Triple> triples = new ArrayList<Triple>();
    triples.add(new Triple("subjectUri", "obo:BFO_0000051", "dataTransformation"));
    triples.add(new Triple("dataTransformation", "obo:OBI_0000293", "sexScore"));
    triples.add(new Triple("sexScore", "obo:IAO_0000299", "categoricalLabel"));
    triples.add(new LiteralTriple("sexScore", "rdfs:label", "sexScoreLabel"));
    triples.add(new LiteralTriple("categoricalLabel", "rdfs:label", "categoricalLabelLabel"));
    triples.add(new Triple("dataTransformation", "obo:OBI_0000299",
        "degreeOfSexualisation"));
    triples.add(new LiteralTriple("degreeOfSexualisation", "obo:IAO_0000004",
        "degree"));
    return triples;
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
  }
  
  public String SPARQL_existingData(){
    
    String query = ""
        + "SELECT ?DT ?DTType ?DTTypeLabel ?measurementDatum ?measurementValue "
        + "WHERE { "
        + "  ?subjectUri         obo:BFO_0000051               ?DT . "
        + "  ?DT                 rdf:type                      obo:OBI_0200000 . "
        + "  ?DT                 vitro:mostSpecificType        ?DTType . "
        + "  OPTIONAL { ?dataTransformationType   rdfs:label   ?DTTypeLabel . }"
        + "  ?DT                 obo:OBI_0000299               ?measurementDatum . }"
        + "  ?measurementDatum   obo:IAO_0000004               ?measurementValue . }" 
        + "  FILTER ( ?subjectUri = <input1> ) "
        + "}";
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
  }
  

  public String SPARQL_OutputTypes(){
  
    //In this case the subjectUri
    String query = ""
        + "SELECT ?measDatumType ?label ?literalType "
        + "WHERE { "
        + "  {"
        + "     ?DTType              rdfs:subClassOf              ?restriction1 ."    
        + "     ?restriction1        owl:onProperty               obo:OBI_0000293 . "
        + "     ?restriction1        owl:qualifiedCardinality     ?cardinality . "
        + "     ?restriction1        owl:onClass                  ?measDatumType . "
        + "     ?measDatumType       rdfs:subClassOf              ?restriction . "
        + "     ?restriction2        owl:onProperty               <http://vivoweb.org/ontology/core#hasValue> . "
        + "     ?restriction2        owl:someValuesFrom           ?literalType . "
        + "     OPTIONAL { ?measDatumType      rdfs:label     ?label . } "
        + " } UNION { "
        + "     ?DTType              rdfs:subClassOf              ?restriction1 . "    
        + "     ?restriction1        owl:onProperty               obo:OBI_0000293 . "
        + "     ?restriction1        owl:qualifiedCardinality     ?cardinality . "
        + "     ?restriction1        owl:onClass                  ?measDatumType . "
        + "     ?measDatumType       rdfs:subClassOf              ?superMeasDatumType . "
        + "     ?superMeasDatumType  rdfs:subClassOf              ?restriction2 . "
        + "     ?restriction2        owl:onProperty               <http://vivoweb.org/ontology/core#hasValue> . "
        + "     ?restriction2        owl:someValuesFrom           ?literalType . "
        + "     OPTIONAL { ?measDatumType    rdfs:label     ?label . } "   
        + " }"
        + " FILTER ( ?DTType = <input1> )"
        + "}"; 
  }
  
  private Map<String, String> getDataMap(){
    
    Map<String, String> map = new HashMap<String, String>();
    map.put("subjectUri", subjectUri);
    map.put("dataTransformation", dataTransformation);
    map.put("measurementDatum", measurementDatum);
    map.put("measurementDatumType", measurementDatumType);
    map.put("measurementValue", measurementValue);
    return map;
  }
  
  private Map<String, String> getLiteralMap(){
  
    Map<String, String> map = new HashMap<String, String>();
    map.put("literalValue", literalValue);
    return map;
  }

  private String getInputs(){
    String triple = new String("");
    for (int i = 0; i < this.inputs.length(); i++) {
      JSONObject jsonObject = JSON.stringArr(this.inputs, i);  
      triple += "<" + input + ">   obo:OBI_0000293 <" + this.dataTransformation + "> .\n"; 
    }
    return triple;
  }
  
  private String getTripleString(){
    
    String triplesString = SPARQLUtils.assembleTriples(getDataTriples());
    triplesString = QueryUtils.subUrisForQueryLiterals(triplesString, getLiteralMap());
    triplesString = QueryUtils.subUrisForQueryVars(triplesString, getDataMap());
    triplesString += getInputs();
    return triplesString;
  }
  
}
