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
    JSONObject data = JSON.obj();

    Map<String, String> objectMap = new HashMap<String, String>();
    Map<String, String> literalMap = new HashMap<String, String>();
    
    if(getParameter("task").equals("initial")){

      subjectUri = getParameter("subjectUri");
      StringSPARQLDataGetter typeDataGetter =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_types(),
              ArrayLib.getList("drawingConclusionType", "conclusionType", "inputType", "property"), ArrayLib.getList("label"), 1);
      
      JSONObject types = (JSONObject) typeDataGetter.getSingleResult((ArrayLib.getList(subjectUri)));

      String prefix = JSON.string(types, "label").split("\\.")[0];
      JSON.put(data, "prefix", prefix);
      
      JSON.copyValue(data, types, "drawingConclusionType");
      JSON.copyValue(data, types, "conclusionType");
      JSON.copyValue(data, types, "inputType");
      JSON.copyValue(data, types, "property");

      StringSPARQLDataGetter inputDataGetter =
          new StringSPARQLDataGetter(connectorGraph, SPARQL_existingInput(),
              ArrayLib.getList("inputInstance"), ArrayLib.getList("inputValue"), 1);
      inputType = JSON.string(types, "inputType");
      JSONObject inputData = inputDataGetter.getSingleResult(ArrayLib.getList(subjectUri, inputType));
      JSONArray inputInstances = inputDataGetter.getJSON(ArrayLib.getList(subjectUri, inputType));
      JSON.put(data,"inputData", inputInstances);
      
      JSON.put(resp, "data", data);
    
      if(getParameter("existing").equals("true")){
        objectUri = getParameter("objectUri");
        StringSPARQLDataGetter existingDataGetter =
            new StringSPARQLDataGetter(connectorGraph, SPARQ_existingData(),
                ArrayLib.getList("inputInstance", "conclusionInstance"), ArrayLib.getList("inputValue", "conclusionValue"), 1);
         JSONObject existingData = existingDataGetter.getSingleResult(ArrayLib.getList(objectUri, JSON.string(types, "property")));
         
         JSON.copyValue(data, existingData, "inputInstance");
         JSON.copyValue(data, existingData, "conclusionInstance");
         JSON.copyValue(data, existingData, "inputValue");
         JSON.copyValue(data, existingData, "conclusionValue");
      }
    }
    
    
    switch(getParameter("task")){

    case "editInputInstance" : 
      
      String concInstance = getParameter("drawingConclusionInstance");
      String inputPred = new String("obo:OBI_0000293");
      String oldInput = getParameter("inputInstance");
      String newInput = getParameter("newInputInstance");
   
      String toRemoveInpInst = "<" + concInstance + "> " + inputPred + " <" + oldInput + "> . ";
      String toAdd = "<" + concInstance + "> " + inputPred + " <" + newInput + "> . ";
      
      resp("toRemove", toRemoveInpInst);
      resp("toAdd", toAdd);
      resp("deleteSuccess", Boolean.toString(connector.removeTriples(toRemoveInpInst, editKey)));
      resp("addSuccess", Boolean.toString(connector.addTriples(toAdd, editKey)));
      break;
      
    case "save" :
   
      objectMap.put("subjectUri",getParameter("subjectUri"));
      objectMap.put("drawingConclusionInstance", this.getUnusedURI());
      objectMap.put("drawingConclusionType", getParameter("drawingConclusionType"));
      objectMap.put("inputInstance", getParameter("inputInstance"));
      objectMap.put("conclusionType", getParameter("conclusionType"));
      objectMap.put("property", getParameter("property"));
      objectMap.put("conclusionInstance", this.getUnusedURI());

      literalMap.put("conclusionValue", getParameter("conclusionValue"));
      literalMap.put("drawingConclusionLabel", getParameter("prefix") + "." + getParameter("drawingConclusionLabel"));
      literalMap.put("conclusionLabel", getParameter("prefix") + "." + getParameter("conclusionLabel"));

      String toAdd1 = this.getTripleString(objectMap, literalMap);
      resp("triplesToAdd", toAdd1);
      if(connector.addTriples(toAdd1, editKey)){
        resp("success", "true");
      } else {
        resp("success", "false");
      }
      break;
     
    case "delete":
      
      objectMap.put("subjectUri",getParameter("subjectUri"));
      objectMap.put("drawingConclusionInstance", getParameter("drawingConclusionInstance"));
      objectMap.put("drawingConclusionType", getParameter("drawingConclusionType"));
      objectMap.put("inputInstance", getParameter("inputInstance"));
      objectMap.put("conclusionType", getParameter("conclusionType"));
      objectMap.put("conclusionInstance", getParameter("conclusionInstance"));
      objectMap.put("property", getParameter("property"));

      literalMap.put("conclusionValue", getParameter("conclusionValue"));
      literalMap.put("drawingConclusionLabel", getParameter("prefix") + "." + getParameter("drawingConclusionLabel"));
      literalMap.put("conclusionLabel", getParameter("prefix") + "." + getParameter("conclusionLabel"));
      
      String toRemove2 = this.getTripleString(objectMap, literalMap);
      resp("triplesToAdd", toRemove2);
      if(connector.removeTriples(toRemove2, editKey)){
        resp("success", "true");
      } else {
        resp("success", "false");
      }
      break;
      
    case "edit":
      
      String concInstanceEdit = getParameter("conclusionInstance");
      String conclusionValue = getParameter("conclusionValue");
      String newConclusionValue = getParameter("newConclusionValue");
      String property = getParameter("property");

      String toRemove = "<" + concInstanceEdit + "> " + "<" + property + "> " 
                + " '" + conclusionValue + "' .";
      
      String toAdd2 = "<" + concInstanceEdit + "> " + "<" + property + "> " 
          + " '" + newConclusionValue + "' .";
      
      resp("toRemove", toRemove);
      resp("toAdd", toAdd2);
      connector.removeTriples(toRemove, editKey);
      connector.addTriples(toAdd2, editKey);
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

    String triples =  ""
            + " ?subjectUri                       obo:BFO_0000051     ?drawingConclusionInstance . \n"
            + " ?subjectUri                       rdfbones:drawingConclusion     ?drawingConclusionInstance . \n"
            + " ?drawingConclusionInstance        rdf:type            ?drawingConclusionType . \n "
            + " ?drawingConclusionInstance        rdfs:label          ?drawingConclusionLabel . \n "
            + " ?drawingConclusionInstance        obo:OBI_0000293     ?inputInstance . \n"
            + " ?drawingConclusionInstance        obo:OBI_0000299     ?conclusionInstance . \n"
            + " ?conclusionInstance               rdf:type            ?conclusionType . \n "
            + " ?conclusionInstance               rdfs:label          ?conclusionLabel . \n "
            + " ?conclusionInstance               ?property ?conclusionValue . \n";
    return triples;
  }

  public String SPARQL_types() {

    // In this case the subjectUri
    String query = ""
       +  "  SELECT ?drawingConclusionType ?conclusionType ?inputType ?label ?property \n"
       +  "     WHERE { \n"
       +   "      ?subjectUri       obo:BFO_0000051              ?sde . "
       +  "       ?sde              rdf:type                     obo:OBI_0000471 . "
       +  "       ?sde              rdfs:label                    ?label ."
       +  "       ?subjectUri       vitro:mostSpecificType       ?investigationType .  \n"
       +  "       ?investigationType      rdfs:subClassOf   ?restrictionDC .  \n"
       +  "       ?restrictionDC        owl:onProperty      obo:BFO_0000051 . \n"
       +  "       ?restrictionDC        owl:someValuesFrom  ?drawingConclusionType .  \n"
       +  "       ?drawingConclusionType    rdfs:subClassOf   obo:OBI_0000338 . \n"
       +  "       ?drawingConclusionType      rdfs:subClassOf                 ?restrictionInput . \n"
       +  "       ?restrictionInput           owl:onProperty                  obo:OBI_0000293 . \n"
       +  "       ?restrictionInput           owl:onClass                             ?inputType . \n"
       +  "       ?drawingConclusionType      rdfs:subClassOf                 ?restrictionOutput . \n"
       +  "       ?restrictionOutput                  owl:onProperty                  obo:OBI_0000299 . \n"
       +  "       ?restrictionOutput                owl:someValuesFrom                    ?conclusionType . \n"
       +  "       ?conclusionType                rdfs:subClassOf                    ?propRestriction . \n"
       +  "       ?propRestriction               owl:onProperty                     ?property . \n "
       +  "       FILTER ( ?subjectUri = <input1> ) \n"
       +  "     } \n" ;
    return query;
  }

  public String SPARQL_existingInput() {

    String query = "" +
            "  SELECT ?inputInstance ?inputValue \n" + 
            "  WHERE {\n" + 
            "   ?subjectUri     obo:BFO_0000051   ?studyDesignExecution .\n" + 
            "   ?studyDesignExecution obo:BFO_0000051   ?dataTransformation .\n" + 
            "   ?dataTransformation   obo:OBI_0000299   ?inputInstance .\n" + 
            "   ?inputInstance      obo:IAO_0000004   ?inputValue .\n" + 
            "   ?inputInstance      rdf:type        ?inputType .\n" + 
            "   FILTER ( ?subjectUri = <input1> ) .\n" + 
            "   FILTER ( ?inputType = <input2> ) .\n" + 
            "}";
    
    return query;
  }

  public String SPARQ_existingData(){
    
    String query = "SELECT ?inputInstance ?inputValue ?conclusionInstance ?conclusionValue\n" + 
        "  WHERE {    \n"  + 
        "  ?objectUri            obo:OBI_0000293   ?inputInstance . \n" + 
        "  ?inputInstance        obo:IAO_0000004   ?inputValue .  \n" + 
        "  ?objectUri            obo:OBI_0000299   ?conclusionInstance . \n" + 
        "  ?conclusionInstance   ?property   ?conclusionValue .  \n" + 
        "  FILTER ( ?objectUri = <input1> ) .   \n   " + 
        "  FILTER ( ?property = <input2> ) .   \n   " + 
        "}";
    return query;
  }
  
  public String SPARQL_inputs() {

    String query =
        ""
            + "SELECT ?measurementDatum ?measurementDatumLabel ?cardinality ?catLabel ?measurementValue (datatype(?measurementValue) as ?measurementValueType) "
            + "WHERE { "
            + "  ?subjectUri                 obo:BFO_0000051               ?assayOrDT . "
            + "  ?assayOrDT                  obo:OBI_0000299               ?measurementDatum . "
            + "  ?measurementDatum           rdfs:label                    ?measurementDatumLabel . "
            + "  ?measurementDatum           rdf:type                      ?measurementDatumType ."
            + "  ?dataTransformationType     rdfs:subClassOf               ?restriction . "
            + "  ?restriction                owl:onProperty                obo:OBI_0000293 . "
            + "  ?restriction                owl:onClass                   ?measurementDatumType . "
            + "  OPTIONAL { ?measurementDatum       obo:IAO_0000004               ?measurementValue . } "
            + "  OPTIONAL {  "
            + "     ?measurementDatum               obo:OBI_0000999          ?categoricalLabel . "
            + "     ?categoricalLabel               rdfs:label               ?catLabel . "
            + "  }" + "  FILTER ( ?subjectUri = <input1> ) "
            + "  FILTER ( ?dataTransformationType = <input2> ) " + "}";
    return query;
  }

  public String SPARQL_exsistingInput() {

    String query =
        "" + "SELECT ?input " + "WHERE { "
            + "  ?dataTransformation     obo:OBI_0000293          ?input . "
            + "  FILTER ( ?dataTransformation = <input1> ) " + "}";
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
            + "     FILTER ( ?subjectUri = <input1> )" 
            + "}";
    return query;
  }
 
  String getParameter(String key) {

    return JSON.string(requestData, key);
  }

  void resp(String key, String value) {

    JSON.put(resp, key, value);
  }

  private String getTripleString(Map<String, String> objectMap, Map<String, String>  literalMap) {

    String triplesString = getDataTriples();
    triplesString = QueryUtils.subUrisForQueryLiterals(triplesString, literalMap);
    triplesString = QueryUtils.subUrisForQueryVars(triplesString, objectMap);
    return triplesString;
  }

}
