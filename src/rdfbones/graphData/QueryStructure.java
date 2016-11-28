package rdfbones.graphData;

import java.util.ArrayList;
import java.util.List;

import rdfbones.lib.ArrayLib;
import rdfbones.lib.GraphLib;
import rdfbones.rdfdataset.GreedyRestrictionTriple;
import rdfbones.rdfdataset.Triple;

public class QueryStructure {

  List<Triple> baseTriples;
  List<Triple> superTriples;

  boolean greedy;
  String inputNode = null;
  String greedyOut = null;
  QueryStructure subQuery;
  List<String> queries = new ArrayList<String>();
  String query;
  
  public QueryStructure(List<Triple> triples, String startNode) {

    this.inputNode = startNode;
    Triple triple = GraphLib.isGreedy(triples, startNode);
    if (triple != null) {
      this.greedy = true;
    } else {
      this.greedy = false;
    }
    this.setTriples(triples, startNode);
  }

  public QueryStructure(List<Triple> triple, String startNode, boolean greedy) {

    this.inputNode = startNode;
    this.greedy = true;
    this.setTriples(triple, startNode);
  }

  public String getQuery(){
    
    if(this.greedy){
      this.queries.addAll(this.getBase());
      this.queries.addAll(this.getSuper());
    } else {
      this.queries = this.getBase();
    }
    return this.getQueryTriples();
  }
  
  String getQueryTriples() {

    if (this.queries.size() == 0) {
      return null;
    } else if (this.queries.size() == 1){
      return this.queries.get(0);
    } else {
      String query = new String("");
      for (String subQuery : this.queries) {
        query += "\t{\n" + subQuery + "\n\t} UNION";
      }
      return query.substring(0, query.length() - 6);
    }
  }

  void setTriples(List<Triple> triples, String input){

    UnionForm unionForm = GraphLib.getUnionForm(triples, input);
    this.baseTriples = unionForm.triples;
    this.query = GraphLib.assembleTriples(this.baseTriples);
    if(unionForm.greedyNode != null){
      this.greedyOut = unionForm.greedyNode;
      this.subQuery = new QueryStructure(triples, this.greedyOut, true);
    }
  }

  List<String> getBase() {
    return getQueryList(this.query);
  }

  List<String> getSuper() {
    String superQuery = new String("\t?" + this.inputNode + 
        " rdfs:subClassOf ?" + this.inputNode + "Super. \n" + this.getSuperQuery());
    return getQueryList(superQuery);
  }

  List<String> getQueryList(String query) {

    List<String> queries = new ArrayList<String>();
    if (subQuery != null) {
      List<String> baseQueries = subQuery.getBase();
      for (String baseQuery : baseQueries) {
        queries.add(query + baseQuery);
      }
      List<String> superQueries = subQuery.getSuper();
      for (String superQuery : superQueries) {
        queries.add(query + superQuery);
      }
    } else {
      queries.add(query);
    }
    return queries;
  }

  String getSuperQuery() {
   return new String(this.query.replace(this.inputNode, this.inputNode + "Super"));
  }
}
