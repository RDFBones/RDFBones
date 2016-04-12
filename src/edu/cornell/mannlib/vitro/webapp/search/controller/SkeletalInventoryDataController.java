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
import edu.cornell.mannlib.vitro.webapp.dao.PropertyInstanceDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;

/**
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class SkeletalInventoryDataController extends VitroAjaxController {

    public static final String PARAMETER_UPLOADED_FILE = "datafile";

    private static final long serialVersionUID = 1L;
    private static final Log log = LogFactory.getLog(SkeletalInventoryDataController.class);
    
    
    private DataPropertyStatementDao dataDao;
    private ObjectPropertyStatementDao objectDao;
    private PropertyInstanceDao propDao;
    
    private String[] objectTriplesAdd;
    private String[] dataTriplesAdd;
    private String[] objectTriplesRemove;
    private String[] dataTriplesRemove;
    
    private static Map<String, String> prefixDef = new HashMap<String, String>();
    
    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {
      
        this.dataDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
        this.objectDao = vreq.getWebappDaoFactory().getObjectPropertyStatementDao();
        this.propDao = vreq.getWebappDaoFactory().getPropertyInstanceDao();

        NewURIMaker newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());
        Map<String,String> inputMap = new HashMap<String,String>();
        Map<String,String> outputMap = new HashMap<String,String>();
        
        this.objectTriplesAdd = new String[0];
        this.dataTriplesAdd = new String[0];
        this.objectTriplesAdd = new String[0];
        this.dataTriplesAdd = new String[0];
                
        switch(vreq.getParameter("dataOperation")){
        
        case "test" : 
              log.info("test");
              break;
            
        case "delete": 
               log.info("Delete");
               N3Utils.setInputMap(inputMap, DeleteInputParams, vreq);
               log.info("InputMap set");
               N3Utils.setOutputMap(outputMap, DeleteOutputParams, inputMap);
               log.info("OutputMap set");
               log.info("inputMap " + inputMap.toString());
               this.objectTriplesRemove = N3Utils.subInputMap(inputMap, DeleteObjectTriples);
               log.info("Object set");
               this.dataTriplesRemove = N3Utils.subInputMap(inputMap, DeleteDataTriples);
               log.info("Data set");
               this.removeData();
               this.removeObject();
               break;
        case "newBone" :
              //Creating or modifying triples 
              try {
                for(String newResource : BoneNewResources){
                  inputMap.put(newResource, newUri.getUnusedNewURI(""));
                }
              } catch (InsertException e) {
                e.printStackTrace();
              }
              log.info(inputMap);
              //Substitute input values
              N3Utils.setInputMap(inputMap, BoneInputParams, vreq);
              log.info(inputMap);
              N3Utils.setOutputMap(outputMap, BoneOutputParams, inputMap);
              this.objectTriplesAdd = N3Utils.subInputMap(inputMap, BoneObjectTriples);
              this.dataTriplesAdd = N3Utils.subInputMap(inputMap, BoneDataTriples);
              this.addData();
              this.addObject();
              break;
          
        case "systemic" :
              //Creating or modifying triples 
              try {
                for(String newResource : SystemicNewResources){
                  inputMap.put(newResource, newUri.getUnusedNewURI(""));
                }
              } catch (InsertException e) {
                e.printStackTrace();
              }
              //Substitute input valu
         
              N3Utils.setInputMap(inputMap, SystemicInputParams, vreq);
              N3Utils.setOutputMap(outputMap, SystemicOutputParams, inputMap);
              this.objectTriplesAdd = N3Utils.subInputMap(inputMap, SystemicObjectTriples);
              this.dataTriplesAdd = N3Utils.subInputMap(inputMap, SystemicDataTriples);
              this.addData();
              this.addObject();
              break;
          
        case "editLiteral":
              N3Utils.setInputMap(inputMap, EditLiteralInputParams, vreq);
              N3Utils.setOutputMap(outputMap, EditLiteralOutputParams, inputMap);
              this.dataTriplesAdd= N3Utils.subInputMap(inputMap, EditLiteralDataTriplesAdd);
              this.dataTriplesRemove = N3Utils.subInputMap(inputMap, EditLiteralDataTriplesRemove);
              log.info("editLiteral");
              this.removeData();
              this.addData();
              log.info("afterDataoperatio");
              break;
         default : break;
        }
        
        
        JSONObject json = new JSONObject();
        boolean flag = false;
        for(String key : outputMap.keySet()){
          flag = true;
          try {
            json.put(key, outputMap.get(key));
          } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
          }
        }
        if(!flag){
          try {
            json.put("ok", "ok");
          } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
          }
        }
        log.info(json.toString());
        response.getWriter().write(json.toString());  
     }
    
    private void addObject(){      
      for(String triple : this.objectTriplesAdd){
        log.info("Object add  : " + triple);
        this.objectDao.insertNewObjectPropertyStatement(
            new ObjectPropertyStatementImpl(
                    N3Utils.getSubject(triple), 
                    N3Utils.getPredicate(triple),
                    N3Utils.getObject(triple)));
      }
    }

    private void addData(){      
      for(String triple : this.dataTriplesAdd){
        log.info("Data add  : " + triple);
        this.dataDao.insertNewDataPropertyStatement(
            new DataPropertyStatementImpl(
                    N3Utils.getSubject(triple), 
                    N3Utils.getPredicate(triple),
                    N3Utils.getLiteralObject(triple)));
      }
    }
    
    private void removeObject(){      
      for(String triple : this.objectTriplesRemove){
        log.info("Object remove  : " + triple);
        //this.objectDao.deleteObjectPropertyStatement(
        this.propDao.deleteObjectPropertyStatement(
                    N3Utils.getSubject(triple), 
                    N3Utils.getPredicate(triple),
                    N3Utils.getObject(triple));
      }
    }
    
    private void removeData(){      
      for(String triple : this.dataTriplesRemove){
        log.info("Data remove  : " + triple);
        dataDao.deleteDataPropertyStatementsForIndividualByDataProperty(
            N3Utils.getSubject(triple), 
            N3Utils.getPredicate(triple));
      }
    }
    
      /*
       * Bone
       */
     private static String[] BoneInputParams = {"skeletalInventory", "classUri", "label"};
     private static String[] BoneOutputParams = {"classUri", "boneUri", "completeness", "label"};
     private static String[] BoneNewResources = {"boneUri", "completeness", "label"};

     private static String[] BoneObjectTriples = {
         "?completeness obo:BFO_0000050 ?skeletalInventory",
         "?completeness obo:IAO_0000136 ?boneUri",
         "?boneUri rdf:type ?classUri",
     };
     private static String[] BoneDataTriples = {
        "?boneUri rdfs:label ?label"
     };
     
     /*
      * Systemic
      */
     
     private static String[] SystemicInputParams = {"parentUri", "classUri", "?label"};
     private static String[] SystemicOutputParams = {"boneUri", "classUri"};
     private static String[] SystemicNewResources = {"boneUri"};

     private static String[] SystemicObjectTriples = {
         "?boneUri obo:systemic_part_of ?parentUri",
         "?boneUri rdf:type ?classUri",
     };

     private static String[] SystemicDataTriples = {
        "?systemicUri rdfs:label ?label",
     };
     
     /*
      * Delete 
      */
     
     private static String[] DeleteInputParams = 
       {"skeletalInventory", "completeness", "boneUri", "classUri", "label"};
     private static String[] DeleteOutputParams = {};

     private static String[] DeleteObjectTriples = {
         //"?completeness obo:BFO_0000050 ?skeletalInventory",
         "?completeness obo:IAO_0000136 ?boneUri",
         "?boneUri rdf:type ?classUri",
     };
     
     private static String[] DeleteDataTriples = {
        "?boneUri rdfs:label ?label"
     };
     
     /*
      * EditLiteral
      */
     private static String[] EditLiteralInputParams = 
         {"boneUri", "predicate", "oldValue", "newValue"};
     private static String[] EditLiteralOutputParams = {};

     private static String[] EditLiteralDataTriplesRemove = {
           "?boneUri ?predicate ?oldValue"
     };
     private static String[] EditLiteralDataTriplesAdd = {
          "?boneUri ?predicate ?newValue"
     };
      
     private static String imageTriples = ""
         + "    ?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual ."
         + "    ?fileIndividual vitro-public:filename ?filename ."
         + "    ?fileIndividual vitro-public:mimeType ?mimeType ."
         + "    ?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual ."
         + "    ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLoc . ";
    
}
