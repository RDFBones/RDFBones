package rdfbones.pageload;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.rdf.model.Literal;

import edu.cornell.mannlib.vitro.webapp.beans.Individual;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatement;
import edu.cornell.mannlib.vitro.webapp.beans.VClass;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.IndividualDao;
import edu.cornell.mannlib.vitro.webapp.dao.VClassDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;

public class TemplateGetter {

  
  private static final Log log = LogFactory
      .getLog(DefaultPageLoad.class);
  
  public static String getTemplateByIndividual(String individualUri, VitroRequest vreq){
    

    IndividualDao iDao = vreq.getWebappDaoFactory().getIndividualDao();
    Individual ind = iDao.getIndividualByURI(individualUri);
    
    //Getting type of the individual
    List<ObjectPropertyStatement> ops = ind.getObjectPropertyStatements(N3Utils.getOnlyPredicate("vitro:mostSpecificType"));
    String classUri = ops.get(0).getObjectURI();
    log.info(classUri);
    return getTemplateByClass(classUri, vreq);
  }
  
  public static String getTemplateByClass(String classUri, VitroRequest vreq){
    
    String template = new String();
    //Dao for class
    DataPropertyStatementDao dpsd = vreq.getWebappDaoFactory().getDataPropertyStatementDao();

    VClassDao vdao = vreq.getWebappDaoFactory().getVClassDao();
    List<String> superClasses = new ArrayList<String>();
    superClasses.add(classUri);
    while(true){
      classUri = getSuperClass(classUri, vdao);
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
    
    return template;
    
  }

  
  public static String getSuperClass(String classUri, VClassDao vdao){

    String toReturn = new String("");
    List<String> superClasses = vdao.getSuperClassURIs(classUri, true);
    log.info("length " + superClasses.size());
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
