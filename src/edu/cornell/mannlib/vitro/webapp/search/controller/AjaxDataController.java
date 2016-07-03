package edu.cornell.mannlib.vitro.webapp.search.controller;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.PropertyInstanceDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;

/**
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class AjaxDataController extends VitroAjaxController {

    public static final String PARAMETER_UPLOADED_FILE = "datafile";

    private static final long serialVersionUID = 1L;
    private static final Log log = LogFactory.getLog(AjaxDataController.class);
    
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

        case "editLiteral":
              N3Utils.setInputMap(inputMap, EditDataInputParams, vreq);
              N3Utils.setOutputMap(outputMap, EditDataOutputParams, inputMap);
              this.dataTriplesAdd= N3Utils.subInputMap(inputMap, EditTriplesAdd);
              this.dataTriplesRemove = N3Utils.subInputMap(inputMap, EditTriplesRemove);
              log.info("editLiteral");
              this.removeData();
              this.addData();
              log.info("afterDataoperation");
              break;
        
        case "editObject":
          N3Utils.setInputMap(inputMap, EditDataInputParams, vreq);
          N3Utils.setOutputMap(outputMap, EditDataOutputParams, inputMap);
          this.objectTriplesAdd= N3Utils.subInputMap(inputMap, EditTriplesAdd);
          this.objectTriplesRemove = N3Utils.subInputMap(inputMap, EditTriplesRemove);
          log.info("editLiteral");
          this.removeObject();
          this.addObject();
          log.info("afterDataoperation");
          break;
         
        case "addLiteral":
          N3Utils.setInputMap(inputMap, EditDataInputParamsAdd, vreq);
          N3Utils.setOutputMap(outputMap, EditDataOutputParams, inputMap);
          this.dataTriplesAdd= N3Utils.subInputMap(inputMap, EditTriplesAdd);
          log.info("editLiteral");
          this.addData();
          log.info("afterDataoperation");
          break;
    
        case "addObject":
          N3Utils.setInputMap(inputMap, EditDataInputParamsAdd, vreq);
          N3Utils.setOutputMap(outputMap, EditDataOutputParams, inputMap);
          this.objectTriplesAdd= N3Utils.subInputMap(inputMap, EditTriplesAdd);
          log.info("editLiteral");
          this.addObject();
          log.info("afterDataoperation");
          break;      
        case "saveImage" :
              log.info("SaveImage");
              N3Utils.setInputMap(inputMap,ImageUploadInputParams, vreq);
              N3Utils.setOutputMap(outputMap, ImageUploadOutputParams, inputMap);
              log.info("After outputmap setting");
              log.info(inputMap.toString());
              this.objectTriplesAdd = N3Utils.subInputMap(inputMap, ImageUploadObjectTriplesAdd);
              for(String a : this.objectTriplesAdd){
                log.info(a);
              }
              this.dataTriplesAdd = N3Utils.subInputMap(inputMap, ImageUploadDataTriplesAdd);
              for(String a : this.dataTriplesAdd){
                log.info(a);
              }
              this.addData();
              this.addObject();
              break;
              
        case "addInstance" : 
            log.info("Add instance");
            N3Utils.setInputMap(inputMap,InstanceAddInputParams, vreq);
            N3Utils.setOutputMap(outputMap, InstanceAddOutputParams, inputMap);
            log.info("After outputmap setting");
            log.info(inputMap.toString());
            this.objectTriplesAdd = N3Utils.subInputMap(inputMap,InstanceAddObjectTriplesAdd);
            for(String a : this.objectTriplesAdd){
              log.info(a);
            }
            this.addObject();
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
      * EditLiteral
      */
      private static String[] EditDataInputParamsAdd = 
      {"subject", "predicate", "newValue"};
    
     private static String[] EditDataInputParams = 
         {"subject", "predicate", "oldValue", "newValue"};
     private static String[] EditDataOutputParams = {};

     private static String[] EditTriplesRemove = {
           "?subject ?predicate ?oldValue"
     };
     private static String[] EditTriplesAdd = {
          "?subject ?predicate ?newValue"
     };
     
     /*
      * Image Upload
      */
     private static String[] ImageUploadInputParams = {"subject", "imageIndividual", "byteStreamIndividual",
       "fileIndividual", "filename", "mimetype", "downloadLocation"};
   
     private static String[] ImageUploadOutputParams = {};

     private static String[] ImageUploadObjectTriplesAdd = {
        "?subject rdfbones:isDepicted ?imageIndividual",
        "?imageIndividual rdf:type bibo:Image",
        "?fileIndividual rdf:type vitro-public:File",
        "?imageIndividual http://vivo.mydomain.edu/individual/hasFile ?fileIndividual",
        "?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual",
        "?byteStreamIndividual rdf:type vitro-public:FileByteStream" 
     };
     
     private static String[] ImageUploadDataTriplesAdd = {
         "?fileIndividual vitro-public:filename ?filename",
         "?fileIndividual vitro-public:mimeType ?mimetype",
         "?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLocation",
     };
     
     /*
      * Add Instance
      */
     private static String[] InstanceAddInputParams = {
       "subject", "predicate", "object"
     };
     
     private static String[] InstanceAddOutputParams = {};
     
     private static String[] InstanceAddObjectTriplesAdd = {
       "?subject ?predicate ?object",
     };

}
