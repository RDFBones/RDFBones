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
  String sexScore;
  String dataTransformation;
  String degreeOfSexualisation;
  String degree;
  String editKey;
  
  String dataTransformationType =
      "http://w3id.org/rdfbones/extensions/FrSexEst#DataTransformation.FrSexEst";
  String degreeOfSexualisationType =
      "http://w3id.org/rdfbones/extensions/FrSexEst#DegreeOfSexualization";
  
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
    // Data
    JSONObject resp = new JSONObject();
    switch (vreq.getParameter("task")) {

    case "createNew":

      sexScore = vreq.getParameter("sexScore");
      dataTransformation = this.getUnusedURI();
      degreeOfSexualisation = this.getUnusedURI();
      degree = vreq.getParameter("degree");
      if(connector.addTriples(getTripleString(), editKey)){
        log.info("succesfully");
      } else {
        log.info("unSuccesfully");
      }
      JSONObject dataObject = JSON.obj();
      JSON.put(dataObject, "dataTransformation", dataTransformation);
      JSON.put(dataObject, "degreeOfSexualisation", degreeOfSexualisation);
      JSON.put(resp, "dataObject", dataObject);
      log.info("Ende");
      break;

    case "delete":

      sexScore = vreq.getParameter("sexScore");
      dataTransformation = vreq.getParameter("dataTransformation");
      degreeOfSexualisation = vreq.getParameter("degreeOfSexualisation");
      degree = vreq.getParameter("degree");
      connector.removeTriples(getTripleString(), editKey);
      break;
      
    case "edit":

      String oldDegree = vreq.getParameter("oldDegree");
      String newDegree = vreq.getParameter("newDegree");
      degreeOfSexualisation = vreq.getParameter("degreeOfSexualisation");
      String toRemove = "<" + degreeOfSexualisation + "> "  + 
          "obo:IAO_0000004" +  "\"" + oldDegree + "\" . " ;
      String toAdd = "<" + degreeOfSexualisation + "> "  + 
          "obo:IAO_0000004" +  "\"" + newDegree + "\" . " ;
      connector.removeTriples(toRemove, editKey);
      connector.addTriples(toAdd, editKey);
      break;

    case "formData":

      subjectUri = vreq.getParameter("subjectUri");
      SPARQLDataGetter sexScoreDataGetter = new SPARQLDataGetter(
          connectorGraph, sexScoreQueryTriples(),
          ArrayLib.getList("sexScore"),
          ArrayLib.getList("sexScoreLabel","categoricalLabelLabel"), ArrayLib.getList("subjectUri"));
      JSON.put(resp,"sexScores", sexScoreDataGetter.getJSON(ArrayLib.getList(subjectUri)));

      SPARQLDataGetter dataTransDataGetter = new SPARQLDataGetter(
          connectorGraph, dataTransformationTriples(),
          ArrayLib.getList("sexScore", "dataTransformation", "degreeOfSexualisation"),
          ArrayLib.getList("degree", "categoricalLabelLabel"), ArrayLib.getList("subjectUri"));

      JSON.put(resp,"dataTransformations", dataTransDataGetter.getJSON(ArrayLib.getList(subjectUri)));
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
    dataTriples.add(new Triple("dataTransformation", "obo:OBI_0000293", "sexScore"));
    dataTriples.add(new Triple("dataTransformation", "obo:OBI_0000299",
        "degreeOfSexualisation"));
    dataTriples.add(new LiteralTriple("degreeOfSexualisation", "obo:IAO_0000004",
        "degree"));
    // Type triples
    dataTriples.add(new Triple("dataTransformation", "rdf:type",
        "dataTransformationType"));
    dataTriples.add(new Triple("degreeOfSexualisation", "rdf:type",
        "degreeOfSexualisationType"));
    return dataTriples;
  }
  
  private static List<Triple> dataTransformationTriples() {

    List<Triple> triples = new ArrayList<Triple>();
    triples.add(new Triple("subjectUri", "obo:BFO_0000051", "dataTransformation"));
    triples.add(new Triple("dataTransformation", "obo:OBI_0000293", "sexScore"));
    triples.add(new Triple("sexScore", "obo:IAO_0000299", "categoricalLabel"));
    triples.add(new LiteralTriple("categoricalLabel", "rdfs:label", "categoricalLabelLabel"));
    triples.add(new Triple("dataTransformation", "obo:OBI_0000299",
        "degreeOfSexualisation"));
    triples.add(new LiteralTriple("degreeOfSexualisation", "obo:IAO_0000004",
        "degree"));
    return triples;
  }
  
  private static List<Triple> sexScoreQueryTriples() {

    List<Triple> triples = new ArrayList<Triple>();
    triples.add(new Triple("subjectUri", "obo:BFO_0000051",
        "specimenCollectionProcess"));
    triples.add(new Triple("specimenCollectionProcess", "obo:OBI_0000299",
        "specimen"));
    triples.add(new Triple("assay", "obo:OBI_0000293", "specimen"));
    triples.add(new Triple("assay", "obo:OBI_0000299", "sexScore"));
    triples.add(new LiteralTriple("sexScore", "rdfs:label", "sexScoreLabel"));
    triples.add(new Triple("sexScore", "obo:IAO_0000299", "categoricalLabel"));
    triples.add(new LiteralTriple("categoricalLabel", "rdfs:label", "categoricalLabelLabel"));
    return triples;
  }
  
  private Map<String, String> getDataMap(){
    
    Map<String, String> map = new HashMap<String, String>();
    map.put("subjectUri", subjectUri);
    map.put("sexScore", sexScore);
    map.put("dataTransformation", dataTransformation);
    map.put("degreeOfSexualisation", degreeOfSexualisation);
    map.put("dataTransformationType", dataTransformationType);
    map.put("degreeOfSexualisationType", degreeOfSexualisationType);
    return map;
  }
  
  private Map<String, String> getLiteralMap(){
  
    Map<String, String> map = new HashMap<String, String>();
    map.put("degree", degree);
    return map;
  }

  private String getTripleString(){
    
    String triplesString = SPARQLUtils.assembleTriples(getDataTriples());
    triplesString = QueryUtils.subUrisForQueryLiterals(triplesString, getLiteralMap());
    triplesString = QueryUtils.subUrisForQueryVars(triplesString, getDataMap());
    log.info(triplesString);
    return triplesString;
  }
  
}
