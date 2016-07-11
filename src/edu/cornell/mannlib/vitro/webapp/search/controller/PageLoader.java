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
    String pageUri = vreq.getParameter("pageUri");

    /*
     * Right now we just hard code the different page data configurations but
     * later it has to be loaded from the triples.
     */
    switch (pageUri) {
    case "skeletalInventory":
      templateName = "skeletalInventory.ftl";
      break;
    case "boneDivision":
      templateName = "boneDivision.ftl";
      break;
    case "partlySymmetricBoneDivision" :
      templateName = "partlySymmetricBoneDivision.ftl";
      break;
    case "symmetricBoneDivision":
      templateName = "symmetricBoneDivision.ftl";
      break;
    case "boneOrgan":
      templateName = "boneOrgan.ftl";
      break;
    case "singlePhalanx":
      templateName = "singlePhalanx.ftl";
      break;
    case "phalanges":
      templateName = "phalanges.ftl";
      break; 
    case "symmetricSingleBone":
      templateName = "symmetricSingleBone.ftl";
      break;
    case "skeletalDivision":
      templateName = "skeletalDivision.ftl";
      break;  
      
    default:
      templateName = "notImplemented.ftl";
      break;
    }

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
