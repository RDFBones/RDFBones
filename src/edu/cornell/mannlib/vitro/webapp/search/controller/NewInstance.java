package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.rdf.model.Literal;

import edu.cornell.mannlib.vitro.webapp.beans.DataProperty;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatement;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.Individual;
import edu.cornell.mannlib.vitro.webapp.beans.IndividualImpl;
import edu.cornell.mannlib.vitro.webapp.beans.VClass;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.individual.IndividualTemplateLocator;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyDao;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.IndividualDao;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.WebappDaoFactory;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic.BonyDataSet2;

public class NewInstance extends FreemarkerHttpServlet{

  private WebappDaoFactory wadf;
  private IndividualDao iDao;
  
  private static final Log log = LogFactory.getLog(NewInstance.class.getName());

  @Override 
  public ResponseValues processRequest(VitroRequest vreq) throws InsertException, UnsupportedEncodingException{
    
    String classUri = vreq.getParameter("classUri");
    String classLabel = java.net.URLDecoder.decode(vreq.getParameter("label"), "UTF-8");
    
    //Creating the new instance
    IndividualDao indDao = vreq.getWebappDaoFactory().getIndividualDao();
    Individual i = new IndividualImpl();
    i.setVClassURI(classUri);
    String indUri = indDao.insertNewIndividual(i);
    
    //Setting the label of the new instance based on the URI the classLabel
    String label = classLabel + "_" + indUri.substring(indUri.length() -3);
    DataPropertyStatementDao dpsDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    dpsDao.insertNewDataPropertyStatement(new DataPropertyStatementImpl(indUri, N3Utils.getOnlyPredicate("rdfs:label"), label));
    
    //Getting the template file for the class
    DataPropertyStatementDao dpsd = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    List<Literal> customTemplate = dpsd.getDataPropertyValuesForIndividualByProperty(classUri, "http://vitro.mannlib.cornell.edu/ns/vitro/0.7#customDisplayViewAnnot");
    String template = customTemplate.get(0).getString();
    
    //DataMap for the template
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("individual", indUri);
    data.put("label", label);

    return new TemplateResponseValues(template, data);
  }
}
