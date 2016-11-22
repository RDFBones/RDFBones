package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.Triple;

public class SPARQLDataGetter {

  String queryTriples;
  String selectVars;
  String query;
  List<String> urisToSelect;
  List<String> literalsToSelect;
  String subject;
  String object;
  public List<String> inputValues = new ArrayList<String>();
  public List<String> inputKeys;
  public Graph mainGraph;

  public SPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples,
      List<String> uris, List<String> literals) {

    this.mainGraph = mainGraph;
    init(queryTriples, uris, literals);
  }
 
  public SPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples,
      List<String> uris, List<String> literals, String inputKey) {
  
    this.mainGraph = mainGraph;
    this.inputKeys = ArrayLib.getList(inputKey);
    this.inputValues = ArrayLib.getList(inputKey);

    init(queryTriples, uris, literals);
  }
  
  public SPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples,
    List<String> uris, List<String> literals, List<String> inputKeys) {

    this.mainGraph = mainGraph;
    this.inputKeys = inputKeys;
    this.inputValues = inputKeys;
    init(queryTriples, uris, literals);
  }

  void init(List<Triple> queryTriples, List<String> uris, List<String> literals){

    if (literals == null) {
      literals = new ArrayList<String>();
    }
    GraphLib.incrementRestrictionTriples(queryTriples);
    this.selectVars = SPARQLUtils.assembleSelectVars(uris, literals);
    this.queryTriples = SPARQLUtils.assembleQueryTriples(queryTriples);
    this.urisToSelect = uris;
    this.literalsToSelect = literals;
  }
  
  public List<Map<String, String>> getData() {

    String query = this.getQuery();
    this.mainGraph.getWebapp().log(query + "\n\n");
    return mainGraph.getWebapp().sparqlResult(query, this.urisToSelect, this.literalsToSelect);
  }
  
  public List<Map<String, String>> getData(String value){
    
    this.inputValues.add(0, value);
    return this.getData();
  }
  
  public List<Map<String, String>> getData(List<String> inputValues){
    
    this.inputValues = inputValues;
    return this.getData();
  }
  
  String getQueryTriples(){
  
    String queryTriples = this.queryTriples;
    int i = 0;
    for(String inputKey : this.inputKeys){
      queryTriples += "\tFILTER ( ?" + inputKey + " = <" + this.inputValues.get(i) + "> ) . ";  
      i++;
    }
    return queryTriples;
  }
  
  public String getQuery() {
    String query = new String("");
    //query += N3Utils.getQueryPrefixes();
    query += "\nSELECT ";
    query += this.selectVars;
    query += "\nWHERE { \n ";
    query += this.getQueryTriples();
    query += "\n } ";
    return query;
  }
}
