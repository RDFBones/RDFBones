package rdfbones.lib;

import java.util.List;
import java.util.Map;

import rdfbones.rdfdataset.Triple;
import webappconnector.WebappConnector;


public class SubSPARQLDataGetter extends SPARQLDataGetter{

  public String inputKey = new String("");
  public String inputValue = new String("");

  public SubSPARQLDataGetter(WebappConnector webapp, List<Triple> queryTriples, 
    List<String> uris, List<String> literals, String inputKey){
     
    super(webapp, queryTriples, uris, literals);
    this.inputKey = inputKey;
  }
  
  public List<Map<String, String>> getData(String value){
    
    this.inputValue = value;
    return super.getData();
  }

  @Override
  String getQueryTriples(){
   
    String queryTriples = this.queryTriples;
    queryTriples += "\nFILTER ( ?" + this.inputKey + " = <" + this.inputValue + "> ) . ";  
    return queryTriples;
  }
}
