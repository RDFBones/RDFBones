package rdfbones.customHandlers;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Entity;
import rdfbones.graphData.MeasurementDatum;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.JSON;
import rdfbones.lib.StringSPARQLDataGetter;

public class DrawingConclusion {

  public static void existingData(WebappConnector connector, JSONObject requestData) {

    String objectUri = JSON.string(requestData, "objectUri");
    StringSPARQLDataGetter existingDataGetter =
        new StringSPARQLDataGetter(connector, SPARQL_existingData(), ArrayLib.getList(
            "drawingConclusion", "conclusion"),
            ArrayLib.getList("conclusionValue", "conclusionLabel", "drawingConclusionLabel"));
    JSON.extend(
        requestData,
        existingDataGetter.getSingleResult(ArrayLib.getList(objectUri,
            JSON.string(requestData, "property"))));

    StringSPARQLDataGetter existingInputsDataGetter =
        new StringSPARQLDataGetter(connector, SPARQL_exsistingInput(),
            ArrayLib.getList("input"), null);
    JSON.put(requestData, "exsistingInputs", existingInputsDataGetter.getJSON(objectUri));
  }

  public static String SPARQL_existingData() {

    String query =
        "SELECT ?drawingConclusion ?drawingConclusionLabel ?conclusion ?conclusionLabel ?conclusionValue \n"
            + "  WHERE {    \n"
            + "  ?drawingConclusion            rdfs:label   ?drawingConclusionLabel . \n"
            + "  ?drawingConclusion            obo:OBI_0000299   ?conclusion . \n"
            + "  ?conclusion            rdfs:label   ?conclusionLabel . \n"
            + "  ?conclusion           ?property   ?conclusionValue .  \n"
            + "  FILTER ( ?drawingConclusion = <input1> ) .   \n   "
            + "  FILTER ( ?property = <input2> ) .   \n   " + "}";
    return query;
  }

  public static String SPARQL_exsistingInput() {

    String query =
        "" + "SELECT ?input " + "WHERE { "
            + "  ?dataTransformation     obo:OBI_0000293          ?input . \n"
            + "  FILTER ( ?dataTransformation = <input1> ) " + "}";
    return query;
  }

  public static void add(WebappConnector connector, JSONObject requestData) {

    setNewInstances(connector, requestData);
    connector.addTriples(getTriples(requestData));
  }

  public static void delete(WebappConnector connector, JSONObject requestData) {

    connector.removeTriples(getTriples(requestData));
  }

  public static String getTriples(JSONObject requestData) {

    String triples = new String("");
    String property = "<" + JSON.string(requestData, "property") + ">";
    triples +=
        N3Utils.getDataTriple("subjectUri", "obo:BFO_0000051", "drawingConclusion",
            requestData);
    triples +=
        N3Utils.getDataTriple("subjectUri", "rdfbones:drawingConclusion",
            "drawingConclusion", requestData);
    triples +=
        N3Utils.getPrefixLabelTriple("drawingConclusion", "rdfs:label",
            "drawingConclusionLabel", requestData);
    triples +=
        N3Utils.getDataTriple("drawingConclusion", "rdf:type", "drawingConclusionType",
            requestData);
    triples +=
        N3Utils.getDataTriple("drawingConclusion", "obo:OBI_0000299", "conclusion",
            requestData);
    triples +=
        N3Utils.getPrefixLabelTriple("conclusion", "rdfs:label", "conclusionLabel",
            requestData);
    triples +=
        N3Utils.getLabelTriple("conclusion", property, "conclusionValue", requestData);

    JSONArray arr = JSON.array(requestData, "inputInstances");
    for (int i = 0; i < arr.length(); i++) {
      JSON.put(requestData, "input", JSON.stringArr(arr, i));
      triples +=
          N3Utils.getDataTriple("drawingConclusion", "obo:OBI_0000293", "input",
              requestData);
    }
    return triples;
  }

  public static void setNewInstances(WebappConnector connector, JSONObject requestData) {

    JSON.put(requestData, "drawingConclusion", connector.getUnusedURI());
    JSON.put(requestData, "conclusion", connector.getUnusedURI());

  }

  public static JSONObject inputData(WebappConnector connector, JSONObject requestData) {

    JSONObject resp = JSON.obj();
    // Possible inputs
    StringSPARQLDataGetter inputsDataGetter2 =
        new StringSPARQLDataGetter(connector, SPARQL_inputs(),
            ArrayLib.getList("measurementDatum"), ArrayLib.getList(
                "measurementDatumLabel", "cardinality", "catLabel", "measurementValue"));

    String subjectUri = JSON.string(requestData, "subjectUri");
    String dataTransformationType = JSON.string(requestData, "dataTransformationType");

    JSON.put(resp, "possibleInputs",
        inputsDataGetter2.getJSON(ArrayLib.getList(subjectUri, dataTransformationType)));

    // Existing inputs
    StringSPARQLDataGetter existingInputsDataGetter =
        new StringSPARQLDataGetter(connector, SPARQL_exsistingInput(),
            ArrayLib.getList("input"), null);
    String dataTransformation = JSON.string(requestData, "dataTransformation");
    JSON.put(resp, "exsistingInputs",
        existingInputsDataGetter.getJSON(dataTransformation));
    return resp;
  }

  public static String SPARQL_inputs() {

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
            + "  ?restriction                ?property                     ?measurementDatumType . \n"
            + "  OPTIONAL { ?measurementDatum       obo:IAO_0000004               ?measurementValue . } "
            + "  OPTIONAL {  \n "
            + "     ?measurementDatum               obo:OBI_0000999          ?categoricalLabel . \n"
            + "     ?categoricalLabel               rdfs:label               ?catLabel . \n"
            + "  } \n "
            + "  FILTER ( ?property = owl:someValuesFrom || ?property = owl:onClass ) \n "
            + "  FILTER ( ?subjectUri = <input1> ) \n "
            + "  FILTER ( ?dataTransformationType = <input2> ) \n " + "}";
    return query;
  }

}
