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
  public Graph mainGraph;

  public SPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples,
      List<String> uris, List<String> literals) {

    this.mainGraph = mainGraph;
    if (literals == null) {
      literals = new ArrayList<String>();
    }
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

  public List<Map<String, String>> getData(String value) {

    return this.getData();
  }

  
  public String getQuery() {
    String query = new String("");
    query += N3Utils.getQueryPrefixes();
    query += "\nSELECT ";
    query += this.selectVars;
    query += "\nWHERE { \n ";
    query += this.getQueryTriples();
    query += " } ";
    return query;
  }

  public String getReadableQuery() {
    String query = new String("SELECT ");
    query += this.selectVars;
    query += "\nWHERE { \n ";
    query += this.getQueryTriples().replace(".", ".\n");
    query += " } ";
    return query;
  }

  String getQueryTriples() {
    return this.queryTriples;
  }

}
