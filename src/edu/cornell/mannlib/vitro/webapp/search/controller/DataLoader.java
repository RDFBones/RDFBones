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
    
    log.info("itt");
    switch (vreq.getParameter("queryType")) {

    case "coherentBones":
      String[] inputParam = {"inputClassUri"};
      String[] uris = {"inputClass", "boneDivision", "subClass"};
      String[] literals = {"inputClassLabel", "boneDivisionLabel", "subClassLabel"};
      
      result = this.performQuery(CoherentQuery, inputParam, uris, literals);
      break;

    default:
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
  

  private static String[] BoneQueryInputUris = { "skeletalInventory" };
  private static String[] BoneQueryUris = { "boneUri", "completeness",
      "classUri" };
  private static String[] BoneQueryLiterals = { "label", "description", "classLabel"};

  private static String[] CoherentQueryPrefixes = { "obo", "rdfs", "rdfbones",
      "rdf", "vitro" };
  
  
  private static String CoherentQuery = ""
      + "SELECT ?boneDivision (COUNT(?boneOrgan) as ?boneOrganCount) \n"
      + " WHERE \n "  
      + "   { "
      + "    ?completeness    obo:BFO_0000050       ?skeletalInventory . \n"
      + "    ?completeness    obo:IAO_0000136       ?boneSement . \n"
      + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
      + "    ?boneOrgan       obo:systemic_part_of  ?boneDivision  . \n"
      + "   } GROUP BY ?boneDivision \n";

}