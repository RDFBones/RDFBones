package rdfbones.lib;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import rdfbones.rdfdataset.Triple;


public class SubSPARQLDataGetter extends SPARQLDataGetter{

  public String inputKey = new String("");
  public String inputValue = new String("");

  public SubSPARQLDataGetter(VitroRequest vreq, List<Triple> queryTriples, 
    List<String> uris, List<String> literals, String inputKey){
     
    super(vreq, queryTriples, uris, literals);
    this.inputKey = inputKey;
  }
  
  public List<Map<String, String>> getData(String value){
    
    this.inputValue = value;
    return super.getData();
  }

  @Override
  String getQueryTriples(){
   
    String queryTriples = this.queryTriples;
    queryTriples += "\nFILTER { ?" + this.inputKey + " = <" + this.inputValue + "> } . ";  
    return queryTriples;
  }
}
