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
  
  private static final String TEMPLATE_DEFAULT = "generalEntryForm.ftl";

  @Override
  protected ResponseValues processRequest(VitroRequest vreq) {
    String templateName = TEMPLATE_DEFAULT;
    log.info("here we are");
    Map<String, Object> body = new HashMap<String, Object>();
    body.put("classUri", vreq.getParameter("classUri"));
    body.put("individual", vreq.getParameter("individual"));
    log.info(body.toString());
    return new TemplateResponseValues(templateName, body);
  }
  
}
