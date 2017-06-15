package rdfbones.customHandlers;

import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Entity;
import rdfbones.graphData.MeasurementDatum;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.JSON;
import rdfbones.lib.StringSPARQLDataGetter;

public class DataTransformation {

  public static void delete(WebappConnector connector, JSONObject requestData){
    
    //Deleting main triples
    connector.removeTriples(
        N3Utils.getDataTriple("subjectUri", "obo:BFO_0000051", "dataTransformation",
            requestData));
    //Deleting data transformation
    String dtTriple = Entity.getTriples(requestData, "dataTransformation");
    connector.removeTriples(dtTriple);
 
    //Deleting measurement datum
    JSONObject md = JSON.object(requestData, "measurementDatum");
    MeasurementDatum md1 = new MeasurementDatum(connector, md);
    String dtToDelete = JSON.string(requestData, "dataTransformation");
    md1.delete(dtToDelete, "obo:OBI_0000299");
  }
  
  public static JSONObject inputData(WebappConnector connector, JSONObject requestData){

    JSONObject resp = JSON.obj();
    // Possible inputs
    StringSPARQLDataGetter inputsDataGetter2 =
        new StringSPARQLDataGetter(connector, SPARQL_inputs(),
            ArrayLib.getList("measurementDatum"),
            ArrayLib.getList("measurementDatumLabel", "cardinality", "catLabel",
                "measurementValue"));
    
    String subjectUri = JSON.string(requestData, "subjectUri");
    String dataTransformationType = JSON.string(requestData, "dataTransformationType");

    JSON.put(resp, "possibleInputs", inputsDataGetter2.getJSON(ArrayLib.getList(
        subjectUri, dataTransformationType)));

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
            + "  ?restriction                owl:onClass                   ?measurementDatumType . \n"
            + "  OPTIONAL { ?measurementDatum       obo:IAO_0000004               ?measurementValue . } "
            + "  OPTIONAL {  \n "
            + "     ?measurementDatum               obo:OBI_0000999          ?categoricalLabel . \n"
            + "     ?categoricalLabel               rdfs:label               ?catLabel . \n"
            + "  } \n " + "  FILTER ( ?subjectUri = <input1> ) \n "
            + "  FILTER ( ?dataTransformationType = <input2> ) \n " + "}";
    return query;
  }
  
  public static String SPARQL_exsistingInput() {

    String query =
        "" + "SELECT ?input " + "WHERE { "
            + "  ?dataTransformation     obo:OBI_0000293          ?input . \n"
            + "  FILTER ( ?dataTransformation = <input1> ) " + "}";
    return query;
  }
  
}
