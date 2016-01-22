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

public class InstanceToOfferController extends VitroAjaxController {

    private static final long serialVersionUID = 1L;
    private static final Log log = LogFactory.getLog(InstanceToOfferController.class);
    
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
        
    public void initInputMap(){
      
      this.inputMap.put("subjectUri", vreq.getParameter("subjectUri"));
      this.inputMap.put("predicateUri", vreq.getParameter("predicateUri"));
      this.inputMap.put("customEntryFormUri", vreq.getParameter("customEntryFormUri"));
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
    
    private static String mainObjectQuery = ""
        + " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
        + " SELECT ?mainObject "
        + " WHERE {  "
        + "   ?predicateUri   rdfs:range   ?rangeClass . "
        + "   ?mainObject     a            ?rangeClass . "
        + "   FILTER NOT EXISTS { ?subjectUri   ?predicateUri   ?mainObject } "
        + " } ORDER BY DESC(?mainObject)"
        + " LIMIT 10 ";
    
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
    
    /*
    public void JSONTest(){
      
        List<Map<String, List<Map<String, String>>>> var = new ArrayList<Map<String, List<Map<String, String>>>>();
        Map<String, List<Map<String, String>>> map1 = new HashMap<String, List<Map<String, String>>>();
        Map<String, List<Map<String, String>>> map2 = new HashMap<String, List<Map<String, String>>>();
        
        List<Map<String, String>> list11 = new ArrayList<Map<String, String>>();
        List<Map<String, String>> list12 = new ArrayList<Map<String, String>>();
        List<Map<String, String>> list21 = new ArrayList<Map<String, String>>();
        List<Map<String, String>> list22 = new ArrayList<Map<String, String>>();
        
        Map<String, String> map111 = new HashMap<String, String>();
        Map<String, String> map121 = new HashMap<String, String>();
        Map<String, String> map122 = new HashMap<String, String>();
        Map<String, String> map211 = new HashMap<String, String>();
        Map<String, String> map221 = new HashMap<String, String>();
        Map<String, String> map222 = new HashMap<String, String>();
        
        map111.put("type", "literalField");
        map111.put("value", "FirstRowFirstColumn");
        
        map121.put("type", "linkField");
        map121.put("value", "121");
        
        map122.put("type", "linkField");
        map122.put("name", "122");
        map122.put("uri", "/vivo/individual/123");
          
        map211.put("type", "literalField");
        map211.put("value", "SecondRowFirstColumn");
        
        map221.put("type", "linkField");
        map221.put("name", "221");
        map221.put("uri", "/vivo/individual/123");
        
        map222.put("type", "download");
        map222.put("url", "/vivo/file/123");
        
        list11.add(map111);
        list12.add(map121);
        list12.add(map122);
        
        list21.add(map211);
        list22.add(map221);
        list22.add(map222);
        
        map1.put("image", list11);
        map1.put("files", list12);
        map1.put("image", list21);
        map1.put("files", list22);
        
        var.add(map1);
        var.add(map2);
        
        log.info("Testdata : \n" + var.toString());
        
        testJSONPrepare(var, arrayToSend);
    }
    
    private static String INITIAL_QUERY = ""
    		+ "PREFIX vitro: <" + VitroVocabulary.vitroURI + "> \n" 
            + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
            + "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
            + "SELECT DISTINCT ?document ?label ?mst WHERE { \n"
            + "    ?document rdf:type  ?type  .\n"
            + "	   ?document vitro:mostSpecificType ?mst .\n"
            + "    ?document rdfs:label ?label .\n"
            + " FILTER 	REGEX(?label, \"^(pattern)\") .\n"
            + " FILTER NOT EXISTS { ?subject ?predicate ?document } . \n"
            + " FILTER (?mst != <http://purl.obolibrary.org/obo/UO_0000280> ) . \n"
            + "	FILTER (?mst !=<http://www.w3.org/2002/07/owl#NamedIndividual> ) \n" 	
            + "} ORDER BY ?label";
    
   
    private static String FILTER_QUERY = ""
    		+ "PREFIX vitro: <" + VitroVocabulary.vitroURI + "> \n" 
            + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
            + "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
            + "SELECT DISTINCT ?document ?label WHERE { \n"
            + "	   ?document vitro:mostSpecificType ?type .\n"
            + "    ?document rdfs:label ?label .\n"
            + " FILTER 	REGEX(?label, \"^(pattern)\") .\n"
            + " FILTER NOT EXISTS { ?subject ?predicate ?document } . \n"
            + "} ORDER BY ?label"; 
    
    
    // The customEntryForm uri will be into this query substituted and we get all
    // fields have to be filled for the table view.

   private ResultSet performQuery(VitroRequest vreq, Map<String,String> varMap, boolean initialQuery){
	   
	   String queryNew = null;
	   if(initialQuery){
		 queryNew = INITIAL_QUERY.replace("pattern", vreq.getParameter(TERM));
	   } else {
		   queryNew = FILTER_QUERY.replace("pattern", vreq.getParameter(TERM));
	   }
    	
	   String queryStr = QueryUtils.subUrisForQueryVars(queryNew, varMap);
	   log.info("queryStr = " + queryStr);
		
        try {
            ResultSet results = QueryUtils.getQueryResults(queryStr, vreq);
            return results;

        } catch (Exception e) {
                log.error(e, e);
        }
		return null; 
   }
  
   private void prepareAJAX(ResultSet results, JSONArray arr, boolean initialQuery, VitroRequest vreq){
    	
    	while (results.hasNext()) {
    		
            QuerySolution soln = results.nextSolution();
            Literal nodeLiteral = soln.get("label").asLiteral();
            Resource mstResource = null;
            if(initialQuery) {
            	mstResource = soln.get("mst").asResource();
            }
            Resource doc = soln.get("document").asResource();
            
            try {
            	
            	JSONObject jsonObj = new JSONObject();
	        	jsonObj.put("label", nodeLiteral.toString().split("\\^")[0]);
	        	jsonObj.put("uri", doc.getURI());
	        	if(initialQuery){
	        		jsonObj.put("mst", mstResource.getLocalName());
	        	} else {
	        		jsonObj.put("mst", vreq.getParameter("optionText"));
	        	}
	        	arr.put(jsonObj);
        	
            }	catch(Exception ex) {
        		log.error("Error occurred in converting values to JSON object", ex);
            }
	        	
        }
    	
    }
   */
}
