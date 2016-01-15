package edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.Resource;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;


public class SparqlDisplayOntology {

  private static Log log = LogFactory.getLog( SparqlEvaluateVTwo.class );

  Model model;
  public String predicateUri = null;
  public String getCustomEntryFormUri() {
    return customEntryFormUri;
  }

  public void setCustomEntryFormUri(String customEntryFormUri) {
    this.customEntryFormUri = customEntryFormUri;
  }

  public String customEntryFormUri = null;
  public VitroRequest vreq = null;
  public List<Map<String, String>> formElements = new ArrayList<Map<String, String>>();
  public List<Map<String, String>> listViewTitles = new ArrayList<Map<String, String>>();
  
  public SparqlDisplayOntology(String predicateUri, VitroRequest vreq, Model model){
    this.vreq = vreq;
    this.predicateUri = predicateUri;
    if( model == null ) throw new Error("SparqlEvaluate must be passed a Model");
     this.model = model;
     queryCustomEntryFormUri();
     queryListViewFields();
     queryFormFields();
     //performQuery(cefQuery, this.formElements);
     //performQuery(listViewTitleQuery, this.listViewTitles);
  }
  
  private static String customEntryFormQuery  = "PREFIX myDisplay: <http://myDisplayOntology.org#> "
      + " SELECT ?customEntryForm "
      + " WHERE {"
      + "   ?predicateUri  myDisplay:customEntryFormObject   ?customEntryForm "
      + "} ";
  
  private void queryCustomEntryFormUri(){
    
    String queryString = QueryUtils.subUriForQueryVar(customEntryFormQuery,"predicateUri", this.predicateUri);
    log.info("customEntryFormQuery \n : " + queryString);
    ResultSet resultSet = QueryUtils.getQueryResults(queryString, this.vreq);
    String[] uris = {"customEntryForm" };
    List<Map<String, String>> results = getQueryVars(resultSet, uris, null);
    this.customEntryFormUri = results.get(0).get("customEntryForm");
    log.info("customEntryFormUri : " + this.customEntryFormUri );
  }
  
  private static String listViewQuery = "PREFIX myDisplay: <http://myDisplayOntology.org#> "
      + " SELECT ?name ?nr ?type"
      + " WHERE {"
      + "  ?customEntryForm myDisplay:tableField ?listViewTitle ."
      + "  ?listViewTitle  myDisplay:name  ?name ."
      + "  ?listViewTitle  myDisplay:number ?nr . "
      + "  ?listViewTitle  myDisplay:guiElement ?guiElement ."
      + "  ?guiElement     a    ?type ."
      + " }";
  
  private void queryListViewFields(){
    
    String queryString = QueryUtils.subUriForQueryVar(listViewQuery,"customEntryForm", this.customEntryFormUri);
    log.info("listViewFieldsQuery \n : " + queryString);
    ResultSet resultSet = QueryUtils.getQueryResults(queryString, this.vreq);
    String[] literals = {"name" , "nr" };
    String[] uris = {"type"};
    this.listViewTitles = getQueryVars(resultSet, uris, literals);
    log.info("listViewTitles \n : " + this.listViewTitles);
  }
        
  private static String formFieldQuery = "PREFIX vitro: <http://vitro.mannlib.cornell.edu/ns/vitro/0.7#> \n"
      + " SELECT  ?nr ?type ?name ?title \n"
      +" WHERE \n"
      +" { \n"
      +"      ?customEntryForm vitro:inputField ?inputField . \n"
      +"      ?inputField vitro:nr  ?nr . \n"
      +"      ?inputField vitro:type ?type . \n"
      +"      ?inputField vitro:name  ?name . \n"
      +"      ?inputField vitro:title  ?title . \n"
      +"} ORDER BY ASC(?nr) \n";
  
  
  private void queryFormFields(){
    
    String queryString = QueryUtils.subUriForQueryVar(formFieldQuery,"customEntryForm", this.customEntryFormUri);
    log.info("listViewFieldsQuery \n : " + queryString);
    ResultSet resultSet = QueryUtils.getQueryResults(queryString, this.vreq);
    String[] literals = {"nr" , "type", "name", "title" };
    this.formElements = getQueryVars(resultSet, null, literals);
    log.info("formElements \n : " + this.formElements);
  }
  
  private static List<Map<String, String>> getQueryVars(ResultSet results, String[] uris, String[] literals){
    
    List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();
    while(results.hasNext()){
      QuerySolution sol = results.next();
      //Map for the row of the result
      Map<String, String> resultMap  = new HashMap<String, String>();
      if(literals != null){
        for(String literal : literals){
          resultMap.put(literal, sol.getLiteral(literal).getString());
        }
      }
      if(uris != null){
        for(String uri : uris){
          resultMap.put(uri, sol.get(uri).asResource().getURI());
        }
      }
      resultList.add(resultMap);
    }
    return resultList;
  }
  
  public List<Map<String, String>> getListViewTitles() {
    return listViewTitles;
  }

  public void setListViewTitles(List<Map<String, String>> listViewTitles) {
    this.listViewTitles = listViewTitles;
  }
  
  public List<Map<String, String>> getFormElements() {
    return formElements;
  }

  public void setFormElements(List<Map<String, String>> formElements) {
    this.formElements = formElements;
  }
  
  /*
  public List<Map<String,String>> ListgetTableData(String customEntryForm, VitroRequest vreq){
    
    List<Map<String,String>> valuesToReturn = new ArrayList<Map<String, String>>();
   
    String queryString = QueryUtils.subUriForQueryVar(listViewTitleQuery, "customEntryForm", this.inputMap.get("customEntryFormUri") ) ;
    ResultSet resultSet = QueryUtils.getQueryResults(queryString, vreq);
    String[] literals = {"query" , "limit" };
    String[] uris = {"guiElement" , "guiTypes" };
    List<Map<String, String>> results = getQueryVars(resultSet, uris, literals);
    for( Map<String, String> result : results){
      //Perform the query defined in the triples
      
      Map<String, String> fieldQueryResults = performQueryLimit(result.get("query"), result.get("limit"));
      switch(result.get("guiType")){
      //The query of the 
      case "http://myDisplayOntology.org#LinkField" :
             //The param variable defines the mapping between the query and the inputs of the guielement
             Map<String, String> params = performGuiQuery(linkFieldQuery, result.get("guiElement"));
             //Create the map for the 
             Map<String, String> elementData = new HashMap<String, String>();
             for(String key : params.keySet()){
               elementData.put("key", fieldQueryResults.get(params.get(key)));
             }
             valuesToReturn.add(elementData);
             break;
      }
    }
    //Mylog
    log.info("Values to return : \n" + valuesToReturn.toString());
    return valuesToReturn;
 }
  
  */
  public void performQuery(String queryString, List<Map<String, String>> list){
    
    log.info("Querystring : " + queryString);
    QueryExecution qe = null;
    try{
        Query query = QueryFactory.create(queryString);
        qe = QueryExecutionFactory.create(query, this.model);
        if( query.isSelectType() ){
            ResultSet results = null;
            results = qe.execSelect();
            List<String> vars = results.getResultVars();
            while( results.hasNext()){
              Map<String, String> tmp = new HashMap<String, String>();
              log.info("vars : " + vars.toString());
              QuerySolution querySol = results.nextSolution();
              for(String var: vars) {
                  Literal lit = querySol.getLiteral(var);
                  tmp.put(var,  lit.getString());
              }
              list.add(tmp);
            }
        } else {
            throw new Error("only SELECT type SPARQL queries are supported");
        }
    }catch(Exception ex){
        throw new Error("could not parse SPARQL in queryToUri: \n" + queryString + '\n' + ex.getMessage());
    }finally{
        if( qe != null)
            qe.close();
    }
    //Mylog
    log.info("Queryresults : " + list.toString());
  }
}