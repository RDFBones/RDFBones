package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.util.HashMap;
import java.util.Map;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;

public class NewInstance extends FreemarkerHttpServlet{

  
  @Override 
  public ResponseValues processRequest(VitroRequest vreq){
    
    String classUri = vreq.getParameter("classUri");
    String classLabel = vreq.getParameter("classLabel");
    String individual = new String();
    if(vreq.getParameter("label") == null){
       individual = new InstanceCreator(vreq, classUri, classLabel).createInstance();
    }
    
    Map<String, Object> data = new HashMap<String, Object>();
    
    data.put("individual", individual);
    String template = vreq.getParameter("pageUri") + ".ftl";
    return new TemplateResponseValues(template, data);
  }
}
