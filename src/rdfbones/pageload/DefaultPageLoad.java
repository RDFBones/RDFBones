package rdfbones.pageload;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.rdf.model.Literal;

import edu.cornell.mannlib.vitro.webapp.beans.Individual;
import edu.cornell.mannlib.vitro.webapp.beans.IndividualImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatement;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.IndividualDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;

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
    IndividualDao iDao = vreq.getWebappDaoFactory().getIndividualDao();
    Individual ind = iDao.getIndividualByURI(individualUri);
    List<ObjectPropertyStatement> ops = ind.getObjectPropertyStatements(N3Utils.getOnlyPredicate("vitro:mostSpecificType"));
    String classUri = ops.get(0).getObjectURI();
    
    //Getting the template
    DataPropertyStatementDao dpsd = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    List<Literal> customTemplate = dpsd.getDataPropertyValuesForIndividualByProperty(classUri, "http://vitro.mannlib.cornell.edu/ns/vitro/0.7#customDisplayViewAnnot");
    String template = new String();
    if(customTemplate.size() == 0){
      template = "noTemplate.ftl";
    } else {
      template = customTemplate.get(0).getString();
    }
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("individual", individualUri);
    
    return new TemplateResponseValues(template, data);
  }
  

}
