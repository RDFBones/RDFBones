package rdfbones.formProcessing;

import java.io.IOException;
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

import rdfbones.lib.JSON;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.PropertyInstanceDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class FormDataLoader extends VitroAjaxController {

  public static final String PARAMETER_UPLOADED_FILE = "datafile";

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(ExistingFormDataLoader.class);

  private DataPropertyStatementDao dataDao;
  private ObjectPropertyStatementDao objectDao;
  private PropertyInstanceDao propDao;

  VitroRequest vreq;
  
  private static Map<String, String> prefixDef = new HashMap<String, String>();

  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    this.vreq = vreq;
    JSONObject json = new JSONObject();
    try {
      json = responseFunction(vreq);
    } catch (JSONException e1) {
      // TODO Auto-generated catch block
      e1.printStackTrace();
    }
    response.getWriter().write(json.toString());
  }

  public JSONObject responseFunction(VitroRequest vreq) throws JSONException {

    JSONArray requestData = new JSONArray(vreq.getParameter("requestData"));
    String query = new String("");
    JSONObject response = new JSONObject();
    for (int i = 0; i <  requestData.length(); i++) {
      JSONObject obj = JSON.object(requestData, i);
      switch (JSON.string(obj, "varToGet")) {
      case "measurementDatumType" :
        query = measurementTypeQuery.replace("?assayValue", JSON.string(obj, "assayType"));
        JSONArray array1 = QueryUtils.getJSON(performQuery(query));
        response.put("measurementDatumType", array1);
        break;
      case "boneSegment" :
        query = boneSegmentQuery.replace("?assayValue", JSON.string(obj, "assayType"));
        JSONArray array2 = QueryUtils.getJSON(performQuery(query));
        response.put("boneSegment", array2);
        break;
      }
    }
    return response;
  }

  EditConfigurationVTwo getEditConfig(VitroRequest vreq, String editKey) {
    return EditConfigurationVTwo.getConfigFromSession(vreq.getSession(), editKey);
  }

  private List<Map<String, String>> performQuery(String query) {

      log.info(query);
      String[] uris = { "uri" };
      String[] literals = {"label"};
      query = N3Utils.setPrefixes(null, query);
      ResultSet resultSet = QueryUtils.getQueryResults(query, vreq);
      return QueryUtils.getQueryVars(resultSet, uris, literals);
    }
  
  String measurementTypeQuery = "" 
      + "SELECT DISTINCT ?uri ?label " 
      + "WHERE { "
      + "  ?assayType rdfs:subClassOf ?R_subjectType_0 . "
      + "  ?R_subjectType_0 owl:onProperty obo:OBI_0000299 . "
      + "  ?R_subjectType_0 owl:hasValue ?uri ."
      + "  ?uri  rdfs:subClassOf obo:OBI_0000938 ."
      + "  OPTIONAL { ?uri  rdfs:label ?label . } "
      + "  FILTER ( ?assayType = <?assayValue> ) . " 
      + " } ";

  String boneSegmentQuery =
      ""
          + "SELECT DISTINCT ?uri ?label \n"
          + "WHERE { \n"
          + "    #?boneSegment              obo:regional_part_of        ?uri    . \n"
          + "    ?uri                       rdf:type                    ?boneOrganClass . \n"
          + "    ?uri                       rdfs:label                  ?label . \n"
          + "    ?restriction1              owl:someValuesFrom          ?boneOrganClass . \n"
          + "    ?restriction1              owl:onProperty              <http://purl.obolibrary.org/obo/fma#constitutional_part_of>  .    \n"
          + "    ?bonyPart                  rdfs:subClassOf             ?restriction1 . \n"
          + "    ?restriction               owl:allValuesFrom           ?bonyPart  . \n"
          + "    ?restriction               owl:onProperty              <http://purl.obolibrary.org/obo/fma#regional_part_of> . \n"
          + "    ?entireBone                rdfs:subClassOf             ?restriction  . \n"
          + "    ?restriction2              owl:hasValue                ?entireBone . \n"
          + "    ?restriction2              owl:onProperty              obo:OBI_0000293  . \n"
          + "    ?specimenCollectionProcess rdfs:subClassOf             ?restriction2  . \n"
          + "    ?assayType                 rdfs:subClassOf             ?R_assayType_0 . \n"
          + "    ?R_assayType_0             owl:onProperty              obo:OBI_0000293 .\n"
          + "    ?R_assayType_0             owl:hasValue                ?specimenType. \n"
          + "    ?specimenCollectionProcess rdfs:subClassOf             ?SCP_restriction.\n "
          + "    ?SCP_restriction           owl:onProperty              obo:OBI_0000299 . \n"
          + "    ?SCP_restriction           owl:hasValue                ?specimenType .  \n"
          + "    ?specimenCollectionProcess rdfs:subClassOf             obo:OBI_0000659 . \n"
          + "    ?specimenType              rdfs:subClassOf             obo:OBI_0100051. \n"
          + "    FILTER ( ?assayType = <?assayValue> ) . " + " }";

}