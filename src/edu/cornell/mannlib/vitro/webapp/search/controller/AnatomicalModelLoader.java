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

public class AnatomicalModelLoader extends VitroAjaxController {

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

    case "systemicParts":
      String[] inputParam = {"classUri"};
      String[] uris = {"inputClass", "boneDivision", "subClass"};
      String[] literals = {"inputClassLabel", "boneDivisionLabel", "subClassLabel"};
      
      result = this.performQuery(systemicQuery, inputParam, uris, literals);
      break;
    case "subClasses" :
      String[] inputParam1 = {"classUri"};
      String[] uris1 = { "boneDivision", "systemicPart"};
      String[] literals1 ={ "boneDivisionLabel", "systemicPartLabel"};
      
      result = this.performQuery(subClassesQuery, inputParam1, uris1, literals1);
      
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
  
  private static String systemicQuery =
      "select ?inputClass ?inputClassLabel ?boneDivision ?boneDivisionLabel ?subClass ?subClassLabel "
          + "  where {  "
          + "  ?boneDivision          rdfs:label             ?boneDivisionLabel ."
          + "  ?boneDivision          rdfs:subClassOf        ?restriction .  "
          + "  ?restriction           owl:onProperty         <http://purl.obolibrary.org/obo/fma#systemic_part_of>   .  "
          + "  ?restriction           owl:someValuesFrom     ?inputClass .   "
          + "  ?inputClass            rdfs:label            ?inputClassLabel . " 
          + "  ?subClass              rdfs:subClassOf        ?boneDivision ."
          + "  ?subClass              rdfs:label             ?subClassLabel ."
          + "  FILTER( ?inputClass  =  ?classUri ) ."
          + "}"
          ;

  private static String subClassesQuery =
      "select ?boneDivision ?boneDivisionLabel ?systemicPart ?systemicPartLabel "
          + "  where {  "
          + "  ?boneDivision           rdfs:subClassOf         ?inputClass . "
          + "  ?inputClass             rdfs:label              ?inputLabel . " 
          + "  ?boneDivision           rdfs:label              ?boneDivisionLabel . "
          + "  ?systemicPart           rdfs:label              ?systemicPartLabel . "
          + "  ?systemicPart           rdfs:subClassOf         ?restriction .   "
          + "  ?restriction            owl:onProperty          <http://purl.obolibrary.org/obo/fma#systemic_part_of> .  "
          + "  ?restriction            owl:someValuesFrom      ?boneDivision ."
          + "  FILTER( ?inputClass  =  ?classUri ) . "
          + "  }";

}