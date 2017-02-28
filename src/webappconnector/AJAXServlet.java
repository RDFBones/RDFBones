package webappconnector;

import java.io.IOException;

import org.json.JSONObject;

import rdfbones.form.FormConfiguration;
import rdfbones.formProcessing.AJAXController;
import rdfbones.formProcessing.AJAXError;
import rdfbones.lib.JSON;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

public class AJAXServlet extends VitroAjaxController {

  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
      throws IOException, ServletException {
   
       JSONObject json = new JSONObject();
       if(checkRequestData(vreq, json)){
         JSONObject requestData = JSON.getObject(vreq.getParameter("requestData"));
         if(requestData.has("editKey")){
           String editKey = JSON.string(requestData, "editKey");
           EditConfigurationVTwo editConfig = getEditConfig(vreq, editKey);
           FormConfiguration formConfig = editConfig.getFormConfig();
           formConfig.setWebapp(new VIVOWebappConnector(vreq));  
           AJAXController ajaxController = new AJAXController(formConfig, requestData);
           json = ajaxController.response; 
         } else {
           AJAXError.editKeyNotDefined(json);
         }
       }
       response.getWriter().write(json.toString());
    }
  
    EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {
      return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
    }
    
    boolean checkRequestData(VitroRequest vreq, JSONObject json){
      if(vreq.getParameter("requestData") == null){
        AJAXError.requestDataUndefined(json);
        return false;
      } else {
        return true;
      }
    }
}
