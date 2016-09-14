package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import edu.cornell.mannlib.vitro.webapp.config.DeleteBoneOrgan;
import edu.cornell.mannlib.vitro.webapp.config.DeleteCoherentSkeletalDivision;
import edu.cornell.mannlib.vitro.webapp.config.DeleteConf;
import edu.cornell.mannlib.vitro.webapp.config.DeleteConfig;
import edu.cornell.mannlib.vitro.webapp.config.DeleteFromSystemicParent;
import edu.cornell.mannlib.vitro.webapp.config.DeleteInstance;
import edu.cornell.mannlib.vitro.webapp.config.DeleteSkeletalDivision;
import edu.cornell.mannlib.vitro.webapp.config.DeleteSkeletalInventory;
import edu.cornell.mannlib.vitro.webapp.config.DeleteSystemicParts;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.PropertyInstanceDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;

import com.hp.hpl.jena.query.ResultSet;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DeleteController extends VitroAjaxController {

  private DataPropertyStatementDao dataDao;
  private ObjectPropertyStatementDao objectDao;
  private PropertyInstanceDao propDao;
 
  public List<String[]> dataTriples;
  public List<String[]> objectTriples;
  public String[] objectVars;
  public String[] dataVars;
  public String[] inputs;
  public Map<String, String> predicateMap;
  private VitroRequest vreq;
  private static final Log log = LogFactory.getLog(DeleteController.class);
  
  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse resp)
    throws ServletException, IOException {
    // TODO Auto-generated method stub
    
    this.dataDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    this.objectDao = vreq.getWebappDaoFactory().getObjectPropertyStatementDao();
    this.propDao = vreq.getWebappDaoFactory().getPropertyInstanceDao();
    
    this.vreq = vreq;
    log.info("Arrived");

    switch(vreq.getParameter("operation")) {
    
    case "deleteBoneOrgan" :
     
        this.objectTriples = DeleteBoneOrgan.getObjectTriples();
        this.dataTriples = DeleteBoneOrgan.getDataTriples();
        this.predicateMap = DeleteBoneOrgan.predicateMap;
        this.inputs = DeleteBoneOrgan.inputs; 
        break;
    
    case "deleteSkeletalDivision" :
      
      this.objectTriples = DeleteSkeletalDivision.getObjectTriples();
      this.dataTriples = DeleteSkeletalDivision.getDataTriples();
      this.predicateMap = DeleteSkeletalDivision.predicateMap;
      this.inputs = DeleteSkeletalDivision.inputs;
      break;

    case "deleteCoherentSkeletalDivision" :
      
      this.objectTriples = DeleteCoherentSkeletalDivision.getObjectTriples();
      this.dataTriples = DeleteCoherentSkeletalDivision.getDataTriples();
      this.predicateMap = DeleteCoherentSkeletalDivision.predicateMap;
      this.inputs = DeleteCoherentSkeletalDivision.inputs; 
      break;  
      
     case "deleteFromSystemicParent" :
         
       this.objectTriples = DeleteFromSystemicParent.getObjectTriples();
       this.dataTriples = DeleteFromSystemicParent.getDataTriples();
       this.predicateMap = DeleteFromSystemicParent.predicateMap;
       this.inputs = DeleteFromSystemicParent.inputs; 
       break;
      
     case "deleteSystemicParts" :
       
       this.objectTriples = DeleteSystemicParts.getObjectTriples();
       this.dataTriples = DeleteSystemicParts.getDataTriples();
       this.predicateMap = DeleteSystemicParts.predicateMap;
       this.inputs = DeleteSystemicParts.inputs;
       break;
     
     case "deleteSkeletalInventory" :
       
       log.info("deleteSkeletalInventory");
       this.objectTriples = DeleteSkeletalInventory.getObjectTriples();
       this.dataTriples = DeleteSkeletalInventory.getDataTriples();
       this.predicateMap = DeleteSkeletalInventory.predicateMap;
       this.inputs = DeleteSkeletalInventory.inputs;
       break;   
       
      default : 
        log.info("The delete operation is not implemented");
        break;
    }
    
    List<Map<String, String>> result = performQuery();
    this.deleteDataTriples(result);
    this.deleteObjectTriples(result);
    
    if(StringUtils.isNotEmpty(vreq.getParameter("instance"))){
      log.info("notEmpty");
      this.objectTriples = DeleteInstance.getObjectTriples();
      this.dataTriples = DeleteInstance.getDataTriples();
      this.predicateMap = DeleteInstance.predicateMap;
      this.inputs = DeleteInstance.inputs;
      List<Map<String, String>> resultInstance = performQuery();
      this.deleteDataTriples(resultInstance);
      this.deleteObjectTriples(resultInstance);
    } else {
      log.info("empty");
    }
    
    JSONObject obj = new JSONObject();
    try {
      obj.append("noResult", true);
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    resp.getWriter().write(obj.toString());
  }
  
  private void deleteDataTriples(List<Map<String, String>> queryResult){
    
    for(String[] triple : this.dataTriples){
      for(Map<String, String> result : queryResult){
        dataDao.deleteDataPropertyStatementsForIndividualByDataProperty(
            result.get(triple[0]),
            result.get(triple[1]));
        log.info("Deleted : " + triple[0] + "  " + triple[1]);
      }
    }
  }
  
  private void deleteObjectTriples(List<Map<String, String>> queryResult){
    
    for(String[] triple : this.objectTriples){
      for(Map<String, String> result : queryResult){
        this.propDao.deleteObjectPropertyStatement(
            result.get(triple[0]),result.get(triple[1]), result.get(triple[2]));
        log.info("Deleted : " + triple[0] + "  " + triple[1] + "  " + triple[2]);
      }
    }
  }
  
  private List<Map<String, String>> performQuery(){
    
    String query = this.generateQuery();
    log.info(query);
    query = N3Utils.setPrefixes(null, query);
    ResultSet resultSet = QueryUtils.getQueryResults(query, vreq);
    return QueryUtils.getQueryVars(resultSet, this.objectVars, this.dataVars); 
  }
  
  private String generateQuery() {

    String select = this.getSelect();
    String where1 = new String("\n  WHERE { \n");
    String queryTriples = this.getQueryTriples();
    String predicateFilters = this.getPredicateFilter();
    String objectFilters = this.getInputFilter();
    String where2 = new String("\n } \n");
    
    select = select.concat(where1).concat(queryTriples).concat(predicateFilters)
        .concat(objectFilters).concat(where2);
    return select;
  }
  
  private String getSelect() {

    List<String> variable = new ArrayList<String>();
    this.dataVars = new String[dataTriples.size()];
    for(int i = 0; i < this.dataTriples.size(); i++){
      for(int j = 0; j < 3; j++){
        if(j == 2){
          this.dataVars[i] = this.dataTriples.get(i)[2];
        } else {
          if (!variable.contains(this.dataTriples.get(i)[i])) {
            variable.add(this.dataTriples.get(i)[i]);
          }
        }
      }
    }

    for (String[] triple : this.objectTriples) {
      for (String var : triple) {
        if (!variable.contains(var)) {
          variable.add(var);
        }
      }
    }
  
    int i = 0;
    this.objectVars = new String[variable.size()];
    for(String var : variable){
      this.objectVars[i] = var;
      i++;
    }
    
    String select = new String("SELECT ");
    for (String var : this.objectVars) {
      select += " ?" + var;
    }
    for (String var : this.dataVars) {
      select += " ?" + var;
    }
    return select;
  }

  private String getQueryTriples() {

    String queryTriples = new String("");
    for (String[] triple : this.dataTriples) {
      queryTriples += "?" + triple[0] + " ?" + triple[1] + " ?"
          + triple[2] + " . \n" ;
    }
    for (String[] triple : this.objectTriples) {
      queryTriples += "?" + triple[0] + " ?" + triple[1] + " ?"
          + triple[2] + " . \n" ;
    }
    return queryTriples;
  }

  private String getPredicateFilter() {

    String filters = new String();
    for (String key : this.predicateMap.keySet()) {
      filters += "FILTER ( ?" + key + " = " + this.predicateMap.get(key)
          + " )  . \n";
    }
    return filters;
  }

  private String getInputFilter() {

    String filters = new String();
    for (String key : this.inputs) {
      filters += "FILTER ( ?" + key + " = <" + this.vreq.getParameter(key)
          + "> )  . \n";
    }
    return filters;
  }
}
