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

import rdfbones.customHandlers.DataTransformation;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Entity;
import rdfbones.graphData.Graph;
import rdfbones.graphData.MeasurementDatum;
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

    this.requestData = JSON.getObject(vreq.getParameter("requestData"));
    editKey = getParameter("editKey");

    WebappConnector connector = new VIVOWebappConnector(vreq, editKey);
    Graph connectorGraph = new Graph();
    connectorGraph.setWebapp(connector);
    this.newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());

    resp = JSON.copyObject(this.requestData);
    String triples = new String("");

    switch (getParameter("task")) {

    // This is called by the form loading process
    case "initial":

      subjectUri = JSON.string(requestData, "subjectUri");
      StringSPARQLDataGetter dataTransDataGetter =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_DTs(),
              ArrayLib.getList("uri"), ArrayLib.getList("label", "sdeLabel"), 1);

      JSONArray array = dataTransDataGetter.getJSON(ArrayLib.getList(subjectUri));
      JSON.put(resp, "dataTransformations", array);

      JSONObject object = (JSONObject) JSON.get(array, 0);
      JSON.put(resp, "prefix", JSON.string(object, "sdeLabel").split("\\.")[0]);
      
      Entity dts = new Entity(connector);
      JSONArray dtsEnt = dts.getEntities(subjectUri, "obo:BFO_0000051", "obo:OBI_0200000",
          "dataTransformation"); 
      
      JSON.put(resp, "exsistingData", dtsEnt);
      for(int i = 0; i < dtsEnt.length(); i++){
        JSONObject obj = JSON.getJSON(dtsEnt,i);
        String dataTransformation = JSON.string(obj, "dataTransformation");
        JSON.put(obj, "measurementDatum", 
            MeasurementDatum.getMD(connector, dataTransformation, "obo:OBI_0000299"));
      }
      break;

    case "saveForm":

      dataTransformationType = getParameter("dataTransformationType");
      subjectUri = getParameter("subjectUri");
      prefix = getParameter("prefix");

      // Entity creates a dataTransformation instance triples
      Entity dTEntity = new Entity(connector, resp, "dataTransformation", prefix);

      triples += dTEntity.getTriples();
      triples +=
          dTEntity.getConnector(subjectUri, "obo:BFO_0000051",
              "rdfbones:dataTransformation");

      MeasurementDatum mD = new MeasurementDatum(connector, resp, "obo:OBI_0000299");
      triples += mD.getTriples("dataTransformation", "measurementDatum", prefix);

      connector.addTriples(triples);
      break;

    case "formData":

      switch (getParameter("dataKey")) {

        case "inputData":

        break;
      }
      break;

    case "del":

      DataTransformation.delete(connector, requestData);
      break;

    case "addInput":

      connector.addTriples("<" + getParameter("dataTransformation")
          + "> obo:OBI_0000293 <" + getParameter("input") + "> .", editKey);
      break;

    case "removeInput":

      connector.removeTriples("<" + getParameter("dataTransformation")
          + "> obo:OBI_0000293 <" + getParameter("input") + "> .", editKey);
      break;

    case "editData":

      switch (getParameter("dataKey")) {

      case "measurementDatum":
        MeasurementDatum mdEdit =
            new MeasurementDatum(connector, JSON.get(this.requestData, "dataObject"));
        mdEdit.edit();
        break;

      case "inputData":

        if (getParameter("type") == "add") {

        } else {
          // Remove

        }

        break;
      default:
        break;
      }
      break;

    case "refresh":

      subjectUri = JSON.string(requestData, "subjectUri");
      StringSPARQLDataGetter dataTransDataGetter2 =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_Refresh(),
              ArrayLib.getList("uri"), ArrayLib.getList("label"), 1);
      JSON.put(resp, "dataTransformations",
          dataTransDataGetter2.getJSON(ArrayLib.getList(subjectUri)));
      break;

    case "inputData" :
      resp = DataTransformation.inputData(connector, requestData);
      break;

    default:
      break;
    }
    JSON.put(resp, "log", connector.logJSON());
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

  private static String getDataTriples1() {

    String triples =
        ""
            + " ?subjectUri           rdfbones:dataTransformation     ?dataTransformation . \n"
            + " ?subjectUri           obo:BFO_0000051                 ?dataTransformation . \n"
            + " ?dataTransformation   rdf:type                        ?dataTransformationType . \n"
            + " ?dataTransformation   rdfs:label                      ?dataTransformationLabel . \n"
            + " ?dataTransformation   obo:OBI_0000299                 ?measurementDatum . \n";

    return triples;
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
        ""
            + "SELECT ?uri ?label ?sdeLabel "
            + "WHERE { "
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
            + "  FILTER ( ?subjectUri = <input1> ) " + "}  ORDER BY ?uri";
    return query;
  }

  public String SPARQL_Refresh() {

    // In this case the subjectUri
    String query =
        ""
            + "SELECT ?uri ?label \n"
            + "WHERE { \n"
            + "  ?subjectUri     vitro:mostSpecificType      ?SDEType . \n "
            + "  ?SDEType        rdfs:subClassOf             ?restriction ."
            + "  ?restriction    owl:onProperty              obo:BFO_0000051 . \n"
            + "  ?restriction    owl:someValuesFrom          ?uri . \n"
            + "  ?uri            rdfs:subClassOf             obo:OBI_0200000 . \n"
            + "  ?subjectUri                 obo:BFO_0000051               ?DTOrAssay . \n"
            + "  ?DTOrAssay                  obo:OBI_0000299               ?measurementDatum . \n"
            + "  ?measurementDatum           rdf:type                      ?measurementDatumType ."
            + "  ?uri                        rdfs:subClassOf               ?restriction1 . \n"
            + "  ?restriction1               owl:onProperty                obo:OBI_0000293 . \n"
            + "  ?restriction1                ?inputRestProp               ?measurementDatumType . \n"
            + "  OPTIONAL { ?uri    rdfs:label     ?label . } "
            + "  FILTER ( ?subjectUri = <input1> ) "
            + "  FILTER ( ?inputRestProp = owl:someValuesFrom  ||  ?inputRestProp = owl:onClass ) . \n "
            + "} ORDER BY ?uri";
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
            + "  FILTER ( ?subjectUri = <input1> ) "
            + "} ORDER BY ?dataTransformationType ";
    return query;
  }

  // In this case the subjectUri
  public String SPARQL_OutputTypes() {

    String query =
        ""
            + "SELECT ?MDType ?label ?dataRange ?catLab"
            + "WHERE { "
            + "     ?DTType             rdfs:subClassOf              ?r . \n"
            + "     ?r                  owl:onProperty               obo:OBI_0000299 . \n "
            + "     ?r                  owl:onClass                  ?MDType . \n "
            + "     OPTIONAL { ?MDType    rdfs:label   ?label . } \n "
            + "     OPTIONAL {  \n "
            + "       ?MDType            rdfs:subClassOf              ?r1 . \n "
            + "       ?r1                owl:onProperty               obo:IAO_0000004 . \n "
            + "       ?r1                owl:dataRange                ?dataRange .   \n . "
            + "     } . \n "
            + "     OPTIONAL {  \n "
            + "       ?measurementDatumType     rdfs:subClassOf       ?r2 . \n "
            + "       ?r1                owl:onProperty               obo:OBI_0000999 . \n "
            + "       ?r1                owl:onClass                ?catLab .   \n . "
            + "     }  \n  " + "     FILTER ( ?DTType = <input1> )" + "}";
    return query;
  }

  public String SPARQL_Labels() {

    String query =
        "" + "SELECT ?uri ?label" + "WHERE { "
            + "     ?uri     rdf:type     ?labelType  . \n "
            + "     OPTIONAL { ?uri     rdfs:label   ?label . } \n "
            + "     FILTER ( ?labelType = <input1> )" + "}";
    return query;
  }

  String getParameter(String key) {

    return JSON.string(requestData, key);
  }

  JSONObject getObjectParameter(String key) {

    return JSON.get(requestData, key);
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
    map.put("dataTransformationLabel", prefix + "."
        + dataTransformationType.split("#")[1]);
    map.put("measurementDatumLabel", prefix + "." + measurementDatumType.split("#")[1]);
    return map;
  }

  private String getInputs() {
    String triple = new String("");
    for (int i = 0; i < this.inputs.length(); i++) {
      String input = JSON.stringArr(this.inputs, i);
      triple += "<" + dataTransformation + ">   obo:OBI_0000293 <" + input + "> .\n";
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
