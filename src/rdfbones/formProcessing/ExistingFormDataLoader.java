package rdfbones.formProcessing;

import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;

import webappconnector.VIVOWebappConnector;
import rdfbones.rdfdataset.Graph;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class ExistingFormDataLoader extends VitroAjaxController {

  private static final long serialVersionUID = 1L;

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

    String subject = vreq.getParameter("subject");
    String object = vreq.getParameter("object");
    String editKey = vreq.getParameter("editKey");
    EditConfigurationVTwo editConfig = getEditConfig(vreq, editKey);
    Graph graph = editConfig.getCustomGraph();
    graph.init(new VIVOWebappConnector(vreq));
    graph.getExistingData(subject, object);
    return graph.existingData;
  }

  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {
    return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }

}
