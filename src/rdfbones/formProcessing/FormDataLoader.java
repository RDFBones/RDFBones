package rdfbones.formProcessing;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.hp.hpl.jena.query.ResultSet;

import rdfbones.form.FormConfiguration;
import rdfbones.lib.JSON;
import rdfbones.graphData.VariableDependency;
import rdfbones.graphData.Graph;
import webappconnector.VIVOWebappConnector;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class FormDataLoader extends VitroAjaxController {

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(FormDataLoader.class);

  VitroRequest vreq;

  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    JSONObject requestData = JSON.obj(vreq.getParameter("requestData"));
    String editKey = JSON.string(requestData, "editKey");
    EditConfigurationVTwo editConfig = getEditConfig(vreq, editKey);
    FormConfiguration formConfig = editConfig.getFormConfig();
    Graph graph = formConfig.dataGraph;
    graph.setWebapp(new VIVOWebappConnector(vreq));
    JSONObject responseJSON = graph.getDependentData(requestData);
    response.getWriter().write(responseJSON.toString());
  }

  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {
    return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }

}