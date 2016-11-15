package rdfbones.formProcessing;

import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.shared.Lock;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import rdfbones.lib.JSON;
import webappconnector.WebappConnector;
import rdfbones.rdfdataset.Graph;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.PropertyInstanceDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.event.EditEvent;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;

/**
 * AutocompleteController generates autocomplete content via the search index.
 */

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
    graph.init(new WebappConnector(vreq));
    graph.getExistingData(subject, object);
    return graph.existingData;
  }

  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {
    return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }

}
