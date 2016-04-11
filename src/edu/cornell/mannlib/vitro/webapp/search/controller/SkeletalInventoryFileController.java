package edu.cornell.mannlib.vitro.webapp.search.controller;

import static edu.cornell.mannlib.vitro.webapp.controller.freemarker.ImageUploadController.PARAMETER_UPLOADED_FILE;

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

import edu.cornell.mannlib.vitro.webapp.application.ApplicationUtils;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;
import edu.cornell.mannlib.vitro.webapp.filestorage.FileServingHelper;
import edu.cornell.mannlib.vitro.webapp.modules.fileStorage.FileStorage;


/**
 * AutocompleteController generates autocomplete content
 * via the search index.
 */

public class SkeletalInventoryFileController extends VitroAjaxController {

  
  /**
   * 
   */
  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(SkeletalInventoryFileController.class);

  
    private DataPropertyStatementDao dataDao;
    private ObjectPropertyStatementDao objectDao;
    
    private String[] objectTriplesAdd;
    private String[] dataTriplesAdd;
  
    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {
      
      Map<String, String> inputMap = new HashMap<String, String>();
      Map<String,String> outputMap = new HashMap<String,String>();
      
      FileItem fileItem = vreq.getFiles().get(PARAMETER_UPLOADED_FILE).get(0);
      log.info(fileItem.toString());
      FileStorage fileStorage = ApplicationUtils.instance().getFileStorage();
      String fileName = fileItem.getName();
      String filename = FilenameUtils.getName(fileName);
      int periodHere = filename.lastIndexOf('.');
      String mimeType = filename.substring(periodHere);
      log.info(mimeType.toString());
      NewURIMaker newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());
      String byteStreamIndividual = new String();
      String imageIndividual = new String();
      String fileIndividual = new String();
      String downloadLocation = new String();
      try {
        imageIndividual = newUri.getUnusedNewURI("");
        byteStreamIndividual = newUri.getUnusedNewURI("");
        fileIndividual = newUri.getUnusedNewURI("");
      } catch (InsertException e1) {
        // TODO Auto-generated catch block
        e1.printStackTrace();
      }

      try{
          InputStream inputStream = fileItem.getInputStream();
          downloadLocation = FileServingHelper.getBytestreamAliasUrl(byteStreamIndividual, filename, vreq.getSession().getServletContext());
          fileStorage.createFile(byteStreamIndividual, filename, inputStream);
      } catch (IOException e) {
          throw new IllegalStateException("Can't create the new image file.",e);
      }
      
      inputMap.put("imageIndividual", imageIndividual);
      inputMap.put("byteStreamIndividual", byteStreamIndividual);
      inputMap.put("fileIndividual", fileIndividual);
      outputMap.put("downloadLocation", downloadLocation);
      
      N3Utils.setInputMap(inputMap, ImageUploadInputParams, vreq);
      N3Utils.setOutputMap(outputMap, ImageUploadOutputParams, inputMap);

      this.objectTriplesAdd = N3Utils.subInputMap(inputMap, ImageUploadObjectTriplesAdd);
      this.dataTriplesAdd = N3Utils.subInputMap(inputMap, ImageUploadDataTriplesAdd);
      
      this.performAddDataOperations();
      
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
      response.getWriter().write(json.toString());  
    }  
    
    private static String[] ImageUploadInputParams = {"boneUri"};
    
    private static String[] ImageUploadOutputParams = {"downloadLocation"};
  
    private static String[] ImageUploadObjectTriplesAdd = {
       "?image <http://vivo.mydomain.edu/individual/hasFile>  ?fileIndividual",
       "?fileIndividual vitro-public:downloadLocation ?byteStreamIndividual .",
    };
    
    private static String[] ImageUploadDataTriplesAdd = {
        "    ?fileIndividual vitro-public:filename ?filename .",
        "    ?fileIndividual vitro-public:mimeType ?mimeType .",
        "    ?byteStreamIndividual vitro-public:directDownloadUrl ?downloadLoc . ",
    };
    
    private void performAddDataOperations(){      
      
      for(String triple : this.objectTriplesAdd){
        log.info("Object add  : " + triple);
        this.objectDao.insertNewObjectPropertyStatement(
            new ObjectPropertyStatementImpl(
                    N3Utils.getSubject(triple), 
                    N3Utils.getPredicate(triple),
                    N3Utils.getObject(triple)));
      }
      
      for(String triple : this.dataTriplesAdd){
        log.info("Data add  : " + triple);
        this.dataDao.insertNewDataPropertyStatement(
            new DataPropertyStatementImpl(
                    N3Utils.getSubject(triple), 
                    N3Utils.getPredicate(triple),
                    N3Utils.getObject(triple)));
      }
    }
}    


