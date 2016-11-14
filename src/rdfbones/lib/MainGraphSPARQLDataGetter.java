package rdfbones.lib;

import java.util.List;
import java.util.Map;

import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.Triple;
import webappconnector.WebappConnector;

public class MainGraphSPARQLDataGetter extends SPARQLDataGetter{

  public String subject;
  public String object;

  public MainGraphSPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples, 
    List<String> uris, List<String> literals){

    super(mainGraph, queryTriples, uris, literals);
  }
  
  public List<Map<String, String>> getData(String subject, String object){
    
    this.subject = subject;
    this.object = object;
    return super.getData();
  }

  @Override
  String getQueryTriples(){
   
    String queryTriples = this.queryTriples;
    queryTriples += "\nFILTER ( ?subject = <" + this.subject + "> ) . ";  
    queryTriples += "\nFILTER ( ?object = <" + this.object + "> ) . ";  
    return queryTriples;
  }
}
