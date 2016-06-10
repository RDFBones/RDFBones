package edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.SPARQLQuery;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.TripleCreator;

public class QueryDependentNewInstance extends ConstantNewInstance {

  public QueryDependentNewInstance(String subject, String predicate,
      String object, SPARQLQuery query) {
      super(subject, predicate, object, "null");
      this.queryToGetVar = query;
  }

  public QueryDependentNewInstance(String subject, String predicate,
      String object, SPARQLQuery query, boolean fromSubject) {
      super(subject, predicate, object, "null", fromSubject);
      this.queryToGetVar = query;
  }

  
  public SPARQLQuery queryToGetVar;
  
  public String getClassUri(TripleCreator creator, JSONObject obj){
    
     /*
      * Here we have to assemble the query with parameters
      */
    return "http://softwareOntology.com/#type";
  }  
  
}