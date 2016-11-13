package rdfbones.lib;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;

public class WebappConnector {

  private Log log = LogFactory.getLog(WebappConnector.class); 

  public Map<String, Object> requestMap = new HashMap<String, Object>();
  public boolean logEnabled = true;
  VitroRequest vreq;
  NewURIMaker newURIMaker;
  
  public WebappConnector(VitroRequest vreq){
    this.vreq = vreq;
    newURIMaker = new NewURIMakerVitro(vreq.getWebappDaoFactory());
  }
  
  public WebappConnector(boolean log){
    this.logEnabled = log;
  }
  
  public String getUnusedNewURI(){

    try {
      return newURIMaker.getUnusedNewURI(null);
    } catch (InsertException e){
      e.printStackTrace();
    }
    return new String("");
  }
  
  public String getInputParameter(String parameterName){
    
    if(this.requestMap.containsKey(parameterName)){
      return this.requestMap.get(parameterName).toString();
    } else {
      return parameterName + "URI";  
    }
  }
  
  public List<Map<String, String>> sparqlResult(String queryStr, List<String> uris, List<String> literals){
    
    return QueryUtils.getResult(queryStr, uris, literals, this.vreq);
  }
  
  public void log(String msg){
    
    if(this.logEnabled){
      log.info(msg);
    }
  }
}
