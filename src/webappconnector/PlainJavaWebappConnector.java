package webappconnector;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.lib.ArrayLib;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;

public class PlainJavaWebappConnector implements WebappConnector{

  public Map<String, Object> requestMap = new HashMap<String, Object>();
  boolean logEnabled = true;
  
  public PlainJavaWebappConnector(boolean var){
    
  }

  public PlainJavaWebappConnector(){
    
  }
  
  @Override
  public String getUnusedURI() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public String getInputParameter(String parameter) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public List<Map<String, String>> sparqlResult(String queryStr, List<String> uris,
    List<String> literals) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public void log(String msg) {
    // TODO Auto-generated method stub
  }
  
  public boolean addTriples(String triples, String editKey){
    return false;    
  }
 
  public boolean removeTriples(String triples, String editKey){
    return true;
  }

  @Override
  public void addToQueries(String query) {
    // TODO Auto-generated method stub
    
  }

  @Override
  public JSONArray getQueries() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public boolean addTriples(String triples) {
    // TODO Auto-generated method stub
    return false;
  }

  @Override
  public boolean removeTriples(String triples) {
    // TODO Auto-generated method stub
    return false;
  }

  @Override
  public JSONObject logJSON() {
    // TODO Auto-generated method stub
    return null;
  }
  
}
