package rdfbones.lib;

import java.util.List;
import java.util.Map;

import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.Triple;

public class MainGraphSPARQLDataGetter extends SPARQLDataGetter{

  public String subject;
  public String object;

  public MainGraphSPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples, 
    List<String> uris, List<String> literals){

    super(mainGraph, queryTriples, uris, literals, ArrayLib.getList("subject", "object"));
  }
  
  public List<Map<String, String>> getData(String subject, String object){
    
    this.inputValues = ArrayLib.getList(subject, object);
    return super.getData();
  }
}
