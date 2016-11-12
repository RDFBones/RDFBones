package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.rdfdataset.Triple;


public class SPARQLDataGetter {

  String queryTriples;
  String selectVars;
  String query;
  List<String> urisToSelect;
  List<String> literalsToSelect;
  VitroRequest vreq;
  
  public SPARQLDataGetter(VitroRequest vreq, List<Triple> queryTriples, 
    List<String> uris, List<String> literals){
    
    this.vreq = vreq;
    if(literals == null){
      literals = new ArrayList<String>();
    }
    this.selectVars = SPARQLUtils.assembleSelectVars(uris, literals);
    this.queryTriples =  SPARQLUtils.assembleQueryTriples(queryTriples);
    this.urisToSelect = uris;
    this.literalsToSelect = literals;
  }
  
  public List<Map<String, String>> getData(){
   
    String query = this.getQuery();
    System.out.println(this.getReadableQuery() + "\n\n\n");
    return QueryUtils.getResult(query, this.urisToSelect, this.literalsToSelect, this.vreq);
  }

  public String getQuery(){
  
    String query = new String("SELECT ");
    query += this.selectVars;
    query += "\nWHERE { \n ";
    query += this.getQueryTriples();
    query += " } ";
    return query;
  }
  
  public String getReadableQuery(){
    String query = new String("SELECT ");
    query += this.selectVars;
    query += "\nWHERE { \n ";
    query += this.getQueryTriples().replace(".", ".\n");
    query += " } ";
    return query;
  }
  
  String getQueryTriples(){
    return this.queryTriples;
  }
  
  
}
