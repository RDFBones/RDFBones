package edu.cornell.mannlib.vitro.webapp.search.controller;

import edu.cornell.mannlib.vitro.webapp.beans.Individual;
import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.IndividualDao;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.WebappDaoFactory;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;
import edu.cornell.mannlib.vitro.webapp.controller.individual.IndividualTemplateLocator;


public class InstanceCreator {

  public VitroRequest vreq;
  public String classUri;
  public String classLabel;
  
  private WebappDaoFactory wadf;
  private IndividualDao iDao;
  
  InstanceCreator(VitroRequest vreq, String classUri, String classLabel){
    
    this.vreq = vreq;
    this.classUri = classUri;
    this.classLabel = classLabel;
  }
  
  public String createInstance(){
    
    DataPropertyStatementDao dataDao = 
        this.vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    ObjectPropertyStatementDao objectDao = 
        this.vreq.getWebappDaoFactory().getObjectPropertyStatementDao();
   
    NewURIMaker newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());
    
    String uri = new String();
    try {
      uri = newUri.getUnusedNewURI("");
    } catch (InsertException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    
    objectDao.insertNewObjectPropertyStatement(
        new ObjectPropertyStatementImpl(uri, 
            N3Utils.getOnlyPredicate("rdf:type"), this.classUri));
    
    String num = uri.substring(uri.length() - 3, uri.length());
    dataDao.insertNewDataPropertyStatement(
        new DataPropertyStatementImpl(uri, 
            N3Utils.getOnlyPredicate("rdfs:label"), this.classUri + num));
    
    this.wadf = vreq.getWebappDaoFactory();
    this.iDao = wadf.getIndividualDao();
    
    Individual individual = iDao.getIndividualByURI(uri);
    
    String template = new IndividualTemplateLocator(vreq, individual).findTemplate();

    
    return uri;
  }
}
  