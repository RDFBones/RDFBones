package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONObject;

import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.Resource;

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
    
    private static final String PARAM_QUERY = "term";
    private static final String TYPE_QUERY = "type";
    
	    
    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {

    	
    	log.info("Ajax call arrived");
        String term = vreq.getParameter(PARAM_QUERY);
        String type = vreq.getParameter(TYPE_QUERY);
        
        ResultSet results =  performQuery(vreq, type, term);
        
        JSONArray arrayToSend = new JSONArray();
        
        prepareAJAX(results, arrayToSend);
        
        response.getWriter().write(arrayToSend.toString());
    }
    
    
    private static String LABEL_QUERY = ""
    		+ "PREFIX vitro: <" + VitroVocabulary.vitroURI + "> \n" 
            + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
            + "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
            + "SELECT DISTINCT ?subject ?label ?mst WHERE { \n"
            + "    ?subject rdf:type  ?class  .\n"
            + "	   ?subject vitro:mostSpecificType ?mst .\n"
            + "    ?subject rdfs:label ?label .\n"
            + " FILTER 	REGEX(?label, \"^(pattern)\") .\n"
            + "} ORDER BY ?label";
    
    
   private ResultSet performQuery(VitroRequest vreq, String classUri, String pattern){
	   
    	String queryNew = LABEL_QUERY.replace("pattern", pattern);
        String queryStr = QueryUtils.subUriForQueryVar(queryNew, "class",  classUri );
        log.info("queryStr = " + queryStr);
		
        try {
            ResultSet results = QueryUtils.getQueryResults(queryStr, vreq);
            return results;

        } catch (Exception e) {
                log.error(e, e);
        }
		return null; 
   }
   
   
   private void prepareAJAX(ResultSet results, JSONArray arr){
    	
    	
    	while (results.hasNext()) {
    		
            QuerySolution soln = results.nextSolution();
            Literal nodeLiteral = soln.get("label").asLiteral();
            Resource mstResource = soln.get("mst").asResource();
            Resource subj = soln.get("subject").asResource();
            
            try {
            	
            	JSONObject jsonObj = new JSONObject();
	        	jsonObj.put("label", nodeLiteral.toString().split("\\^")[0]);
	        	jsonObj.put("uri", subj.getURI());
	        	jsonObj.put("mst", mstResource.getLocalName());
	        	arr.put(jsonObj);
        	
            }	catch(Exception ex) {
        		log.error("Error occurred in converting values to JSON object", ex);
        	}
	        	
        }
    	
    }

}
