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
			
	    JSONArray jsonArray = new JSONArray();
        JSONObject jsonObj = new JSONObject();
    	
        try {
    		jsonObj.put("term", term);
    		
    	} catch(Exception ex) {
    		log.error("Error occurred in converting values to JSON object", ex);
    	}
        
        jsonArray.put(jsonObj);
        response.getWriter().write(jsonArray.toString());
    }

}
