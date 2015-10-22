package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONObject;


import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;

/**
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class InstanceToOfferController extends VitroAjaxController {

    private static final long serialVersionUID = 1L;
    private static final Log log = LogFactory.getLog(InstanceToOfferController.class);
    
    private static final String PARAM_QUERY = "term";
   
	    
    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {

    	
    	log.info("Ajax call arrived");
        String term = vreq.getParameter(PARAM_QUERY);
			
	    JSONArray arrayToSend = new JSONArray();
    	
        try {
    		
        	JSONObject jsonObj1 = new JSONObject();
        	jsonObj1.put("label", term);
        	jsonObj1.put("uri", "uri");
    		
        	JSONObject jsonObj2 = new JSONObject();
        	jsonObj2.put("label", term);
        	jsonObj2.put("uri", "uri");

        	arrayToSend.put(jsonObj1);
        	arrayToSend.put(jsonObj2);
        	
    	} catch(Exception ex) {
    		log.error("Error occurred in converting values to JSON object", ex);
    	}
        
        response.getWriter().write(arrayToSend.toString());
    }

}
