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
    
    case "literal" : 
      
      String[] inputParam0 = { "subject", "predicate" };
      String[] uris0 = {};
      String[] literals0 = { "object" };
      
      result = this.performQuery(Query, inputParam0, uris0, literals0);
      break;
      
    case "object":
      String[] inputParam1 = { "individual", "predicate"};
      String[] uris1 = {"object"};
      String[] literals1 = { "label" };

      result = this.performQuery(Query, inputParam1, uris1, literals1);
      break;
    case "coherentBones":
      String[] inputParam = { "skeletalInventory" };
      String[] uris = { "boneDivision", "type" };
      String[] literals = { "boneOrganCount", "label" };
      result = this.performQuery(CoherentQuery, inputParam, uris, literals);
      break;
    case "boneOrgans" :
      String[] inputParam2 = { "boneDivision" };
      String[] uris2 = {"boneOrgan", "type", "completenessState"};
      String[] literals2 = {"typeLabel", "completenessLabel"};
      result = this.performQuery(BoneOrganQuery, inputParam2, uris2, literals2);
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

  private List<Map<String, String>> performQuery(String query,
    String[] inputParam, String[] uris, String[] literals) {

    String readyQuery = new String();
    ResultSet resultSet;
    Map<String, String> queryVars = new HashMap<String, String>();

    readyQuery = N3Utils.setPrefixes(null, query);
    readyQuery = N3Utils.subInputUriQuery(readyQuery, inputParam, this.vreq);
    log.info(readyQuery);
    resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
    return QueryUtils.getQueryVars(resultSet, uris, literals);
  }

  private static String Query = "" + " SELECT ?object \n" + " WHERE \n "
      + "   {  \n"
      + "    ?subject    ?predicate   ?object . \n"
      + "   }  \n";

  private static String CoherentQuery =
      ""
          + "SELECT ?boneDivision ?label ?type (COUNT(?boneOrgan) as ?boneOrganCount) \n"
          + " WHERE \n " + "   { "
          + "    ?skeletalInventory obo:BFO_0000051  ?completeness . \n"
          + "    ?completeness    obo:IAO_0000136       ?boneSegment . \n"
          + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
          + "    ?boneOrgan       obo:systemic_part_of  ?boneDivision  . \n"
          + "    ?boneDivision    rdfs:label            ?label . \n"
          + "    ?boneDivision    vitro:mostSpecificType   ?type .  \n"
          + "   } GROUP BY ?boneDivision ?label ?type \n";

  private static String BoneOrganQuery =
      ""
          + "SELECT ?boneOrgan ?typeLabel ?type ?completenessState ?completenessLabel \n"
          + " WHERE \n " 
          + "   { "
          + "    ?boneOrgan       obo:systemic_part_of  ?boneDivision  . \n"
          + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
          + "    ?completeness    obo:IAO_0000136       ?boneSegment . \n"
          + "    ?completeness    obo:OBI_0000999       ?completenessState . \n" 
          + "    ?completenessState    rdfs:label       ?completenessLabel . \n"  
          + "    ?boneOrgan       vitro:mostSpecificType ?type .  \n"
          + "    ?type            rdfs:label            ?typeLabel . \n" 
          + " } ";
}
