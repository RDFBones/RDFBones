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
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class SkeletalInventoryQueryController extends VitroAjaxController {

  private static final Log log = LogFactory.getLog(SkeletalInventoryQueryController.class);

    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {
        
        log.info("Data");
        Map<String,String> queryVars = new HashMap<String,String>();
        List<Map<String, String>> result = new ArrayList<Map<String,String>>();
        String readyQuery = new String();
        ResultSet resultSet;
        switch(vreq.getParameter("dataOperation")){
        
              case "coherent" :
                  //Add the query with prefixes
                  log.info("coherent1");
                  readyQuery = N3Utils.setPrefixes(CoherentQueryPrefixes, CoherentQuery);
                  log.info("coherent2");
                  readyQuery = N3Utils.subInputUriQuery(
                              readyQuery, BoneQueryInputUris , vreq);
                  log.info(readyQuery);
                  resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
                  log.info("coherent4");
                  result = QueryUtils.getQueryVars(resultSet, BoneQueryUris, BoneQueryLiterals);
                  log.info("coherent5");
                  break;
              case "single" :
                  readyQuery = N3Utils.setPrefixes(SingleQueryPrefixes, SingleQuery);
                  readyQuery = N3Utils.subInputUriQuery(
                              readyQuery, BoneQueryInputUris, vreq);
                  resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
                  result = QueryUtils.getQueryVars(resultSet, BoneQueryUris, BoneQueryLiterals);
                  break;   
              case "systemicParts" : 
                  readyQuery = N3Utils.setPrefixes(SystemicPartsQueryPrefixes, SystemicPartsQuery);
                  readyQuery = N3Utils.subInputUriQuery(
                            readyQuery, SystemicPartsQueryInputs, vreq);
                  log.info(readyQuery);
                  resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
                  result = QueryUtils.getQueryVars(resultSet, SystemicPartsQueryUris, SystemicPartsQueryLiterals);
                  log.info("Result");
                  log.info(result.toString());
                  break;   
              case "images" :
                log.info("images");
                readyQuery = N3Utils.setPrefixes(ImagesQueryPrefixes, ImagesQuery);
                readyQuery = N3Utils.subInputUriQuery(
                          readyQuery, ImagesQueryInputs, vreq);
                resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
                result = QueryUtils.getQueryVars(resultSet, ImagesQueryUris, ImagesQueryLiterals);
                log.info("Result");
                log.info(result.toString());
              case "imagesToOffer" :
                log.info("imagesToOffer");
                readyQuery = N3Utils.setPrefixes(ImageOfferQueryPrefixes, ImageOfferQuery);
                log.info("prefixes Are set");
                readyQuery = N3Utils.subInputUriQuery(
                          readyQuery, ImageOfferQueryInputs, vreq);
                log.info("sub Are set");
                log.info(readyQuery);
                resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
                log.info("resultSet");
                result = QueryUtils.getQueryVars(resultSet, ImageOfferQueryUris, ImageOfferQueryLiterals);
                log.info("Result");
                log.info(result.toString());  
              break;   
       }
        
       if(result.size() > 0){
         JSONArray arrayToSend = new JSONArray();
         N3Utils.setJsonArray(arrayToSend, result);
         log.info(arrayToSend);  
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
      
    private static String[] BoneQueryInputUris = {"skeletalInventory"};
    private static String[] BoneQueryUris = {"boneUri", "completeness", "classUri"};
    private static String[] BoneQueryLiterals = {"label", "description"};
    
    private static String[] CoherentQueryPrefixes = {"obo", "rdfs", "rdfbones", "rdf", "vitro"};
    private static String CoherentQuery = ""
              + "SELECT ?boneUri ?classUri ?completeness ?label ?description "
              + " WHERE { "
              + "   ?boneUri  vitro:mostSpecificType ?classUri ."
              + "   { "  
              + "    ?completeness    obo:BFO_0000050   ?skeletalInventory ."
              + "    ?completeness    obo:IAO_0000136   ?boneUri . "
              + "    ?boneUri  rdfs:label  ?label  . \n"
              + "    OPTIONAL { ?boneUri  rdfbones:description  ?description  .  } "
              + "    ?boneUri rdf:type <http://purl.obolibrary.org/obo/FMA_53672> . "
              + "   }  UNION { "
              + "    ?completeness    obo:BFO_0000050   ?skeletalInventory . "
              + "    ?completeness    obo:IAO_0000136   ?boneUri . "
              + "    ?boneUri  rdfs:label  ?label  . "
              + "    OPTIONAL { ?boneUri  rdfbones:description  ?description . } "
              + "    ?boneUri rdf:type <http://purl.obolibrary.org/obo/FMA_53673> . "
              + "   }" 
              + "} "; 
      
      private static String[] SingleQueryPrefixes = {"obo", "rdfs", "rdfbones", "rdf", "vitro"};
      private static String SingleQuery = ""
            + "SELECT  ?boneUri ?classUri ?completeness ?label ?description"
            + " WHERE { \n"
            + "    ?completeness    obo:BFO_0000050   ?skeletalInventory ."
            + "    ?completeness    obo:IAO_0000136   ?boneUri . "
            + "    ?boneUri  rdfs:label  ?label  . "
            + "    ?boneUri  vitro:mostSpecificType  ?classUri ."  
            + "    OPTIONAL { ?boneUri  rdfbones:description  ?description  . } "
            + " FILTER NOT EXISTS { ?boneUri rdf:type <http://purl.obolibrary.org/obo/FMA_53672> } ."
            + " FILTER NOT EXISTS { ?boneUri rdf:type <http://purl.obolibrary.org/obo/FMA_53673> } ."
            + "} "; 
      
      private static String[] SystemicPartsQueryInputs = {"parentUri"};
      private static String[] SystemicPartsQueryUris = {"boneUri", "classUri"};
      private static String[] SystemicPartsQueryLiterals = {"label", "description"};
      private static String[] SystemicPartsQueryPrefixes = {"obo", "rdfs", "rdfbones", "vitro"};
      
      private static String SystemicPartsQuery = ""
          + "SELECT ?boneUri ?classUri ?label ?description "
          + " WHERE { "
          + "    ?boneUri    obo:systemic_part_of  ?parentUri . "
          + "    ?boneUri  rdfs:label  ?label  . "
          + "    ?boneUri  vitro:mostSpecificType  ?classUri ."  
          + "    OPTIONAL { ?boneUri  rdfbones:description  ?description  . } "
          + "} "; 
      
      
      private static String[] ImagesQueryInputs = {"boneUri"};
      private static String[] ImagesQueryUris = {};
      private static String[] ImagesQueryLiterals = {"downloadLocation"};
      private static String[] ImagesQueryPrefixes = {"vitro-public", "rdfbones"};
      
      private static String ImagesQuery = ""
              + "SELECT  ?downloadLocation "
              + " WHERE { \n"
              + "    ?boneUri    rdfbones:isDepicted   ?image ."
              + "    ?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual ."
              + "    ?fileIndividual vitro-public:filename ?filename ."
              + "    ?fileIndividual vitro-public:mimeType ?mimeType ."
              + "    ?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual ."
              + "    ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLocation . "
              + "   } "; 
     
      private static String[] ImageOfferQueryInputs = {"subject"};
      private static String[] ImageOfferQueryUris = {"image"};
      private static String[] ImageOfferQueryLiterals = {"dl", "label"};
      private static String[] ImageOfferQueryPrefixes = {"vitro-public", "rdfbones", "bibo", "rdf"};
      
      private static String ImageOfferQuery = ""
              + "SELECT ?image (SAMPLE (?downloadLocation) as ?dl) (SAMPLE (?lab) as ?label)  "
              + " WHERE { \n"
              + "    ?image rdf:type bibo:Image ."
              + "    ?image rdfs:label  ?lab ."
              + "    ?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual ."
              + "    ?fileIndividual vitro-public:filename ?filename ."
              + "    ?fileIndividual vitro-public:mimeType ?mimeType ."
              + "    ?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual ."
              + "    ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLocation . "
              + "    FILTER NOT EXISTS { ?subject    rdfbones:isDepiceted  ?image }"
              + "   } GROUP BY ?image"; 
}

