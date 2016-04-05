package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.Resource;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.VitroVocabulary;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;

/**
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class SkeletalInventoryController extends VitroAjaxController {

    private static final long serialVersionUID = 1L;
    private static final Log log = LogFactory.getLog(SkeletalInventoryController.class);
    
    private static final String TERM = "term";
    private static final String TYPE = "type";
    
    private static final String SUB = "subject";
    private static final String PRED = "predicate";
	  
    private static final String[] boneQueryUris = {"skeletalRegion"};
    private static final String[] boneQueryLiterals = {"label", "descriptin"};

    private static final String[] imageQueryUris = {"image"};
    private static final String[] imageQueryLiterals = {"src"};
    
    private static final String[] systemicQueryUris = {"systemicPart"};
    private static final String[] systemicQueryLiterals = {"label", "descriptin"};

    private static final String[] boneNewUris = {"completeNess" , "skeletalRegion"};
    private static final String[] systemicNewUris = {"label", "descriptin"};
    
    private static String prefix = "http://w3id.org/rdfbones/core";
    
    
    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {
        
      log.info("Request Arrived");
        JSONObject jsonObj = new JSONObject();
        try {
          jsonObj.put("value", "test");
        } catch (JSONException e1) {
          // TODO Auto-generated catch block
          e1.printStackTrace();
        }
        response.getWriter().write(jsonObj.toString());  
    	  /*
    	  Map<String,String> queryVars = new HashMap<String,String>();
        List<Map<String, String>> result;
        String[] uris = new String[5];
        String[] literals = new String[5];
        String readyQuery = new String();
        if(vreq.getParameter("dataOperation") == "query"){
          switch(vreq.getParameter("type")){
          case "getCoherent" :
              uris = boneQueryUris;
              literals = boneQueryLiterals;
              readyQuery = QueryUtils.subUriForQueryVar(CoherentBones, 
                  "skeletalInventory",  vreq.getParameter("skeletalInventory"));
              break;
          case "getSingle" :
            uris = boneQueryUris;
            literals = boneQueryLiterals;
            readyQuery = QueryUtils.subUriForQueryVar(SingleBones, 
                "skeletalInventory",  vreq.getParameter("skeletalInventory"));
            break;  
          case "getSystemicParts" :
            uris = systemicQueryUris;
            literals = systemicQueryLiterals;
            readyQuery = QueryUtils.subUriForQueryVar(ImageQuery, 
                "skeletalInventory",  vreq.getParameter("boneUri"));
            break; 
          case "getImages" :
            uris = imageQueryUris;
            literals = imageQueryLiterals;
            readyQuery = QueryUtils.subUriForQueryVar(ImageQuery, 
                "skeletalInventory",  vreq.getParameter("boneUri"));
            break;        
         }
          ResultSet resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
          result = QueryUtils.getQueryVars(resultSet, uris, literals);
          JSONArray arrayToSend = new JSONArray();
          //setJsonArray(arrayToSend, result);
 
          
          
         } else {
           NewURIMaker newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());
           try {
             newUri.getUnusedNewURI(prefix);
           } catch (InsertException e) {
             // TODO Auto-generated catch block
             e.printStackTrace();
           }
           
          String[] newUris = new String[2];
          String triples = new String();
          Map<String,String> inputMap = new HashMap<String,String>();

          //Creating or modifying triples 
          switch(vreq.getParameter("type")){
          case "newBone" :
              newUris = boneNewUris;
              inputMap.put("classUri", vreq.getParameter("classUri"));
              inputMap.put("skeletalInventory", vreq.getParameter("skeletalInventory"));
              triples = boneTriples;
              break;
          case "newSystemicPart" :
              newUris = systemicNewUris;
              inputMap.put("classUri", vreq.getParameter("classUri"));
              inputMap.put("boneUri", vreq.getParameter("boneUri"));
              triples = systemicTriples;
              break;          
          case "editLabel" :
            break;        
          case "editDesciption" :
            break;
          case "addImg" :
            break;
          default : break;
         }
        }
        */
     }
    
    private static String labelTriple = ""
        + "?skeletalRegion rdfs:label  ?label . ";

    private static String descriptionTriple = ""
        + "?skeletalRegion rdfbones:description  ?description . ";
    
     private static String boneTriples = ""
         + "?completeNess obo:BFO_0000050  ?skeletalInventory ."
         + "?completeNess obo:IAO_0000136  ?skeletalRegion  ."
         + "?skeletalRegion  rdf:type     ?classUri . "
         + "?skeletalRegion rdfs:label  'Default Label' . ";
     
     private static String systemicTriples = ""
         + "?boneUri     obo:systemic_part_of   ?newBone . "
         + "?newBone  rdf:type    ?classUri   . "
         + "?newBone  rdfs:label    'Default Label'  . ";

     private static String imageTriples = ""
         + "    ?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual ."
         + "    ?fileIndividual vitro-public:filename ?filename ."
         + "    ?fileIndividual vitro-public:mimeType ?mimeType ."
         + "    ?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual ."
         + "    ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLoc . ";
    
   private void setJsonArray(JSONArray arr, List<Map<String, String>> results){
       JSONArray jsonArray = new JSONArray();
       for(Map<String, String> result : results){
           JSONObject jsonObj = new JSONObject();
           for (String key : result.keySet()) {
             try {
              jsonObj.put(key, result.get(key));
             } catch (JSONException e) {
              // TODO Auto-generated catch block
              e.printStackTrace();
            }
           }
           jsonArray.put(jsonObj);
        }
    }
      private static String CoherentBones = ""
          + "PREFIX vitro: <" + VitroVocabulary.vitroURI + "> \n" 
              + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
              + "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
              + "PREFIX obo:      <http://purl.obolibrary.org/obo/> \n"
              + "PREFIX rdfbones:  <http://w3id.org/rdfbones/core#>  \n" 
              + "SELECT DISTINCT ?skeletalRegion ?label ?description"
              + " WHERE { \n"
              + "   { "  
              + "    ?completeNess    obo:BFO_0000050   ?skeletalInventory ."
              + "    ?completeNess    obo:IAO_0000136   ?skeletalRegion . "
              + "    ?skeletalRegion  rdfs:label  ?label  . \n"
              + "    ?skeletalRegion  rdfbones:desrition  ?description  . "
              + "    ?skeletalRegion rdf:type <http://purl.obolibrary.org/obo/FMA_53672> . "
              + "   }  UNION { "
              + "    ?completeNess    obo:BFO_0000050   ?skeletalInventory ."
              + "    ?completeNess    obo:IAO_0000136   ?skeletalRegion . "
              + "    ?skeletalRegion  rdfs:label  ?label  . "
              + "    ?skeletalRegion  rdfbones:desrition  ?description  . "
              + "    ?skeletalRegion rdf:type <http://purl.obolibrary.org/obo/FMA_53673> . "
              + "   }"  
              + "} "; 
    
      private static String SingleBones = ""
    		+ "PREFIX vitro: <" + VitroVocabulary.vitroURI + "> \n" 
            + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
            + "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
            + "PREFIX obo:      <http://purl.obolibrary.org/obo/> \n"
            + "PREFIX rdfbones:  <http://w3id.org/rdfbones/core#>  \n" 
            + "SELECT DISTINCT ?skeletalRegion ?label ?description"
            + " WHERE { \n"
            + "	   ?completeNess    obo:BFO_0000050   ?skeletalInventory .\n"
            + "    ?completeNess    obo:IAO_0000136   ?skeletalRegion . \n"
            + "    ?skeletalRegion  rdfs:label  ?label  . \n"
            + "    ?skeletalRegion  rdfbones:description  ?description  . \n"
            + " FILTER NOT EXISTS { ?skeletalRegion rdf:type <http://purl.obolibrary.org/obo/FMA_53672> } . \n"
            + " FILTER NOT EXISTS { ?skeletalRegion rdf:type <http://purl.obolibrary.org/obo/FMA_53673> } . \n"
            + "} "; 
    
      private static String ImageQuery = ""
          + "PREFIX vitro: <" + VitroVocabulary.vitroURI + "> \n" 
              + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
              + "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
              + "PREFIX obo:      <http://purl.obolibrary.org/obo/> \n"
              + "PREFIX rdfbones:  <http://w3id.org/rdfbones/core#>  \n" 
              + "SELECT DISTINCT ?skeletalRegion ?label ?description"
              + " WHERE { \n"
              + "    ?bone    rdfbones:isDepicted   ?image ."
              + "    ?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual ."
              + "    ?fileIndividual vitro-public:filename ?filename ."
              + "    ?fileIndividual vitro-public:mimeType ?mimeType ."
              + "    ?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual ."
              + "    ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLoc . "
              + "   } "; 
      


}
