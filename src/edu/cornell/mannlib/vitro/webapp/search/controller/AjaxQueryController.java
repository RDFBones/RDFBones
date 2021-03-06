package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.ArrayUtils;
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

/**
 * AutocompleteController generates autocomplete content via the search index.
 */

public class AjaxQueryController extends VitroAjaxController {

  private static final Log log = LogFactory.getLog(AjaxQueryController.class);

  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    Map<String, String> queryVars = new HashMap<String, String>();
    List<Map<String, String>> result = new ArrayList<Map<String, String>>();
    String readyQuery = new String();
    ResultSet resultSet;
    switch (vreq.getParameter("dataOperation")) {

    case "getObject":
      readyQuery = N3Utils.setPrefixes(null, query);
      readyQuery = N3Utils.subInputUriQuery(readyQuery, subject, vreq);
      readyQuery = N3Utils.subPredicateUriQuery(readyQuery, predicate, vreq);
      resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
      result = QueryUtils.getQueryVars(resultSet, object, null);
      break;
    case "getLiteral":
      readyQuery = N3Utils.setPrefixes(null, query);
      readyQuery = N3Utils.subInputUriQuery(readyQuery, subject, vreq);
      readyQuery = N3Utils.subPredicateUriQuery(readyQuery, predicate, vreq);
      log.info(readyQuery);
      resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
      result = QueryUtils.getQueryVars(resultSet, null, object);

      break;

    case "imagesOfNotIndividual":

      readyQuery = N3Utils.setPrefixes(null, ImagesOfNOTIndividualQuery);
      log.info("prefixes Are set");
      readyQuery =
          N3Utils.subInputUriQuery(readyQuery,
              ImagesOfNOTIndividualQueryInputs, vreq);
      resultSet = QueryUtils.getQueryResults(readyQuery, vreq);

      result =
          QueryUtils.getQueryVars(resultSet, ImagesOfNOTIndividualQueryUris,
              ImagesOfNOTIndividualQueryLiterals);
      
      break;
    case "imagesOfIndividual":
      readyQuery = N3Utils.setPrefixes(null, ImagesOfIndividualQuery);
      readyQuery =
          N3Utils.subInputUriQuery(readyQuery, ImagesOfIndividualQueryInputs,
              vreq);
      resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
      result =
          QueryUtils.getQueryVars(resultSet, ImagesOfIndividualQueryUris,
              ImagesOfIndividualQueryLiterals);
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

  private static String[] subject = { "subject"};
  private static String[] predicate = { "predicate"};
  private static String[] object = { "object" };

  private static String query = "" + "SELECT  ?object "
      + " WHERE { \n" + "    ?subject   ?predicate   ?object . " + "   } ";


  private static String[] ImagesOfIndividualQueryInputs = { "subject" };
  private static String[] ImagesOfIndividualQueryUris = {};
  private static String[] ImagesOfIndividualQueryLiterals =
      { "downloadLocation" };

  private static String ImagesOfIndividualQuery =
      ""
          + "SELECT  ?downloadLocation "
          + " WHERE { \n"
          + "    ?subject    rdfbones:isDepicted   ?image ."
          + "    ?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual ."
          + "    ?fileIndividual vitro-public:filename ?filename ."
          + "    ?fileIndividual vitro-public:mimeType ?mimeType ."
          + "    ?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual ."
          + "    ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLocation . "
          + "   } ";

  private static String[] ImagesOfNOTIndividualQueryInputs = { "subject" };
  private static String[] ImagesOfNOTIndividualQueryUris = { "image" };
  private static String[] ImagesOfNOTIndividualQueryLiterals =
      { "dl", "label" };

  private static String ImagesOfNOTIndividualQuery =
      ""
          + "SELECT ?image (SAMPLE (?downloadLocation) as ?dl) (SAMPLE (?lab) as ?label)  "
          + " WHERE { \n"
          + "    ?image rdf:type bibo:Image ."
          + "    OPTIONAL { ?image rdfs:label  ?lab } ."
          + "    OPTIONAL {"
          + "       ?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual ."
          + "       ?fileIndividual vitro-public:filename ?filename ."
          + "       ?fileIndividual vitro-public:mimeType ?mimeType ."
          + "       ?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual ."
          + "       ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLocation . "
          + "    }"
          + "    FILTER NOT EXISTS { ?subject  rdfbones:isDepicted  ?image }"
          + "   } GROUP BY ?image";
}
