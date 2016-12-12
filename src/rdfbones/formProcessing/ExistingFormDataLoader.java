package rdfbones.formProcessing;

import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;

import webappconnector.VIVOWebappConnector;
import rdfbones.form.FormConfiguration;
import rdfbones.graphData.Graph;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators.DocumentUploadFormGenerator;

public class ExistingFormDataLoader extends VitroAjaxController {

  private static final long serialVersionUID = 1L;
  private Log log = LogFactory.getLog(ExistingFormDataLoader.class); 

  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {


    JSONArray json = new JSONArray();
    try {
      json = responseFunction(vreq);
    } catch (JSONException e1) {
      // TODO Auto-generated catch block
      e1.printStackTrace();
    }
    response.getWriter().write(json.toString());
  }

  public JSONArray responseFunction(VitroRequest vreq) throws JSONException {

    String subjectUri = vreq.getParameter("subjectUri");
    String objectUri = vreq.getParameter("objectUri");
    String editKey = vreq.getParameter("editKey");
    EditConfigurationVTwo editConfig = getEditConfig(vreq, editKey);
    FormConfiguration formConfig = editConfig.getFormConfig();
    Graph graph = formConfig.dataGraph;
    graph.setWebapp(new VIVOWebappConnector(vreq));
    graph.getExistingData(subjectUri, objectUri);
    return graph.existingData;
  }

  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {
    return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }

}
