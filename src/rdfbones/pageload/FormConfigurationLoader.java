package rdfbones.pageload;

import java.io.IOException;
import java.util.HashMap;
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

import rdfbones.form.Form;
import rdfbones.form.FormConfiguration;
import rdfbones.lib.JSON;
import rdfbones.rdfdataset.Graph;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.PropertyInstanceDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class FormConfigurationLoader extends VitroAjaxController {

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(FormConfigurationLoader.class);

  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    String editKey = vreq.getParameter("editKey");
    EditConfigurationVTwo editConfig = getEditConfig(vreq, editKey);
    FormConfiguration formConfig = editConfig.getFormConfig();
    Graph graph = formConfig.dataGraph;
    Form form = formConfig.form;
    
    JSONObject json = new JSONObject();
    JSON.put(json, "formDescriptor", form.getJSON());
    JSON.put(json, "dataDependencies", graph.dependencyDescriptor());
    response.getWriter().write(json.toString());
  }

  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {
    return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }
}  
