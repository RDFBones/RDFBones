package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;

public class EntryFormLoader extends FreemarkerHttpServlet{
  
  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(CustomPageLoadController.class.getName());
  
  private static final int INDIVIDUALS_PER_PAGE = 30;
  private static final int MAX_PAGES = 40;  // must be even
  

  @Override
  protected ResponseValues processRequest(VitroRequest vreq) {
    
    
    String templateName = new String();
    Map<String, Object> body = new HashMap<String, Object>();

    String entryFormType = vreq.getParameter("entryFormType");

    switch(entryFormType){
    
    case "coherentBones" : 
      templateName = "coherentBones.ftl";
      body.put("classUri", vreq.getParameter("classUri"));
      body.put("individual", vreq.getParameter("individual"));
      break;
      
    case "boneDivisions" :
      templateName = "systemicParts.ftl";
      body.put("classUri", vreq.getParameter("classUri"));
      body.put("individual", vreq.getParameter("individual"));
      break;
    }
    
    return new TemplateResponseValues(templateName, body);
  }
  
}
