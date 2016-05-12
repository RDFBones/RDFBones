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
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
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

public class AjaxFileController extends VitroAjaxController {

  
  /**
   * 
   */
  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(AjaxFileController.class);

  
    private DataPropertyStatementDao dataDao;
    private ObjectPropertyStatementDao objectDao;
    
    private String[] objectTriplesAdd;
    private String[] dataTriplesAdd;
  
    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {
      
      Map<String, String> inputMap = new HashMap<String, String>();
      Map<String,String> outputMap = new HashMap<String,String>();
      
      List<FileItem> items = new ArrayList<FileItem>();
      try {
        items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(vreq);
      } catch (FileUploadException e2) {
        // TODO Auto-generated catch block
        log.info("etwas stimmt nicht");
        e2.printStackTrace();
      }
      FileItem fileItem = items.get(0);
      FileStorage fileStorage = ApplicationUtils.instance().getFileStorage();
      String fileName = fileItem.getName();
      String filename = FilenameUtils.getName(fileName);
      int periodHere = filename.lastIndexOf('.');
      String mimetype = filename.substring(periodHere);
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
      InputStream inputStream;
      try{
           inputStream = fileItem.getInputStream();
          downloadLocation = FileServingHelper.getBytestreamAliasUrl(byteStreamIndividual, filename, vreq.getSession().getServletContext());
          fileStorage.createFile(byteStreamIndividual, filename, inputStream);
      } catch (IOException e) {
          throw new IllegalStateException("Can't create the new image file.",e);
      }
      if (inputStream != null) {
        try {
          inputStream.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }

      outputMap.put("imageIndividual", imageIndividual);
      outputMap.put("byteStreamIndividual", byteStreamIndividual);
      outputMap.put("fileIndividual", fileIndividual);
      outputMap.put("downloadLocation", downloadLocation);
      outputMap.put("mimetype", mimetype);
      outputMap.put("filename", filename);
      
      JSONObject json = new JSONObject();
      for(String key : outputMap.keySet()){
        try {
          json.put(key, outputMap.get(key));
        } catch (JSONException e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
        }
      }
      response.getWriter().write(json.toString());  
    }  
}    


