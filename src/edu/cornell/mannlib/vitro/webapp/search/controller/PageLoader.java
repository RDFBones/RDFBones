package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;

public class PageLoader extends FreemarkerHttpServlet {

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(PageLoader.class.getName());

  @Override
  protected ResponseValues processRequest(VitroRequest vreq) {

    String templateName = new String();
    templateName = vreq.getParameter("pageUri") + ".ftl";
    
    Map<String, String> params = new HashMap<String, String>();
    for (String key : vreq.getParameterMap().keySet()) {
      if (!key.equals("pageUri")) {
        params.put(key, vreq.getParameter(key));
      } else {
        params.put("inputPageUri", vreq.getParameter(key));
      }
    }

    Map<String, Object> body = new HashMap<String, Object>();
    body.put("params", params);
    return new TemplateResponseValues(templateName, body);
  }
}
