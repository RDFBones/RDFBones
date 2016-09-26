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
    
    //Daos for template
    String template = TemplateGetter.getTemplateByIndividual(individualUri, vreq);
    
    Map<String, Object> data = new HashMap<String, Object>();
    Map<String, Object> params = new HashMap<String, Object>();
    params.put("individual", individualUri);
    data.put("params", params);
    
    return new TemplateResponseValues(template, data);
  }
}
