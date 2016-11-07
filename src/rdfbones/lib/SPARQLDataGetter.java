package rdfbones.lib;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;


public class SPARQLDataGetter {

  
  String queryTriples;
  String selectVars;
  String query;
  List<String> urisToSelect;
  List<String> literalsToSelect;
  VitroRequest vreq;
  
  public SPARQLDataGetter(VitroRequest vreq, String selectVars, 
    String queryTriples, List<String> uris, List<String> literals){
    
    this.vreq = vreq;
    this.selectVars = selectVars;
    this.queryTriples = queryTriples;
    this.urisToSelect = uris;
    this.literalsToSelect = literals;
  }
  
  public List<Map<String, String>> getData(){
   
    String query = this.getQuery();
    return QueryUtils.getResult(getQuery(), this.urisToSelect, this.literalsToSelect, this.vreq);
  }

  public String getQuery(){
  
    String query = new String("SELECT ");
    query += this.selectVars;
    query += "\nWHERE { \n ";
    query += this.getQueryTriples();
    query += " } ";
    return query;
  }
  
  String getQueryTriples(){
    return this.queryTriples;
  }
  
}
