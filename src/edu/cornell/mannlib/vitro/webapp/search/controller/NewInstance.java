package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import rdfbones.pageload.TemplateGetter;

import com.hp.hpl.jena.rdf.model.Literal;

import edu.cornell.mannlib.vitro.webapp.beans.DataProperty;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatement;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.Individual;
import edu.cornell.mannlib.vitro.webapp.beans.IndividualImpl;
import edu.cornell.mannlib.vitro.webapp.beans.VClass;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.FreemarkerHttpServlet;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.DirectRedirectResponseValues;
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
    
    String classLabel = new String();
    if(StringUtils.isNotEmpty(vreq.getParameter("label"))){
      classLabel = java.net.URLDecoder.decode(vreq.getParameter("label"), "UTF-8");
    } else {
      DataPropertyStatementDao dataPropDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
      List<Literal> literals = dataPropDao.getDataPropertyValuesForIndividualByProperty(classUri, "http://www.w3.org/2000/01/rdf-schema#label");
      classLabel = literals.get(0).getString();
    }
    
    //Creating the new instance
    IndividualDao indDao = vreq.getWebappDaoFactory().getIndividualDao();
    Individual i = new IndividualImpl();
    i.setVClassURI(classUri);
    String indUri = indDao.insertNewIndividual(i);
    
    
    //Setting Label
    String label = classLabel + "_" + indUri.substring(indUri.length() -3);
    DataPropertyStatementDao dpsDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    dpsDao.insertNewDataPropertyStatement(new DataPropertyStatementImpl(indUri, N3Utils.getOnlyPredicate("rdfs:label"), label));
    
    
    return new DirectRedirectResponseValues("defaultPageLoad?individual=" + indUri);
  }
}
