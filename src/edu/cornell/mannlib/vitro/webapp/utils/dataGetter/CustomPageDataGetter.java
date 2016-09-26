/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.utils.dataGetter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;

import com.hp.hpl.jena.rdf.model.Model;

import edu.cornell.mannlib.vitro.webapp.beans.VClass;
import edu.cornell.mannlib.vitro.webapp.beans.VClassGroup;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.UrlBuilder;
import edu.cornell.mannlib.vitro.webapp.dao.DisplayVocabulary;
import edu.cornell.mannlib.vitro.webapp.dao.VClassGroupsForRequest;
import edu.cornell.mannlib.vitro.webapp.dao.jena.VClassGroupCache;
import edu.cornell.mannlib.vitro.webapp.web.templatemodels.VClassGroupTemplateModel;

/**
 * This will pass these variables to the template:
 * classGroupUri: uri of the classgroup associated with this page.
 * vClassGroup: a data structure that is the classgroup associated with this page.     
 */
public class CustomPageDataGetter extends DataGetterBase implements DataGetter{
	
    private static final Log log = LogFactory.getLog(CustomPageDataGetter.class);
    String dataGetterURI;
    String classGroupUri;
    VitroRequest vreq;
    ServletContext context;

    /**
     * Constructor with display model and data getter URI that will be called by reflection.
     */
    public CustomPageDataGetter(VitroRequest vreq, Model displayModel, String dataGetterURI){
        this.configure(vreq, displayModel,dataGetterURI);
    }        
    
    /**
     * Configure this instance based on the URI and display model.
     */
    protected void configure(VitroRequest vreq, Model displayModel, String dataGetterURI) {
    	if( vreq == null ) 
    		throw new IllegalArgumentException("VitroRequest  may not be null.");
        if( displayModel == null ) 
            throw new IllegalArgumentException("Display Model may not be null.");
        if( dataGetterURI == null )
            throw new IllegalArgumentException("PageUri may not be null.");
                
        this.vreq = vreq;
        this.context = vreq.getSession().getServletContext();
        this.dataGetterURI = dataGetterURI;       
        log.info("dataGetterUri : " + this.dataGetterURI);
    }
    
    @Override
    public Map<String, Object> getData(Map<String, Object> pageData) { 
    	  HashMap<String, Object> data = new HashMap<String,Object>();
    	  
    	  data.put("dataGetterUri", this.dataGetterURI);
    	  data.put("bodyTemplate", "customMenuPage.ftl");
    	  return data;
     }
    
 
}