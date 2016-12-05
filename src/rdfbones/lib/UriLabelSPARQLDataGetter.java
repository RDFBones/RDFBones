package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import rdfbones.graphData.QueryStructure;
import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.OptionalTriple;
import rdfbones.rdfdataset.Triple;

public class UriLabelSPARQLDataGetter extends SPARQLDataGetter {

  String varToGet;

  public UriLabelSPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples, String varToGet,
    List<String> inputs){
    
    super(mainGraph);
    this.varToGet = varToGet;
    this.preInit(queryTriples, ArrayLib.getList("uri"), ArrayLib.getList("label"), inputs);
  }
  
  @Override
  String getQueryTriples(){
    return  super.getQueryTriples().replace(this.varToGet, "uri");
    //return query + "\n OPTIONAL { ?uri   rdfs:label   ?label  } ";
  }
}
