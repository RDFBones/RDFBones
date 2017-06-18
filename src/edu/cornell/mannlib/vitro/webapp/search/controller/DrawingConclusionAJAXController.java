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

import rdfbones.customHandlers.DrawingConclusion;
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

public class DrawingConclusionAJAXController extends VitroAjaxController {

  public static final String PARAMETER_UPLOADED_FILE = "datafile";

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory
      .getLog(DrawingConclusionAJAXController.class);

  NewURIMaker newUri;
  JSONObject requestData;

  String subjectUri;
  String objectUri;

  String drawingConclusionInstance;
  String drawingConclusionType;

  String inputValue;
  String inputInstance;
  String inputType;

  String conclusionType;
  String conclusionInstance;
  String conlusionValue;
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
    
    resp = requestData;

    Map<String, String> objectMap = new HashMap<String, String>();
    Map<String, String> literalMap = new HashMap<String, String>();

    if (getParameter("task").equals("initial")) {

      /*
       * Drawing Conclusion and Conclusion type and property
       */
      subjectUri = getParameter("subjectUri");
      
      StringSPARQLDataGetter typeDataGetter =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_types(), ArrayLib.getList(
              "drawingConclusionType", "conclusionType", "property"),
              ArrayLib.getList("label"));
      
      JSON.extend(resp, typeDataGetter.getSingleResult(ArrayLib.getList(subjectUri)));
      String prefix = JSON.string(resp, "label").split("\\.")[0];
      JSON.put(resp, "prefix", prefix);

      drawingConclusionType = JSON.string(resp, "drawingConclusionType");
      
      /*
       * Possible Inputs
       */
      
      StringSPARQLDataGetter inputsDataGetter =
          new StringSPARQLDataGetter(connector, SPARQL_inputs(),
              ArrayLib.getList("measurementDatum"),
              ArrayLib.getList("measurementDatumLabel", "cardinality", "catLabel",
                  "measurementValue"));

      JSONArray possibleInputs =
          inputsDataGetter.getJSON(ArrayLib.getList(subjectUri, drawingConclusionType));
      JSON.put(resp, "possibleInputs", possibleInputs);

      if (getParameter("existing").equals("true")) {
        DrawingConclusion.existingData(connector, resp);
      }
    }

    switch (getParameter("task")) {

      case "save":

      DrawingConclusion.add(connector, requestData);
      break;

    case "delete":

      DrawingConclusion.delete(connector, requestData);
      break;
      
    case "addInput":

      connector.addTriples("<" + getParameter("drawingConclusionInstance")
          + "> obo:OBI_0000293 <" + getParameter("inputInstance") + "> .");
      break;

      case "removeInput":

      connector.removeTriples("<" + getParameter("drawingConclusionInstance")
          + "> obo:OBI_0000293 <" + getParameter("inputInstance") + "> .");
      break;

    case "edit":

      String concInstanceEdit = getParameter("conclusion");
      String conclusionValue = getParameter("conclusionValue");
      String newConclusionValue = getParameter("newConclusionValue");
      String property = getParameter("property");

      String toRemove =
          "<" + concInstanceEdit + "> " + "<" + property + "> " + " '" + conclusionValue
              + "' .";

      String toAdd2 =
          "<" + concInstanceEdit + "> " + "<" + property + "> " + " '"
              + newConclusionValue + "' .";

      resp("toRemove", toRemove);
      resp("toAdd", toAdd2);
      connector.removeTriples(toRemove, editKey);
      connector.addTriples(toAdd2, editKey);
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

  private static String getDataTriples() {

    String triples =
        ""
            + " ?subjectUri                       obo:BFO_0000051     ?drawingConclusionInstance . \n"
            + " ?subjectUri                       rdfbones:drawingConclusion     ?drawingConclusionInstance . \n"
            + " ?drawingConclusionInstance        rdf:type            ?drawingConclusionType . \n "
            + " ?drawingConclusionInstance        rdfs:label          ?drawingConclusionLabel . \n "
            + " ?drawingConclusionInstance        obo:OBI_0000299     ?conclusionInstance . \n"
            + " ?conclusionInstance               rdf:type            ?conclusionType . \n "
            + " ?conclusionInstance               rdfs:label          ?conclusionLabel . \n "
            + " ?conclusionInstance               ?property ?conclusionValue . \n";
    return triples;
  }

  public String SPARQL_types() {

    // In this case the subjectUri
    String query =
        ""
            + "  SELECT ?drawingConclusionType ?conclusionType ?label ?property \n"
            + "     WHERE { \n"
            + "      ?subjectUri             obo:BFO_0000051              ?sde . "
            + "       ?sde                    rdf:type                     obo:OBI_0000471 . \n "
            + "       ?sde                    rdfs:label                   ?label . \n "
            + "       ?subjectUri             vitro:mostSpecificType       ?investigationType .  \n"
            + "       ?investigationType      rdfs:subClassOf              ?restrictionDC .  \n"
            + "       ?restrictionDC          owl:onProperty               obo:BFO_0000051 . \n"
            + "       ?restrictionDC          owl:someValuesFrom           ?drawingConclusionType .  \n"
            + "       ?drawingConclusionType  rdfs:subClassOf              obo:OBI_0000338 . \n"
            + "       ?drawingConclusionType  rdfs:subClassOf              ?restrictionOutput . \n"
            + "       ?restrictionOutput      owl:onProperty               obo:OBI_0000299 . \n"
            + "       ?restrictionOutput      ?restrictionProp1            ?conclusionType . \n"
            + "        ?conclusionType         rdfs:subClassOf              ?propRestriction . \n"
            + "       ?propRestriction        owl:onProperty               ?property . \n "
            + "       FILTER ( ?subjectUri = <input1> ) \n"
            + "       FILTER ( ?restrictionProp1 = owl:someValuesFrom || ?restrictionProp1 = owl:onClass )  "
            + "     } \n";
    return query;
  }
  
  public String SPARQL_inputs() {

    String query =
        ""
            + "SELECT ?measurementDatum ?measurementDatumLabel ?cardinality ?catLabel ?measurementValue (datatype(?measurementValue) as ?measurementValueType) "
            + "WHERE { "
            + "  ?subjectUri                 obo:BFO_0000051               ?sde . \n "
            + "  ?sde                 obo:BFO_0000051               ?assayOrDT . \n "
            + "  ?assayOrDT                  obo:OBI_0000299               ?measurementDatum . \n"
            + "  ?measurementDatum           rdfs:label                    ?measurementDatumLabel . "
            + "  ?measurementDatum           rdf:type                      ?measurementDatumType ."
            + "  ?drawingConclusionType      rdfs:subClassOf               ?restriction . "
            + "  ?restriction                owl:onProperty                obo:OBI_0000293 . "
            + "  ?restriction                ?property                   ?measurementDatumType . "
            + "  OPTIONAL { ?measurementDatum       obo:IAO_0000004               ?measurementValue . } "
            + "  OPTIONAL {  "
            + "     ?measurementDatum               obo:OBI_0000999          ?categoricalLabel . "
            + "     ?categoricalLabel               rdfs:label               ?catLabel . "
            + "  } \n " 
            + "  FILTER ( ?property = owl:someValuesFrom || ?property = owl:onClass ) \n "
            + "  FILTER ( ?subjectUri = <input1> ) "
            + "  FILTER ( ?drawingConclusionType = <input2> ) . \n " + "}";

    return query;
  }

  // In this case the subjectUri
  public String SPARQL_OutputTypes() {

    String query =
        ""
            + "SELECT ?drawingConclusionType ?conclusionType ?inputType"
            + "  ?measurementDatumType ?label "
            + "WHERE { "
            + "     ?subjectUri          vitro"
            + "     ?DTType              rdfs:subClassOf              ?restriction1 . \n"
            + "     ?restriction1        owl:onProperty               obo:OBI_0000299 . \n "
            + "     ?restriction1        owl:qualifiedCardinality     ?cardinality . \n "
            + "     ?restriction1        owl:onClass                  ?measurementDatumType . \n "
            + "     OPTIONAL { ?measurementDatumType      rdfs:label         ?label . }  \n"
            + "     FILTER ( ?subjectUri = <input1> )" + "}";
    return query;
  }

  String getParameter(String key) {
    return JSON.string(requestData, key);
  }

  void resp(String key, String value) {

    JSON.put(resp, key, value);
  }

  private String getInputs(String drawingConclusion) {
    String triple = new String("");
    for (int i = 0; i < this.inputs.length(); i++) {
      String input = JSON.stringArr(this.inputs, i);
      triple += "<" + drawingConclusion + ">   obo:OBI_0000293 <" + input + "> .\n";
    }
    return triple;
  }

  private String getTripleString(Map<String, String> objectMap,
    Map<String, String> literalMap) {

    String triplesString = getDataTriples();
    triplesString = QueryUtils.subUrisForQueryLiterals(triplesString, literalMap);
    triplesString = QueryUtils.subUrisForQueryVars(triplesString, objectMap);
    triplesString += getInputs(objectMap.get("drawingConclusionInstance"));
    return triplesString;
  }

}
