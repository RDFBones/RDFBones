package rdfbones.lib;

import java.util.List;

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
  
}
