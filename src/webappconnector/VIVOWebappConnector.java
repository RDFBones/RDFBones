package webappconnector;

import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.shared.Lock;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.lib.JSON;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;
 
 public class VIVOWebappConnector implements WebappConnector{
 
  private Log log = LogFactory.getLog(WebappConnector.class); 

  public Map<String, Object> requestMap = new HashMap<String, Object>();
  VitroRequest vreq;
  NewURIMaker newURIMaker;
  boolean logEnabled = true;
  JSONArray queries; 
  
  public VIVOWebappConnector(VitroRequest vreq){
    this.vreq = vreq;
    newURIMaker = new NewURIMakerVitro(vreq.getWebappDaoFactory());
    queries = JSON.arr();
  }
  
  public VIVOWebappConnector(){
    
   }
   
   public VIVOWebappConnector(boolean log){
     this.logEnabled = log;
   }

   public String getInputParameter(String parameterName){
     return vreq.getParameter(parameterName);
   }
   
   public List<Map<String, String>> sparqlResult(String queryStr, List<String> uris, List<String> literals){
     
      return QueryUtils.getResult(queryStr, uris, literals, this.vreq);
   }
   
   public void log(String msg){
     
     if(this.logEnabled){
      log.info(msg);
     }
   }

  public String getUnusedURI() {
    try {
      return newURIMaker.getUnusedNewURI(null);
    } catch (InsertException e){
      e.printStackTrace();
    }
    return new String("");
  }
  
 
  public boolean addTriples(String triples, String editKey){
    
    Model writeModel = getWriteModel(editKey);
    Model dataModel = getDataModel(triples);
    if(dataModel == null){
      return false;
    } else {
      return add(writeModel, dataModel);
    } 
  }
  
  public boolean removeTriples(String triples, String editKey){
    Model writeModel = getWriteModel(editKey);
    Model dataModel = getDataModel(triples);
    if(dataModel == null){
      return false;
    } else {
      return remove(writeModel, dataModel);
    } 
  }
  
  public boolean add(Model writeModel, Model toAdd){
   
    boolean success = true;
    Lock lock = null;
    try {
      lock = writeModel.getLock();
      lock.enterCriticalSection(Lock.WRITE);
      writeModel.add(toAdd);
      log.info("Succesfully read N3 triples");

    } catch (Throwable t) {
      log.error("error adding edit change n3required model to in memory model \n"
          + t.getMessage());
      success = false;
    } finally {
      lock.leaveCriticalSection();
    }
    return success;
  }
  
  public boolean remove(Model writeModel, Model toRemove){
    
    boolean success = true;
    Lock lock = null;
    try {
      lock = writeModel.getLock();
      lock.enterCriticalSection(Lock.WRITE);
      writeModel.remove(toRemove);
    } catch (Throwable t) {
      log.error("error adding edit change n3required model to in memory model \n"
          + t.getMessage());
      success = false;
    } finally {
      lock.leaveCriticalSection();
    }
    return success;
  }
  
 public Model getWriteModel(String editKey){
    
    ServletContext context = vreq.getSession().getServletContext();
    EditConfigurationVTwo editConfig =
         EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
    return editConfig.getWriteModelSelector().getModel(vreq, context);
  }
 
  public Model getDataModel(String triples){
    
    Model model = null;
    try {
      model = ModelFactory.createDefaultModel();
      StringReader reader = new StringReader(N3Utils.getPrefixes() + triples);
      model.read(reader, "", "N3");
    } catch (Throwable t) {
      // Catch
      model = null;
    }
    return model;
  }

  @Override
  public void addToQueries(String query) {
    // TODO Auto-generated method stub
    this.queries.put(query);
  }

  @Override
  public JSONArray getQueries() {
    // TODO Auto-generated method stub
    return this.queries;
  }
 }  
