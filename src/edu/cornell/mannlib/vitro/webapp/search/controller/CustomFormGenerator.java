package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.util.HashMap;
import java.util.Map;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.Form;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic.BonyForm;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic.BonyForm1;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic.BonyForm2;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class CustomFormGenerator extends FreemarkerHttpServlet{

  private static final Log log = LogFactory.getLog(CustomFormGenerator.class.getName());

  @Override
  protected ResponseValues processRequest(VitroRequest vreq){
    
    /*
     * Get the form from the config data
     * Form form = MyFormUtils.getForm(vreq)
     */
    Form form;
    switch(vreq.getParameter("formUri")){
    
      case "bonyForm1" : 
          form = BonyForm1.getForm(vreq);
          break;
      case "bonyForm2" :
          form = BonyForm2.getForm(vreq);
          break;
      default : form = BonyForm.getForm(vreq);

    } 
    form.initData();
    /*
     * We have to implement a validator that checks if the 
     * each required parameter has arrived with the HTTP request
     * new FormValiDator(form, vreq).validate()
     */
    Map<String, Object> toReturn = new HashMap<String, Object>();
    toReturn.put("form", form);
    
    Map<String, String> params = new HashMap<String, String>();
    for (String key : vreq.getParameterMap().keySet()) {
      if (!key.equals("pageUri")) {
        params.put(key, vreq.getParameter(key));
      } else {
        params.put("inputPageUri", vreq.getParameter(key));
      }
    }
    toReturn.put("params", params);
    
    return new TemplateResponseValues("universal.ftl", toReturn);
  }
}
