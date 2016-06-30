package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.hp.hpl.jena.query.ResultSet;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;

public class PageDataLoader extends VitroAjaxController {

  
  VitroRequest vreq;
  
  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

      this.vreq = vreq;
      List<Map<String, String>> result = new ArrayList<Map<String, String>>();
            switch (vreq.getParameter("configType")) {
        
      case "pageElements" : 
            
          String[] inputParam = {"subject"};
          String[] uris = {"pageElement", "?type"};
          String query = 
            "SELECT ?pageElement  ?type" 
            +   " WHERE {  "
            +   "  ?subject       sw:pageElement             ?pageElement . "
            +   "  ?pageElement   vitro:mostSpecificType     ?type ." 
            +   " }  ";  
          result = this.performQuery(query, inputParam, uris, null);
          break;
      case "tabs" : 
        
        String[] tabInputParam = {"subject"};
        String[] tabUris = {"tab", "?type"};
        String[] tabLiterals = {"tabTitle"};
        
        String tabQuery = 
          "SELECT ?tab  ?type ?tabTitle" 
          +   " WHERE {  "
          +   "  ?subject     sw:tab                     ?tab . "
          +   "  ?tab         vitro:mostSpecificType     ?type ." 
          +   "  ?tab         sw:tabTitle                ?tabTitle ."        
          +   " }  ";  
        
        result = this.performQuery(tabQuery, tabInputParam, tabUris, tabLiterals);
        break;         
      
      case "elements" : 
        
        String[] tabElementInputParam = {"subject"};
        String[] tabElementUris = {"element", "type"};
        String[] tabElementLiterals = {"dataKey"};
        
        String tabElementQuery = 
          "SELECT ?tabElement ?type ?dataKey" 
          +   " WHERE {  "
          +   "  ?subject         sw:contains               ?element . "
          +   "  ?element         vitro:mostSpecificType    ?type ."
          +   "  OPTIONAL     { ?tabElement  sw:dataKey  ?dataKey} ." 
          +   " }  ";  
        
        result = this.performQuery(tabElementQuery, tabElementInputParam, tabElementUris, tabElementLiterals);
        break;
        
      case "dataFields" : 
        
        String[] dataFieldInputParam = {"subject"};
        String[] dataFieldUris = {"dataField", "type"};
        String[] dataFieldLiterals = {"dataKey"};
        
        String dataFieldQuery = 

        "SELECT ?uri ?type ?dataKey" 
          +   " WHERE {  "
          +   "  ?subject        sw:contains               ?dataField . "
          +   "  ?dataField      vitro:mostSpecificType    ?type ."
          +   "  OPTIONAL        { ?dataFields    sw:dataKey        ?dataKey} ." 
          +   " }  ";  
        
        result = this.performQuery(dataFieldQuery, dataFieldInputParam, dataFieldUris, dataFieldLiterals);
        break; 
      }
      
      if (result.size() > 0) {
        JSONArray arrayToSend = new JSONArray();
        N3Utils.setJsonArray(arrayToSend, result);
        response.getWriter().write(arrayToSend.toString());
      } else {
        JSONObject obj = new JSONObject();
        try {
          obj.append("noResult", "true");
        } catch (JSONException e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
        }
        response.getWriter().write(obj.toString());
      }
    }
    
    private List<Map<String, String>> performQuery(String query, String[] inputParam,
        String[] uris, String[] literals){
      
      String readyQuery = new String();
      ResultSet resultSet;
      Map<String, String> queryVars = new HashMap<String, String>();
      
      readyQuery = N3Utils.setPrefixes(null, query);
      readyQuery =
          N3Utils.subInputUriQuery(readyQuery,
              inputParam, this.vreq);  
      resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
      return QueryUtils.getQueryVars(resultSet, uris, null);
    }
  
  
}
