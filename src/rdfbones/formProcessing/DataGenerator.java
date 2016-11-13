package rdfbones.formProcessing;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import com.hp.hpl.jena.rdf.model.Model;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import rdfbones.lib.JSON;
import rdfbones.lib.WebappConnector;
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
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;

/**
 * AutocompleteController generates autocomplete content via the search index.
 */

public class DataGenerator extends VitroAjaxController {

  public static final String PARAMETER_UPLOADED_FILE = "datafile";

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(DataGenerator.class);

  private DataPropertyStatementDao dataDao;
  private ObjectPropertyStatementDao objectDao;
  private PropertyInstanceDao propDao;

  private String[] objectTriplesAdd;
  private String[] dataTriplesAdd;
  private String[] objectTriplesRemove;
  private String[] dataTriplesRemove;

  private static Map<String, String> prefixDef = new HashMap<String, String>();

  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    JSONObject json = new JSONObject();
    try {
      json = responseFunction(vreq);
    } catch (JSONException e1) {
      // TODO Auto-generated catch block
      e1.printStackTrace();
    }
    response.getWriter().write(json.toString());
  }

  public JSONObject responseFunction(VitroRequest vreq) throws JSONException {

    this.dataDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    this.objectDao = vreq.getWebappDaoFactory().getObjectPropertyStatementDao();
    this.propDao = vreq.getWebappDaoFactory().getPropertyInstanceDao();

    JSONObject requestData = new JSONObject(vreq.getParameter("requestData"));
    String editKey = requestData.getString("editKey");
    JSONObject inputData = requestData.getJSONObject("dataToStore");
    
    EditConfigurationVTwo editConfig = getEditConfig(vreq, editKey);
    
    Graph graph = editConfig.getCustomGraph();
    graph.init(new WebappConnector(vreq));
    graph.debug(0);
    
    Model writeModel =
        editConfig.getWriteModelSelector().getModel(vreq, getServletContext());
    String triplesToCreate = graph.saveInitialData(JSON.getDummy1());
    log.info("triplesToCreate  : " + triplesToCreate);

    JSONObject response = new JSONObject();
    response.put("triplesCreate", triplesToCreate);
    response.put("inputData", inputData);
    log.info("Last");
    log.info(response.toString());
    return response;
  }
  
  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey){
    
    return  EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }

}
