package edu.cornell.mannlib.vitro.webapp.search.controller;


import java.io.BufferedReader;
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
import org.json.*;
import org.noggit.JSONParser.ParseException;

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
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.TripleCreator;

/**
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class DataInput extends VitroAjaxController {

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
  
        log.info("arrived");
        /*
        log.info(vreq.getParameterMap().toString());
        log.info(vreq.getParameter("dataToStore").toString());
        */
        
        JSONObject json = new JSONObject();
        JSONArray toSend = new JSONArray();

        log.info(vreq.getParameter("dataToStore"));
        TripleCreator tripleCreate = null;
        try {
          json = new JSONObject(vreq.getParameter("dataToStore"));

          log.info(json.get("individual"));
          
          tripleCreate = new TripleCreator(json, vreq);
          toSend = tripleCreate.getTriples();
        } catch (JSONException e1) {
          // TODO Auto-generated catch block
          e1.printStackTrace();
        }
        
        log.info(toSend.toString());
        response.getWriter().write(toSend.toString());  
        tripleCreate.storeTriples();
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
}

