package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.Resource;

import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.VitroVocabulary;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;

/**
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class ImageOfferController extends VitroAjaxController {

    private static final long serialVersionUID = 1L;
    private static final Log log = LogFactory.getLog(ImageOfferController.class);
    
    private static final String TERM = "term";
    private static final String TYPE = "type";
    
    private static final String SUB = "subjectUri";
    private static final String PRED = "predicateUri";
    private static final String OBJ = "objectUri";
    
    Map<String, String> inputMap ;
    List<String> mainObjectUris ;
    
    Map<String, String> queryMap ;
    Map<String, Map<String, String>> guiMap ;
    Map<String, String[]> queryVarMap ;
    //Data in Java to be retrieved
    List<Map<String, List<Map<String, String>>>> data ;
    JSONArray arrayToSend; 

    VitroRequest vreq = null;
    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {
        arrayToSend = new JSONArray();  
        String cmd = vreq.getParameter("cmd");
        if(cmd.equals("saveInstance")){
          
          JSONObject resp = new JSONObject();
          try {
            resp.accumulate("resp", "completed");
          } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
          }
          
          String subject = vreq.getParameter(SUB);
          String predicate = vreq.getParameter(PRED);
          String object = vreq.getParameter(OBJ);
          
          vreq.getUnfilteredWebappDaoFactory().getObjectPropertyStatementDao().
            insertNewObjectPropertyStatement(new ObjectPropertyStatementImpl(subject, predicate, object));
          
          arrayToSend.put(resp);
          response.getWriter().write(this.arrayToSend.toString());
            
        } else if(cmd.endsWith("getInstances")){
          inputMap = new HashMap<String, String>();
          mainObjectUris = new ArrayList<String>();
        
          queryMap = new HashMap<String, String>();
          guiMap = new HashMap<String, Map<String, String>>();
          queryVarMap = new HashMap<String, String[]>();
          //Data in Java to be retrieved
          data = new ArrayList<Map<String, List<Map<String, String>>>>();
          
        
          log.info("Request Arrived");
          this.vreq = vreq;
          //Initialize the input Map
          initInputMap();
          log.info("InputMap " + this.inputMap.toString());
          getMainObjects();
          log.info("MainObjectUris \n" + this.mainObjectUris);
          //queryMap and the guiMap is set
          listgetTableData();
          log.info("GuiMap \n " + this.guiMap);
          log.info("QueryMap \n " + this.queryMap);
          setOutputData();
          log.info("OutputData \n " + data.toString());
          prepareJSON(this.arrayToSend);
          response.getWriter().write(this.arrayToSend.toString());
        }
    }
      
    private static String mainObjectQuery = ""
        + " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
        + " SELECT ?mainObject "
        + " WHERE {  "
        + "   ?predicateUri   rdfs:range   ?rangeClass . "
        + "   ?mainObject     a            ?rangeClass . "
        + "   FILTER NOT EXISTS { ?subjectUri   ?predicateUri   ?mainObject } "
        + " } ORDER BY DESC(?mainObject)"
        + " LIMIT 10 ";
    
    public void initInputMap(){
      this.inputMap.put("subjectUri", vreq.getParameter("subjectUri"));
      this.inputMap.put("predicateUri", vreq.getParameter("predicateUri"));
      //this.inputMap.put("customEntryFormUri", vreq.getParameter("customEntryFormUri"));
    }
    
    private static String fieldsQuery = ""
        + " PREFIX myDisplay: <http://myDisplayOntology.org#> "
        + " SELECT ?name ?number ?query ?limit ?guiElement ?guiType  "
        + " WHERE {"
        + "   ?customEntryForm   myDisplay:tableField  ?field ."
        + "   ?field myDisplay:name ?name . "
        + "   ?field myDisplay:number ?number . "
        + "   ?field myDisplay:query  ?query ."
        + "   ?field myDisplay:limit ?limit ."
        + "   ?field myDisplay:guiElement      ?guiElement ."
        + "   ?guiElement   a     ?guiType . "
        + " }";
    
    public void listgetTableData(){
      
      String queryString = QueryUtils.subUriForQueryVar(fieldsQuery, "customEntryForm", this.inputMap.get("customEntryFormUri"));
      log.info("queryString : \n" + queryString);
      ResultSet resultSet = QueryUtils.getQueryResults(queryString, this.vreq);
      String[] vars = {"guiElement" , "guiType", "number", "name" , "query" , "limit" };
      List<Map<String, String>> results = getQueryVars(resultSet, vars);
      log.info("QueryVars :  \n" + results.toString());
      
      for( Map<String, String> result : results){
        
        String NAME = result.get("name");
        //Perform the query defined in the triples
        String rawQuery = result.get("query"); //.concat(" LIMIT " + result.get("limit").split("\\")[0]);
        this.queryMap.put(result.get("name"), rawQuery);
        
        String fieldQueryString = QueryUtils.subUrisForQueryVars(rawQuery, this.inputMap);
        queryMap.put(NAME, fieldQueryString);
        //Variables for the switch case
        String guiQuery = null;
        ResultSet queryResultSet = null;
        Map<String, String> guiInputs = null;
        
        log.info("GuiType \n" + result.get("guiType"));
        switch(result.get("guiType")){
        //The query of the 
        case "http://myDisplayOntology.org#LinkField" :
               //The param variable defines the mapping between the query and the inputs of the guielement
               String linkFieldQuery = "PREFIX myDisplay: <http://myDisplayOntology.org#> "
                   + " select ?value ?uri "
                   + " where {"
                   + "      ?guiElement   myDisplay:fieldValue   ?value . "
                   + "      ?guiElement   myDisplay:fieldUri    ?uri  . "
                   + " }";
               guiQuery = QueryUtils.subUriForQueryVar(linkFieldQuery, "guiElement", result.get("guiElement"));
               log.info("GuiQuery \n " + guiQuery);
               queryResultSet = QueryUtils.getQueryResults(guiQuery, vreq);
               String[] vars1 = {"value" ,"uri"};
               guiInputs = getSimpleQueryVars(queryResultSet, vars1);
               log.info("GuiQuery : " + guiInputs.toString());
               this.guiMap.put(NAME, guiInputs);
               break;
 
        case "http://myDisplayOntology.org#ImageField" :
          //The param variable defines the mapping between the query and the inputs of the guielement
          String imageFieldQuery = "PREFIX myDisplay: <http://myDisplayOntology.org#> "
              + " select ?fileName ?url ?mimeType "
              + " where { "
              + "    ?guiElement   myDisplay:fieldFileName   ?fileName . "
              + "    ?guiElement   myDisplay:fieldUrl    ?url  . "
              + "    ?guiElement   myDisplay:fieldMimeType  ?mimeType  ."
              + " } ";
          guiQuery = QueryUtils.subUriForQueryVar(imageFieldQuery, "guiElement", result.get("guiElement"));
          queryResultSet = QueryUtils.getQueryResults(guiQuery, this.vreq);       
          String vars2[] = {"fileName", "url", "mimeType"};
          guiInputs = getSimpleQueryVars(queryResultSet, vars2);
          
          this.guiMap.put(NAME, guiInputs);
          break;
         default:  break;
        }
        //Filling the queryVarMap 
        List<String> varList = new ArrayList<String>();
        for(String name : guiInputs.keySet()){
          varList.add(guiInputs.get(name));
        }
        String[] queryVars = new String[varList.size()];
        for( int i = 0 ; i < varList.size() ; i++){
          queryVars[i] = varList.get(i);
        }
        this.queryVarMap.put(NAME, queryVars);
      }
   }
    
 
    
    public void getMainObjects(){
      String query = QueryUtils.subUrisForQueryVars(mainObjectQuery, this.inputMap);
      log.info("MainObjectQuery : " + query);
      ResultSet resultSet = QueryUtils.getQueryResults(query, this.vreq);
      String[] vars = {"mainObject"};
      List<Map<String, String>> results = getQueryVars(resultSet, vars);
      for( Map<String, String> result : results){
        this.mainObjectUris.add(result.get("mainObject"));
      }
    }
    
    public void setOutputData(){
       for(String mainObject : this.mainObjectUris){
         //For each row we have to create this
         Map<String, List<Map<String, String>>> rowMap = new HashMap<String, List<Map<String, String>>>();
         for(String fieldName : queryMap.keySet()){
           String queryString = queryMap.get(fieldName);
           String query = QueryUtils.subUriForQueryVar(queryString, "mainObjectVar", mainObject);
           //Execute the query 
           log.info("QueryWith the variable  :" + query);
           ResultSet resultSet = QueryUtils.getQueryResults(query, this.vreq);
           String[] vars = this.queryVarMap.get(fieldName);
           
           List<Map<String, String>> res = getQueryVars(resultSet, vars);
           log.info("Result of the query \n mainObject : " + mainObject + "  \n " + res.toString());
           List<Map<String, String>> cellList = new ArrayList<Map<String, String>>();
           for(Map<String, String> fieldRowData : res){
               Map<String, String> cellData = new HashMap<String, String>();
               //for(int i = 0; i < vars.length; i++){
                 //cellData.put(vars[i], fieldRowData.get(vars[i]));
               //}
               for(String key : this.guiMap.get(fieldName).keySet()){
                 cellData.put(key, fieldRowData.get(this.guiMap.get(fieldName).get(key)));

               }
               cellList.add(cellData);
           }
           rowMap.put(fieldName, cellList);
         }
         this.data.add(rowMap);
       }
    }
    
    public void prepareJSON(JSONArray toSend){
      
      int i = 0;
      for(Map<String, List<Map<String, String>>> rows : this.data){
        
        try {
        JSONObject rowData = new JSONObject();
        rowData.put("mainObjectUri", this.mainObjectUris.get(i));
        for(String columnNames : this.queryMap.keySet()){
          JSONArray cellList = new JSONArray();
          for(Map<String, String> listData : rows.get(columnNames)){
            JSONObject cellData = new JSONObject();
            for(String key : listData.keySet()){
              cellData.put(key, listData.get(key));
            }
            cellList.put(cellData);
          }
          rowData.put(columnNames, cellList);
        }
        toSend.put(rowData);
        i++;
        } catch(Exception ex) {
          log.error("Error occurred in converting values to JSON object", ex);
        }        
      } 
    }

    private static List<Map<String, String>> getQueryVars(ResultSet results, String[] vars){
      
      List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();
      while(results.hasNext()){
        QuerySolution sol = results.next();
        //Map for the row of the result
        Map<String, String> resultMap  = new HashMap<String, String>();
        for(String var : vars){
          RDFNode node = sol.get(var);
          if(node.isResource()){
            resultMap.put(var,node.asResource().toString());
          } else {
            resultMap.put(var, sol.getLiteral(var).getString());
          }
        }
        resultList.add(resultMap);
      }
      return resultList;
    }
    
    private static Map<String, String> getSimpleQueryVars(ResultSet results, String[] vars){
      
      QuerySolution sol = results.next();
      Map<String, String> resultMap  = new HashMap<String, String>();
      for(String var : vars){
        resultMap.put(var, sol.get(var).toString());
      }
      return resultMap;
    }
    

}
