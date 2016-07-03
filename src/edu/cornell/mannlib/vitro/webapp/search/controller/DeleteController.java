package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import edu.cornell.mannlib.vitro.webapp.config.DeleteBoneOrgan;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DeleteController extends VitroAjaxController {

 
  public List<String[]> dataTriples;
  public List<String[]> objectTriples;
  public String[] inputs;
  public Map<String, String> predicateMap;
  private VitroRequest vreq;
  private static final Log log = LogFactory.getLog(DeleteController.class);

  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse resp)
    throws ServletException, IOException {
    // TODO Auto-generated method stub
    
    this.vreq = vreq;
    log.info("DeleteController");
    
    log.info(vreq.getParameter("operation"));
    switch(vreq.getParameter("operation")) {
    
    case "deleteBoneOrgan" :
        log.info("inside");
        this.objectTriples = DeleteBoneOrgan.getObjectTriples();
        log.info("1");
        this.dataTriples = DeleteBoneOrgan.getDataTriples();
        log.info("2");
        this.predicateMap = DeleteBoneOrgan.predicateMap;
        log.info("3");
        this.inputs = DeleteBoneOrgan.inputs;
        break;
     default : 
         break;
    }
    
    List<Map<String, String>> result = performQuery();
    log.info("after");
    
    JSONObject obj = new JSONObject();
    try {
      obj.append("noResult", true);
    } catch (JSONException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    resp.getWriter().write(obj.toString());
  }
  
  private List<Map<String, String>> performQuery(){
    
    String query = this.generateQuery();
    log.info(query);
    
    return null;
  }
  
  private String generateQuery() {

    String select = this.getSelect();
    String where1 = new String("\n  WHERE { \n");
    String queryTriples = this.getQueryTriples();
    String predicateFilters = this.getPredicateFilter();
    String objectFilters = this.getInputFilter();
    String where2 = new String("\n } \n");

    log.info("generateQueryAfter");
    
    select = select.concat(where1).concat(queryTriples).concat(predicateFilters)
        .concat(objectFilters).concat(where2);
    return select;
  }
  
  private String getSelect() {

    ArrayList<String> variable = new ArrayList<String>();
    for (String[] triple : this.dataTriples) {
      for (String var : triple) {
        if (!variable.contains(var)) {
          variable.add(var);
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
    String select = new String("SELECT ");
    for (String var : variable) {
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
