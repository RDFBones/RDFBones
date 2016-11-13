package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import rdfbones.rdfdataset.Triple;

public class SPARQLDataGetter {

  String queryTriples;
  String selectVars;
  String query;
  List<String> urisToSelect;
  List<String> literalsToSelect;
  WebappConnector webapp;

  public SPARQLDataGetter(WebappConnector webapp, List<Triple> queryTriples,
      List<String> uris, List<String> literals) {

    this.webapp = webapp;
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
    System.out.println(this.getReadableQuery() + "\n\n");
    return this.webapp.sparqlResult(query, this.urisToSelect, this.literalsToSelect);
  }

  public String getQuery() {

    String query = new String("SELECT ");
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
