package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.graphData.GraphPath;
import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.OptionalTriple;
import rdfbones.rdfdataset.Triple;

public class VariableDependency {

  public List<String> inputs;
  public SPARQLDataGetter dataGetter;
  
  public VariableDependency(Graph graph, GraphPath path, String varToGet){
    
    this.inputs = path.inputs;
    path.triples.add(new OptionalTriple("uri", "rdfs:label", "label"));
    this.dataGetter = new UriLabelSPARQLDataGetter(graph, path.triples, varToGet, this.inputs);
  }
  
  public JSONArray getData(JSONObject inputs){
    
    List<String> inputData = new ArrayList<String>();
    for(String input : this.inputs){
      inputData.add(JSON.string(inputs, input));
    }
    return QueryUtils.getJSON(this.dataGetter.getData(inputData));
  }
  
}
