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
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
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

    @Override
    protected void doRequest(VitroRequest vreq, HttpServletResponse response)
        throws IOException, ServletException {
      
      NewURIMaker newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());

      FileItem fileItem = vreq.getFiles().get(PARAMETER_UPLOADED_FILE).get(0);
      FileStorage fileStorage = ApplicationUtils.instance().getFileStorage();
      String fileName = fileItem.getName();
      String filename = FilenameUtils.getName(fileName);
      
      int periodHere = filename.lastIndexOf('.');
      String mimeType = filename.substring(periodHere);
      
      try{
        
          InputStream inputStream = fileItem.getInputStream();
          String downloadLocation = FileServingHelper.getBytestreamAliasUrl(newUri.getUnusedNewURI(""), filename, vreq.getSession().getServletContext());
          fileStorage.createFile(newUri.getUnusedNewURI(""), filename, inputStream);
          
         
    
      } catch (IOException e) {
          throw new IllegalStateException("Can't create the new image file.",e);
      }
    }  
}
    


