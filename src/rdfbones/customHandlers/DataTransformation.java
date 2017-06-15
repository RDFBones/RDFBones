package rdfbones.customHandlers;

import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Entity;
import rdfbones.graphData.MeasurementDatum;
import rdfbones.lib.JSON;

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
}
