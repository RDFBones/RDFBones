

package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;

public class ProfilePageLoader extends FreemarkerHttpServlet{
  
  private static final long serialVersionUID = 1L;   
  private static final Log log = LogFactory.getLog(ProfilePageLoader.class.getName());

  @Override
  protected ResponseValues processRequest(VitroRequest vreq) {
    
    
    String templateName = new String();
    String pageUri = vreq.getParameter("pageUri");
    /*
     * Right now we just hard code the different page data configurations
     * but later it has to be loaded from the triples.
     */
    log.info("PageLoader");
    Map<String, Object> body = new HashMap<String, Object>();
    
    switch(pageUri){
      case "skeletalInventory" :
        templateName = "skeletalInventory.ftl";
        body.put("individual", vreq.getParameter("skeletalInventory"));
        body.put("skeletalInventory", vreq.getParameter("skeletalInventory"));
        break;
        
      case "boneDivision" :
        templateName = "boneDivision.ftl";
        body.put("individual", vreq.getParameter("boneDivision"));
        body.put("skeletalInventory", vreq.getParameter("individual"));
        break;
      default : break;
    }
    return new TemplateResponseValues(templateName, body);
  }
}
