package rdfbones.pageload;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Literal;

import edu.cornell.mannlib.vitro.webapp.beans.Individual;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatement;
import edu.cornell.mannlib.vitro.webapp.beans.VClass;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.IndividualDao;
import edu.cornell.mannlib.vitro.webapp.dao.VClassDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;

public class TemplateGetter {

  
  private static final Log log = LogFactory
      .getLog(DefaultPageLoad.class);
  
  public static String getTemplateByIndividual(String individualUri, VitroRequest vreq){
    
    String template = new String();
    List<String> superClasses = getSuperClasses(individualUri, vreq);

    DataPropertyStatementDao dpsd = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
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
  
  static String superClassQuery = "" +
     " SELECT ?class (COUNT(?superClass) AS ?superClassCount) " +
     "    WHERE { " +
     "       ?individual  rdf:type ?class . " +
     "       FILTER ( NOT EXISTS { ?class   rdf:type owl:Restriction })  . " +
     "       FILTER ( NOT EXISTS { ?superClass   rdf:type owl:Restriction })  . " +
     "       ?class rdfs:subClassOf ?superClass .  " +
     "    } GROUP BY ?class " + 
     "    ORDER BY DESC(?superClassCount) ";
  
  
  public static List<String> getSuperClasses(String individual, VitroRequest vreq){

    List<String> superClasses = new ArrayList<String>();
    String readyQuery = new String();
    ResultSet resultSet;
    Map<String, String> queryVars = new HashMap<String, String>();
    readyQuery = N3Utils.setPrefixes(null, superClassQuery);
    readyQuery = readyQuery.replace("?individual", "<" + individual + ">");
    resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
    String[] uris = {"class"};
    List<Map<String, String>> res =  QueryUtils.getQueryVars(resultSet, uris, null);
    for(Map<String, String> field : res){
      superClasses.add(field.get("class"));
    }
    return superClasses;
  }
  
}
