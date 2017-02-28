package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import rdfbones.graphData.Graph;
import rdfbones.graphData.QueryStructure;
import rdfbones.rdfdataset.OptionalTriple;
import rdfbones.rdfdataset.Triple;

public class UriLabelSPARQLDataGetter extends SPARQLDataGetter {

  String varToGet;

  public UriLabelSPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples, String varToGet,
    List<String> inputs){
    
    super(mainGraph, queryTriples, ArrayLib.getList("uri"), ArrayLib.getList("label"), inputs);
    this.varToGet = varToGet;    
  }
  
  @Override
public
  String getQueryTriples(){
    return  super.getQueryTriples().replace(this.varToGet, "uri");
    //return query + "\n OPTIONAL { ?uri   rdfs:label   ?label  } ";
  }
}
