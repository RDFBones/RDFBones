/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.vitro.webapp.beans.Individual;
import edu.cornell.mannlib.vitro.webapp.beans.VClass;
import edu.cornell.mannlib.vitro.webapp.beans.VClassGroup;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ExceptionResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.individuallist.IndividualListResults;
import edu.cornell.mannlib.vitro.webapp.dao.IndividualDao;
import edu.cornell.mannlib.vitro.webapp.modules.searchEngine.SearchEngineException;
import edu.cornell.mannlib.vitro.webapp.modules.searchEngine.SearchQuery;
import edu.cornell.mannlib.vitro.webapp.utils.searchengine.SearchQueryUtils;
import edu.cornell.mannlib.vitro.webapp.web.templatemodels.individuallist.ListedIndividual;

/** 
 * Generates a list of individuals for display in a template 
 */
public class CustomPageLoadController extends FreemarkerHttpServlet {
  
    private static final long serialVersionUID = 1L;   
    private static final Log log = LogFactory.getLog(CustomPageLoadController.class.getName());
    
    private static final int INDIVIDUALS_PER_PAGE = 30;
    private static final int MAX_PAGES = 40;  // must be even
    
    private static final String TEMPLATE_DEFAULT = "skeletalInventoryProfilePage.ftl";

    @Override
    protected ResponseValues processRequest(VitroRequest vreq) {
        
      
        String templateName = TEMPLATE_DEFAULT;
        Map<String, Object> body = new HashMap<String, Object>();
        return new TemplateResponseValues(templateName, body);
    }
    
}
