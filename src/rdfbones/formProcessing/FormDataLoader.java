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

import rdfbones.lib.JSON;
import rdfbones.lib.VariableDependency;
import rdfbones.rdfdataset.Graph;
import webappconnector.VIVOWebappConnector;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class FormDataLoader extends VitroAjaxController {

  public static final String PARAMETER_UPLOADED_FILE = "datafile";

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(ExistingFormDataLoader.class);

  VitroRequest vreq;

  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    JSONObject requestData = JSON.obj(vreq.getParameter("requestData"));
    String editKey = JSON.string(requestData, "editKey");
    EditConfigurationVTwo editConfig = getEditConfig(vreq, editKey);
    Graph graph = editConfig.getCustomGraph();
    graph.setWebapp(new VIVOWebappConnector(vreq));
    JSONObject respJSON  = this.dependentData(JSON.object(requestData, "dependentVars"), graph);
    response.getWriter().write(respJSON.toString());
  }

  public JSONObject dependentData(JSONObject dependencies, Graph graph) {

    JSONObject response = JSON.obj();
    Iterator<?> keys = dependencies.keys();
    while(keys.hasNext()){
      String key = (String) keys.next();
      JSONObject inputVars = JSON.object(dependencies, key);
      VariableDependency dependency = graph.variableDependencies.get(key);
      JSON.put(response, key, dependency.getData(inputVars));
    }
    return response;
  }

  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {
    return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }

}