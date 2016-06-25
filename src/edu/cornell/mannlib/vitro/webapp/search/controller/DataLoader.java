package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;
import java.util.ArrayList;
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

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;

public class DataLoader extends VitroAjaxController {

  private static final Log log = LogFactory
      .getLog(PageConfigurationLoader.class);

  VitroRequest vreq;

  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    List<Map<String, String>> result = new ArrayList<Map<String, String>>();
    this.vreq = vreq;
    
    switch (vreq.getParameter("queryType")) {
    
    case "coherentBones":
      String[] inputParam = {"skeletalInventory"};
      String[] uris = {"boneDivision", "type"};
      String[] literals = {"boneOrganCount", "label"};
      
      result = this.performQuery(CoherentQuery, inputParam, uris, literals);
      break;

    default:
    case "label":
      String[] inputParam1= {"individual"};
      String[] uris1 = {};
      String[] literals1 = {"label"};
      
      result = this.performQuery(LabelQuery, inputParam1, uris1, literals1);
      break;

    }
    log.info(result.toString());
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
    log.info(readyQuery);
    resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
    return QueryUtils.getQueryVars(resultSet, uris, literals);
  }
  
  private static String LabelQuery = ""
      + " SELECT ?label \n"
      + " WHERE \n "
      + "   {  \n"
      + "    ?individual    rdfs:label   ?label . \n"
      + "   }  \n";
  
  private static String CoherentQuery = ""
      + "SELECT ?boneDivision ?label ?type (COUNT(?boneOrgan) as ?boneOrganCount) \n"
      + " WHERE \n "
      + "   { "
      + "    ?skeletalInventory obo:BFO_0000051  ?completeness . \n"
      + "    ?completeness    obo:IAO_0000136       ?boneSegment . \n"
      + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
      + "    ?boneOrgan       obo:systemic_part_of  ?boneDivision  . \n"
      + "    ?boneDivision    rdfs:label            ?label . \n"
      + "    ?boneDivision    vitro:mostSpecificType   ?type .  \n"  
      + "   } GROUP BY ?boneDivision ?label ?type \n";
}