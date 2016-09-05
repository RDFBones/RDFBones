package rdfbones.pageload;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.Literal;

import edu.cornell.mannlib.vitro.webapp.beans.Individual;
import edu.cornell.mannlib.vitro.webapp.beans.IndividualImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatement;
import edu.cornell.mannlib.vitro.webapp.beans.VClass;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.IndividualDao;
import edu.cornell.mannlib.vitro.webapp.dao.VClassDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.modelaccess.ModelAccess;

public class DefaultPageLoad extends FreemarkerHttpServlet{
  
  private static final Log log = LogFactory
        .getLog(DefaultPageLoad.class);
  
  public ResponseValues processRequest(VitroRequest vreq){
    
    //Getting the input parameters
    String individualUri = vreq.getParameter("individual");
    
    /*
     * @@@ To solve @@@
     * Iteratively check the superclasses of the individual if they
     * have custom template
     */
    
    /*
     * @@@ Thesis related note @@@
     * In the final version, the Page instance
     * will be called by the Servlet, which get each configuration
     * data of the found page. 
     */

    //Getting the classUri
    log.info(individualUri);
    //Daos for template
    IndividualDao iDao = vreq.getWebappDaoFactory().getIndividualDao();
    Individual ind = iDao.getIndividualByURI(individualUri);
    //Dao for template
    DataPropertyStatementDao dpsd = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    //Getting type of the individual
    List<ObjectPropertyStatement> ops = ind.getObjectPropertyStatements(N3Utils.getOnlyPredicate("vitro:mostSpecificType"));
    String classUri = ops.get(0).getObjectURI();
    
    //List<VClass> vclasses = ind.getVClasses(true);
    //String classUri1 = vclasses.get(0).getURI();

    String template = new String();
    //Dao for class
    VClassDao vdao = vreq.getWebappDaoFactory().getVClassDao();
    List<String> superClasses = new ArrayList<String>();
    superClasses.add(classUri);
    while(true){
      classUri = this.getSuperClass(classUri, vdao);
      if(StringUtils.isEmpty(classUri)){
        break;
      } else {
        superClasses.add(classUri);
      }
    }
    
    for(String uri : superClasses){
      List<Literal> customTemplates = dpsd.getDataPropertyValuesForIndividualByProperty(uri, "http://vitro.mannlib.cornell.edu/ns/vitro/0.7#customDisplayViewAnnot");
      if(customTemplates.size() > 0){
        template = customTemplates.get(0).getString();
        break;
      }
    }

    if(StringUtils.isEmpty(template)){
      template = "noTemplate.ftl";
    }
    
    Map<String, Object> data = new HashMap<String, Object>();
    Map<String, Object> params = new HashMap<String, Object>();
    params.put("individual", individualUri);
    data.put("params", params);
    
    return new TemplateResponseValues(template, data);
  }
  
  public String getSuperClass(String classUri, VClassDao vdao){

    String toReturn = new String("");
    List<String> superClasses = vdao.getSuperClassURIs(classUri, true);
    for(String uri : superClasses){
      VClass vc = vdao.getVClassByURI(uri);
      if(vc != null){
        if(!vc.getLabel().startsWith("restriction")){
          log.info(vc.getLabel());
          toReturn = vc.getURI();
          break;
        }
      }
    }
    return toReturn;
  }
}
