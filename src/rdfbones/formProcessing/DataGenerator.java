package rdfbones.formProcessing;

import java.io.IOException;
import java.io.StringReader;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.shared.Lock;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;

import webappconnector.VIVOWebappConnector;
import rdfbones.form.FormConfiguration;
import rdfbones.graphData.Graph;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class DataGenerator extends VitroAjaxController {

  public static final String PARAMETER_UPLOADED_FILE = "datafile";
  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(DataGenerator.class);
  boolean failed = false;
  
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

    JSONObject requestData = new JSONObject(vreq.getParameter("requestData"));
    String editKey = requestData.getString("editKey");
    JSONObject inputData = requestData.getJSONObject("dataToStore");
    EditConfigurationVTwo editConfig = getEditConfig(vreq, editKey);

    FormConfiguration formConfig = editConfig.getFormConfig();
    Graph graph = formConfig.dataGraph;
    graph.setWebapp(new VIVOWebappConnector(vreq));

    String triplesToCreate = graph.saveInitialData(inputData);
    log.info(triplesToCreate);
    ServletContext context = getServletContext();
    saveTriples(vreq, editConfig, triplesToCreate, context);

    JSONObject response = new JSONObject();
    response.put("triplesCreate", triplesToCreate);
    response.put("inputData", inputData);
    response.put("existingData", graph.existingData);
    if(this.failed){
      response.put("failed", true);
    }
    return response;
  }

  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {

    return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }

  public void saveTriples(VitroRequest vreq, EditConfigurationVTwo editConfig,
    String triples, ServletContext servletContext) {

    String triplesToStore = N3Utils.getPrefixes() + triples;
    Model writeModel = editConfig.getWriteModelSelector().getModel(vreq, servletContext);
    Model model = null;
    try {
      model = ModelFactory.createDefaultModel();
      StringReader reader = new StringReader(triplesToStore);
      model.read(reader, "", "N3");
      log.info("Succesfully read N3 triples");
    } catch (Throwable t) {
      // Catch
      log.info("Failed to read N3 triples");
      this.failed = true;
    }
    Lock lock = null;
    try {
      lock = writeModel.getLock();
      lock.enterCriticalSection(Lock.WRITE);
      writeModel.add(model);
    } catch (Throwable t) {
      log.error("error adding edit change n3required model to in memory model \n"
          + t.getMessage());
    } finally {
      lock.leaveCriticalSection();
    }
  }
}
