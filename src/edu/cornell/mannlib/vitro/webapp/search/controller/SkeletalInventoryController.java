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

import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.rdf.model.ResourceFactory;

import edu.cornell.mannlib.vitro.webapp.application.ApplicationUtils;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.VitroVocabulary;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.MultiValueEditSubmission;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;
import edu.cornell.mannlib.vitro.webapp.filestorage.FileServingHelper;
import edu.cornell.mannlib.vitro.webapp.modules.fileStorage.FileStorage;

/**
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class SkeletalInventoryController extends VitroAjaxController {

  
    public static final String PARAMETER_UPLOADED_FILE = "datafile";

    private static final long serialVersionUID = 1L;
    private static final Log log = LogFactory.getLog(SkeletalInventoryController.class);
    
    private static final String TERM = "term";
    private static final String TYPE = "type";
    
    private static final String SUB = "subject";
    private static final String PRED = "predicate";
	  
    private static final String[] boneQueryUris = {"uri"};
    private static final String[] boneQueryLiterals = {"label", "description"};

    private static final String[] imageQueryUris = {"image"};
    private static final String[] imageQueryLiterals = {"src"};
    
    private static final String[] systemicQueryUris = {"systemicPart"};
    private static final String[] systemicQueryLiterals = {"label", "descriptin"};

    private static final String[] boneNewUris = {"completeNess" , "skeletalRegion"};
    private static final String[] systemicNewUris = {"label", "descriptin"};
    
    private static String prefix = "bone";
    
    private static Map<String, String> prefixDef = new HashMap<String, String>();
    
    
    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {
      
        prefixDef.put("rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#");
        prefixDef.put("rdfs","http://www.w3.org/2000/01/rdf-schema#");
        prefixDef.put("obo","http://purl.obolibrary.org/obo/");
        prefixDef.put("rdfbones","http://w3id.org/rdfbones/core#");
        
        //Map<String, List<FileItem>> map = vreq.getFiles();
        //List<FileItem> list = map.get(PARAMETER_UPLOADED_FILE);
        
        log.info("Arrived");
        
    	  Map<String,String> queryVars = new HashMap<String,String>();
        List<Map<String, String>> result;
        String[] uris = new String[5];
        String[] literals = new String[5];
        String readyQuery = new String();
        log.info(vreq.getParameter("dataOperation"));
        switch(vreq.getParameter("dataOperation")){
        case "query":
              switch(vreq.getParameter("type")){
                    case "coherent" :
                        log.info("Coherent");
                        uris = boneQueryUris;
                        literals = boneQueryLiterals;
                        readyQuery = QueryUtils.subUriForQueryVar(CoherentBones, 
                            "skeletalInventory",  vreq.getParameter("skeletalInventory"));
                        break;
                    case "single" :
                      log.info("single");
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
                    log.info(readyQuery);
                    ResultSet resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
                    log.info("Resultset is there");
                    log.info(resultSet);
                    result = QueryUtils.getQueryVars(resultSet, boneQueryUris, boneQueryLiterals);
                    log.info(result.toString());
                    JSONArray arrayToSend = new JSONArray();
                    setJsonArray(arrayToSend, result);
                    response.getWriter().write(arrayToSend.toString());  

                    break;
                   
        case "newData" :
           
          log.info("NewData");
          NewURIMaker newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());

          String triples = new String();
          Map<String,String> inputMap = new HashMap<String,String>();
          
          //Creating or modifying triples 
          switch(vreq.getParameter("type")){
                case "new" :
                    log.info("newData   new");
                    try {
                      inputMap.put("completeNess", newUri.getUnusedNewURI(""));
                      inputMap.put("skeletalRegion", newUri.getUnusedNewURI(""));
                      log.info("Done");
                    } catch (InsertException e) {
                      // TODO Auto-generated catch block
                      log.info("Not done");
                      e.printStackTrace();
                    }
                    inputMap.put("skeletalInventory", vreq.getParameter("skeletalInventory"));
                    inputMap.put("classUri", vreq.getParameter("classUri"));
                    triples = substituteQuery(inputMap, boneTriples);
                    break;
                case "systemic" :
                  try {
                    inputMap.put("skeletalRegion", newUri.getUnusedNewURI(""));
                    log.info("Done");
                  } catch (InsertException e) {
                    // TODO Auto-generated catch block
                    log.info("Not done");
                    e.printStackTrace();
                  }
                  inputMap.put("boneUri", vreq.getParameter("boneUri"));
                  inputMap.put("classUri", vreq.getParameter("classUri"));
                  triples = substituteQuery(inputMap, systemicTriples);
                    break;          
                default : break;
            }
          
              storeTriples(vreq, triples);
              JSONObject jsonObj = new JSONObject();
              try {
                jsonObj.put("uri", inputMap.get("skeletalRegion"));

              } catch (JSONException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
              }
              response.getWriter().write(jsonObj.toString());  
              break;
        case "editLiteral":
              
          DataPropertyStatementDao dDao  =    
          vreq.getWebappDaoFactory().getDataPropertyStatementDao();
          String subject = vreq.getParameter("subject");
          String predicate = changePrefixes(vreq.getParameter("predicate"));
          log.info(subject +  "   predicate : " + predicate);
          String oldValue = vreq.getParameter("oldValue");
          String newValue = vreq.getParameter("newValue");
          log.info("old " + oldValue  + "   new  " + newValue);
          dDao.deleteDataPropertyStatement(
              new DataPropertyStatementImpl(subject, predicate, oldValue));
          dDao.insertNewDataPropertyStatement(
              new DataPropertyStatementImpl(subject, predicate, newValue));
          JSONObject json = new JSONObject();
          try {
            json.put("ok", "ok");
          } catch (JSONException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
          }
          response.getWriter().write(json.toString());  
          
          break;
        }
     }
    /*
   public void saveFile(, Map<String,String> urisForNewResources){
      
      
    FileItem fileItem = .getFilesFromForm().get("files").get(0);
    FileStorage fileStorage = ApplicationUtils.instance().getFileStorage();
    String fileName = fileItem.getName();
    String filename = FilenameUtils.getName(fileName);
    
    int periodHere = filename.lastIndexOf('.');
    String mimeType = filename.substring(periodHere);
    
    try{

        InputStream inputStream = fileItem.getInputStream();
        String downloadLocation = FileServingHelper.getBytestreamAliasUrl(urisForNewResources.get("byteStreamIndividual"), filename, vreq.getSession().getServletContext());
        fileStorage.createFile(urisForNewResources.get("byteStreamIndividual"), filename, inputStream);
        Map <String,List<Literal>> litOnFor = submission.getLiteralsFromForm();
        List<Literal> literalsArray1 = new ArrayList<Literal>();
        Literal a = ResourceFactory.createPlainLiteral(fileName);
        literalsArray1.add(a);
        List<Literal> literalsArray2 = new ArrayList<Literal>();
        Literal b = ResourceFactory.createPlainLiteral(downloadLocation);
        literalsArray2.add(b);
        List<Literal> literalsArray3 = new ArrayList<Literal>();
        Literal c = ResourceFactory.createPlainLiteral(mimeType);
        literalsArray3.add(c);
        litOnFor.put("fileName", literalsArray1);
        litOnFor.put("downloadUrl", literalsArray2);
        litOnFor.put("mimeType", literalsArray3);
        submission.setLiteralsFromForm(litOnFor);
  
    } catch (IOException e) {
        throw new IllegalStateException("Can't create the new image file.",e);
    }
      
    }*/
    
    private static void storeTriples(VitroRequest vreq, String triples){
      
      log.info("storeTriples");
      ObjectPropertyStatementDao oDao = 
          vreq.getWebappDaoFactory().getObjectPropertyStatementDao();
      DataPropertyStatementDao dDao  =    
          vreq.getWebappDaoFactory().getDataPropertyStatementDao();
      log.info(triples);
      String[] tripleList = triples.split("\n");
      log.info(tripleList.toString());
      for(String triple : tripleList){
        log.info("triple " +  triple);
        String[] node = triple.split("\\s+");
        String subject = node[0];
        String predicate = changePrefixes(node[1]);
        String object = node[2];
        log.info(subject + "  " + predicate + " " + object);
        if(!predicate.equals("http://www.w3.org/2000/01/rdf-schema#label")){
          oDao.insertNewObjectPropertyStatement(
              new ObjectPropertyStatementImpl(subject, predicate, object));
        } else {
          dDao.insertNewDataPropertyStatement(
              new DataPropertyStatementImpl(subject, predicate, object));
        }
      }
    }
    
    private static String changePrefixes(String predicate){
        for(String prefix : prefixDef.keySet()){
         if(predicate.contains(prefix + ":")){
           predicate = predicate.replace(prefix + ":", prefixDef.get(prefix));
           break;
         } 
        }
        return predicate;
    }
    private static String substituteQuery(Map<String, String> values, String query){
      for(String key : values.keySet()){
        log.info("?" + key  + " " + values.get(key));
        query = query.replace("?" + key, values.get(key) );
      }
      return query;
    }
    
    private static String labelTriple = ""
        + "?skeletalRegion rdfs:label  ?label . ";

    private static String descriptionTriple = ""
        + "?skeletalRegion rdfbones:description  ?description . ";
    
     private static String boneTriples = ""
         + "?completeNess obo:BFO_0000050 ?skeletalInventory\n"
         + "?completeNess obo:IAO_0000136 ?skeletalRegion\n"
         + "?skeletalRegion rdf:type ?classUri\n"
         + "?skeletalRegion rdfs:label 'Default'";
     
     private static String systemicTriples = ""
         + "?boneUri obo:systemic_part_of ?skeletalRegion\n"
         + "?skeletalRegion rdf:type ?classUri\n"
         + "?skeletalRegion rdfs:label 'Default'\n";

     private static String imageTriples = ""
         + "    ?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual ."
         + "    ?fileIndividual vitro-public:filename ?filename ."
         + "    ?fileIndividual vitro-public:mimeType ?mimeType ."
         + "    ?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual ."
         + "    ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLoc . ";
    
   private void setJsonArray(JSONArray arr, List<Map<String, String>> results){
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
           arr.put(jsonObj);
        }
    }
      private static String CoherentBones = ""
              + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
              + "PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#> \n"
              + "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
              + "PREFIX obo:      <http://purl.obolibrary.org/obo/> \n"
              + "PREFIX rdfbones:  <http://w3id.org/rdfbones/core#>  \n" 
              + "SELECT ?uri ?label ?description"
              + " WHERE { \n"
              + "   { "  
              + "    ?completeNess    obo:BFO_0000050   ?skeletalInventory ."
              + "    ?completeNess    obo:IAO_0000136   ?uri . "
              + "    ?uri  rdfs:label  ?label  . \n"
              + "    OPTIONAL { ?uri  rdfbones:description  ?description  .  } "
              + "    ?uri rdf:type <http://purl.obolibrary.org/obo/FMA_53672> . "
              + "   }  UNION { "
              + "    ?completeNess    obo:BFO_0000050   ?skeletalInventory ."
              + "    ?completeNess    obo:IAO_0000136   ?uri . "
              + "    ?uri  rdfs:label  ?label  . "
              + "    OPTIONAL { ?uri  rdfbones:description  ?description . } "
              + "    ?uri rdf:type <http://purl.obolibrary.org/obo/FMA_53673> . "
              + "   }" 
              + "} "; 
    
      private static String SingleBones = ""
            + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"
            + "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"
            + "PREFIX obo:      <http://purl.obolibrary.org/obo/> \n"
            + "PREFIX rdfbones:  <http://w3id.org/rdfbones/core#>  \n" 
            + "SELECT  ?uri ?label ?description"
            + " WHERE { \n"
            + "	   ?completeNess    obo:BFO_0000050   ?skeletalInventory .\n"
            + "    ?completeNess    obo:IAO_0000136   ?uri . \n"
            + "    ?uri  rdfs:label  ?label  . \n"
            + "    OPTIONAL { ?uri  rdfbones:description  ?description  . } \n"
            + " FILTER NOT EXISTS { ?uri rdf:type <http://purl.obolibrary.org/obo/FMA_53672> } . \n"
            + " FILTER NOT EXISTS { ?uri rdf:type <http://purl.obolibrary.org/obo/FMA_53673> } . \n"
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
