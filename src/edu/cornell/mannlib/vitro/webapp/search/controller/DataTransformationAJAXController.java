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
  String prefix;
  String dataTransformation;
  String dataTransformationType;
  String measurementDatum;
  String measurementDatumType;
  String measurementValue;
  String measurementValueType;
  JSONArray inputs;
  String editKey;
  JSONObject resp = new JSONObject();

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

    resp = new JSONObject();

    switch (getParameter("task")) {

    case "createNew":

      inputs = JSON.array(requestData, "inputs");
      subjectUri = getParameter("subjectUri");
      prefix = getParameter("prefix");
      dataTransformationType = getParameter("dataTransformationType");
      measurementDatumType = getParameter("measurementDatumType");
      measurementValueType = getParameter("measurementValueType");
      measurementValue = getParameter("measurementValue");
      dataTransformation = this.getUnusedURI();
      measurementDatum = this.getUnusedURI();

      JSONObject dataObject = JSON.obj();
      String triplesToStore = getTripleString();
      if (connector.addTriples(triplesToStore, editKey)) {
        JSON.put(dataObject, "successful", Boolean.TRUE.toString());
      } else {
        JSON.put(dataObject, "successful", Boolean.FALSE.toString());
      }
      JSON.put(dataObject, "createdTriples", triplesToStore);
      JSON.put(dataObject, "dataTransformation", dataTransformation);
      JSON.put(dataObject, "measurementDatum", measurementDatum);
      JSON.put(resp, "dataObject", dataObject);
      break;

    case "delete":

      inputs = JSON.array(requestData, "inputs");
      subjectUri = getParameter("subjectUri");
      dataTransformation = getParameter("dataTransformation");
      dataTransformationType = getParameter("dataTransformationType");
      measurementDatum = getParameter("measurementDatum");
      measurementDatumType = getParameter("measurementDatumType");
      measurementValue = getParameter("measurementValue");
      String triples = getTripleString();
      JSON.put(resp, "triplesToRemove", triples);
      connector.removeTriples(triples, editKey);
      break;

    case "addInput":

      connector.addTriples("<" + getParameter("dataTransformation")
          + "> obo:OBI_0000293 <" + getParameter("input") + "> .", editKey);
      break;

    case "removeInput":

      connector.removeTriples("<" + getParameter("dataTransformation")
          + "> obo:OBI_0000293 <" + getParameter("input") + "> .", editKey);
      break;

    case "edit":

      String oldValue = getParameter("oldMeasurementValue");
      String newValue = getParameter("newMeasurementValue");
      measurementValueType = getParameter("measurementValueType");
      measurementDatum = getParameter("measurementDatum");
      String toRemove =
          "<" + measurementDatum + "> " + "obo:IAO_0000004" + " '" + oldValue + "'^^<"
              + measurementValueType + "> ";
      String toAdd =
          "<" + measurementDatum + "> " + "obo:IAO_0000004" + " '" + newValue + "'^^<"
              + measurementValueType + "> . \n";
      resp("toRemove", toRemove);
      resp("toAdd", toAdd);
      connector.removeTriples(toRemove, editKey);
      connector.addTriples(toAdd, editKey);
      break;

    case "initial":

      subjectUri = JSON.string(requestData, "subjectUri");
      StringSPARQLDataGetter dataTransDataGetter =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_DTs(),
              ArrayLib.getList("uri"), ArrayLib.getList("label", "sdeLabel"), 1);
      
      JSONArray array = dataTransDataGetter.getJSON(ArrayLib.getList(subjectUri));
      JSON.put(resp, "dataTransformations", array);
      
      JSONObject object = (JSONObject) JSON.get(array, 0);
      JSON.put(resp, "prefix", JSON.string(object, "sdeLabel").split("\\.")[0]);
     
      StringSPARQLDataGetter existingDataGetter =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_existingData(),
              ArrayLib.getList("dataTransformation", "dataTransformationType",
                  "measurementDatum", "measurementDatumType", "measurementValueType"), ArrayLib.getList(
                  "dataTransformationTypeLabel", "measurementValue"), 1);
      JSON.put(resp, "existingData",
          existingDataGetter.getJSON(ArrayLib.getList(subjectUri)));
      break;

    case "refresh":

      subjectUri = JSON.string(requestData, "subjectUri");
      StringSPARQLDataGetter dataTransDataGetter2 =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_Refresh(),
              ArrayLib.getList("uri"), ArrayLib.getList("label"), 1);
      JSON.put(resp, "dataTransformations",
          dataTransDataGetter2.getJSON(ArrayLib.getList(subjectUri)));
      break;
      
    case "possibleInputs":

      // Possible inputs
      StringSPARQLDataGetter inputsDataGetter1 =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_inputs(),
              ArrayLib.getList("measurementDatum", "measurementValueType"),
              ArrayLib.getList("measurementDatumLabel", "cardinality", "catLabel",
                  "measurementValue"), 1);
      subjectUri = getParameter("subjectUri");
      dataTransformationType = getParameter("dataTransformationType");
      JSON.put(resp, "possibleInputs", inputsDataGetter1.getJSON(ArrayLib.getList(
          subjectUri, dataTransformationType)));
      break;

    case "possibleInputs_existing":

      // Possible inputs
      StringSPARQLDataGetter inputsDataGetter2 =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_inputs(),
              ArrayLib.getList("measurementDatum"),
              ArrayLib.getList("measurementDatumLabel", "cardinality", "catLabel",
                  "measurementValue"), 1);
      subjectUri = getParameter("subjectUri");
      dataTransformationType = getParameter("dataTransformationType");
      JSON.put(resp, "possibleInputs", inputsDataGetter2.getJSON(ArrayLib.getList(
          subjectUri, dataTransformationType)));

      // Existing inputs
      StringSPARQLDataGetter existingInputsDataGetter =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_exsistingInput(),
              ArrayLib.getList("input"), null, 1);
      dataTransformation = getParameter("dataTransformation");
      JSON.put(resp, "exsistingInputs",
          existingInputsDataGetter.getJSON(dataTransformation));
      break;

    case "outputType":

      StringSPARQLDataGetter outputTypeDataGetter =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_OutputTypes(),
              ArrayLib.getList("measurementDatumType", "measurementValueType"),
              ArrayLib.getList("label"), 1);
      dataTransformationType = JSON.string(requestData, "dataTransformationType");
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

  private static String getDataTriples() {

    String triples =
        ""
            + " ?subjectUri           rdfbones:dataTransformation     ?dataTransformation . \n"
            + " ?subjectUri           obo:BFO_0000051                 ?dataTransformation . \n"
            + " ?dataTransformation   obo:OBI_0000299                 ?measurementDatum . \n"
            + " ?measurementDatum     obo:IAO_0000004                 ?measurementValue^^?measurementValueType . \n"
            + " ?dataTransformation   rdf:type                        ?dataTransformationType . \n"
            + " ?dataTransformation   rdfs:label                      ?dataTransformationLabel . \n"
            + " ?measurementDatum     rdf:type                        ?measurementDatumType . \n"
            + " ?measurementDatum     rdfs:label                      ?measurementDatumLabel . \n";
    
    return triples;
  }

  public String SPARQL_DTs() {

    // In this case the subjectUri
    String query =
        "" + "SELECT ?uri ?label ?sdeLabel " + "WHERE { "
            + "  ?subjectUri     rdfs:label        ?sdeLabel .  "
            + "  ?subjectUri     vitro:mostSpecificType      ?SDEType ."
            + "  ?SDEType        rdfs:subClassOf             ?restriction ."
            + "  ?restriction    owl:onProperty              obo:BFO_0000051 . \n"
            + "  ?restriction    owl:someValuesFrom          ?uri . \n"
            + "  ?uri            rdfs:subClassOf             obo:OBI_0200000 . \n"
            + "  ?subjectUri                 obo:BFO_0000051               ?assayOrDT . \n"
            + "  ?assayOrDT                  obo:OBI_0000299               ?measurementDatum . \n"
            + "  NOT EXISTS {    ?assayOrDT                  obo:OBI_0000293               ?measurementDatum . } \n"
            + "  ?measurementDatum           rdf:type                      ?measurementDatumType ."
            + "  ?uri                        rdfs:subClassOf               ?restriction1 . \n"
            + "  ?restriction1               owl:onProperty                obo:OBI_0000293 . \n"
            + "  ?restriction1                owl:onClass                   ?measurementDatumType . \n"
            + "  OPTIONAL { ?uri    rdfs:label     ?label . } "
            + "  FILTER ( ?subjectUri = <input1> ) " + "}";
    return query;
  }

  public String SPARQL_Refresh() {

    // In this case the subjectUri
    String query =
        "" + "SELECT ?uri ?label \n" 
            + "WHERE { \n"
            + "  ?subjectUri     vitro:mostSpecificType      ?SDEType . \n "
            + "  ?SDEType        rdfs:subClassOf             ?restriction ."
            + "  ?restriction    owl:onProperty              obo:BFO_0000051 . \n"
            + "  ?restriction    owl:someValuesFrom          ?uri . \n"
            + "  ?uri            rdfs:subClassOf             obo:OBI_0200000 . \n"
            + "  ?subjectUri                 obo:BFO_0000051               ?DT . \n"
            + "  ?DT                  obo:OBI_0000299               ?measurementDatum . \n"
            + "  ?measurementDatum           rdf:type                      ?measurementDatumType ."
            + "  ?uri                        rdfs:subClassOf               ?restriction1 . \n"
            + "  ?restriction1               owl:onProperty                obo:OBI_0000293 . \n"
            + "  ?restriction1                owl:onClass                   ?measurementDatumType . \n"
            + "  OPTIONAL { ?uri    rdfs:label     ?label . } "
            + "  FILTER ( ?subjectUri = <input1> ) " + "}";
    return query;
  }
  
  public String SPARQL_existingData() {

    String query =
        ""
            + "SELECT ?dataTransformation ?dataTransformationType ?dataTransformationTypeLabel ?measurementDatum ?measurementDatumType ?measurementValue (datatype(?measurementValue) as ?measurementValueType)  "
            + "WHERE { "
            + "  ?subjectUri                     obo:BFO_0000051           ?dataTransformation . \n"
            + "  ?dataTransformation             rdf:type                  ?dataTransformationType . \n"
            + "  ?dataTransformationType         rdfs:subClassOf           obo:OBI_0200000 . \n"
            + "  OPTIONAL { ?dataTransformationType   rdfs:label           ?dataTransformationTypeLabel . } \n"
            + "  ?dataTransformation             obo:OBI_0000299           ?measurementDatum . \n"
            + "  ?measurementDatum               obo:IAO_0000004           ?measurementValue . \n"
            + "  ?measurementDatum               vitro:mostSpecificType    ?measurementDatumType . \n"
            + "  FILTER ( ?subjectUri = <input1> ) " + "}";
    return query;
  }

  public String SPARQL_inputs() {

    String query =
        ""
            + "SELECT ?measurementDatum ?measurementDatumLabel ?cardinality ?catLabel ?measurementValue (datatype(?measurementValue) as ?measurementValueType) "
            + "WHERE { "
            + "  ?subjectUri                 obo:BFO_0000051               ?assayOrDT . \n"
            + "  ?assayOrDT                  obo:OBI_0000299               ?measurementDatum . \n"
            + "  ?measurementDatum           rdfs:label                    ?measurementDatumLabel . \n"
            + "  ?measurementDatum           rdf:type                      ?measurementDatumType ."
            + "  ?dataTransformationType     rdfs:subClassOf               ?restriction . \n"
            + "  ?restriction                owl:onProperty                obo:OBI_0000293 . \n"
            + "  ?restriction                owl:onClass                   ?measurementDatumType . \n"
            + "  OPTIONAL { ?measurementDatum       obo:IAO_0000004               ?measurementValue . } "
            + "  OPTIONAL {  "
            + "     ?measurementDatum               obo:OBI_0000999          ?categoricalLabel . \n"
            + "     ?categoricalLabel               rdfs:label               ?catLabel . \n"
            + "  }" + "  FILTER ( ?subjectUri = <input1> ) "
            + "  FILTER ( ?dataTransformationType = <input2> ) " + "}";
    return query;
  }

  public String SPARQL_exsistingInput() {

    String query =
        "" + "SELECT ?input " + "WHERE { "
            + "  ?dataTransformation     obo:OBI_0000293          ?input . \n"
            + "  FILTER ( ?dataTransformation = <input1> ) " + "}";
    return query;
  }

  // In this case the subjectUri
  public String SPARQL_OutputTypes() {

    String query =
        ""
            + "SELECT ?measurementDatumType ?label "
            + "WHERE { "
            + "     ?DTType              rdfs:subClassOf              ?restriction1 . \n"
            + "     ?restriction1        owl:onProperty               obo:OBI_0000299 . \n "
            + "     ?restriction1        owl:qualifiedCardinality     ?cardinality . \n "
            + "     ?restriction1        owl:onClass                  ?measurementDatumType . \n "
            + "     OPTIONAL { ?measurementDatumType      rdfs:label         ?label . }  \n"
            + "     FILTER ( ?DTType = <input1> )" 
            + "}";
    return query;
  }
 
  String getParameter(String key) {

    return JSON.string(requestData, key);
  }

  void resp(String key, String value) {

    JSON.put(resp, key, value);
  }

  private Map<String, String> getDataMap() {

    Map<String, String> map = new HashMap<String, String>();
    map.put("subjectUri", subjectUri);
    map.put("dataTransformation", dataTransformation);
    map.put("dataTransformationType", dataTransformationType);
    map.put("measurementDatum", measurementDatum);
    map.put("measurementDatumType", measurementDatumType);
    map.put("measurementValueType", measurementValueType);
    return map;
  }

  private Map<String, String> getLiteralMap() {

    Map<String, String> map = new HashMap<String, String>();
    map.put("measurementValue", measurementValue);
    map.put("dataTransformationLabel", prefix + "." + dataTransformationType.split("#")[1]);
    map.put("measurementDatumLabel", prefix + "." + measurementDatumType.split("#")[1]);
    return map;
  }

  private String getInputs() {
    String triple = new String("");
    for (int i = 0; i < this.inputs.length(); i++) {
      String input = JSON.stringArr(this.inputs, i);
      triple +=
          "<" + dataTransformation + ">   obo:OBI_0000293 <" + input + "> .\n";
    }
    return triple;
  }

  private String getTripleString() {

    String triplesString = getDataTriples();
    triplesString = QueryUtils.subUrisForQueryLiterals(triplesString, getLiteralMap());
    triplesString = QueryUtils.subUrisForQueryVars(triplesString, getDataMap());
    triplesString += getInputs();
    return triplesString;
  }

}
