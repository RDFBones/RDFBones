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
    System.out.println("Path inputs : " + path.inputs);
    renameVarToGet(path.triples, varToGet);
    path.triples.add(new OptionalTriple("uri", "rdfs:label", "label"));
    this.dataGetter = new SPARQLDataGetter(graph, path.triples, ArrayLib.getList("uri"), 
         ArrayLib.getList("label"), inputs);
  }
  
  static void renameVarToGet(List<Triple> triples, String varToGet){
    
    for(Triple triple : triples){
      if(triple.subject.varName.equals(varToGet)){
        triple.subject.varName = "uri";
      }
      if(triple.object.varName.equals(varToGet)){
        triple.object.varName = "uri";
      }
    }
  }
  
  public JSONArray getData(JSONObject inputs){
    
    List<String> inputData = new ArrayList<String>();
    for(String input : this.inputs){
      inputData.add(JSON.string(inputs, input));
    }
    return QueryUtils.getJSON(this.dataGetter.getData(inputData));
  }
  
}
