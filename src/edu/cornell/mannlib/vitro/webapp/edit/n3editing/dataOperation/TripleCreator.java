package edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.DataPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.InsertException;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.dao.ObjectPropertyStatementDao;
import edu.cornell.mannlib.vitro.webapp.dao.PropertyInstanceDao;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes.*;
import edu.cornell.mannlib.vitro.webapp.search.controller.SkeletalInventoryDataController;


public class TripleCreator {

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(TripleCreator.class);
    
  private DataPropertyStatementDao dataDao;
  private ObjectPropertyStatementDao objectDao;
  private PropertyInstanceDao propDao;
  private NewURIMaker newUri;
  
    public TripleCreator(JSONObject json, VitroRequest vreq) throws JSONException{
     
      this.dataDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
      this.objectDao = vreq.getWebappDaoFactory().getObjectPropertyStatementDao();
      this.propDao = vreq.getWebappDaoFactory().getPropertyInstanceDao();
      
      this.newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());
      
      Map<String,String> inputMap = new HashMap<String,String>();
      Map<String,String> outputMap = new HashMap<String,String>();
      
      this.tripleDefinition = createTestTriples();
      this.triplesToCreate = new ArrayList<Triple>();
      this.inputData = json;

      for(Triple triple : this.tripleDefinition){
        Iterator<String> keys = this.inputData.keys();
        while(keys.hasNext()){
          String key = keys.next();
          if(triple.valid(key)){
            log.info("inside");
            triple.createTriples(this, key, (JSONObject) this.inputData.get(key));  
          }
        }
      }
    }
    
    public JSONArray getTriples() throws JSONException{
      
        JSONArray array = new JSONArray();
        for(Triple triple : this.triplesToCreate){
          
          JSONObject json = new JSONObject();
          json.put("subject", triple.subject);
          json.put("predicate", triple.predicate);
          json.put("object", triple.object);
          
          array.put(json);
        }
        return array;
    }
    
    public TripleCreator() throws JSONException{
        
      this.tripleDefinition = createTestTriples();
      this.triplesToCreate = new ArrayList<Triple>();
      this.inputData = createTestJSON();
      Iterator<String> keys = inputData.keys();
      
      for(Triple triple : this.tripleDefinition){
        while(keys.hasNext()){
          String key = keys.next();
          if(triple.valid(key)){
            triple.createTriples(this, key, (JSONObject) this.inputData.get(key));  
          }
        }
      }
      
    }
  
    public JSONObject inputData;
    List<Triple> tripleDefinition;
    List<Triple> triplesToCreate;
    
    
    public void createInstance(JSONObject obj) throws JSONException{

      try {
        String uri = this.newUri.getUnusedNewURI("");
        this.triplesToCreate.add(new Triple(uri, "rdf:type", obj.getString("uri")));
        obj.put("type", "existing");
        obj.put("uri", uri);
      } catch (InsertException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }

    }
    
    public void process(JSONObject obj, String varName) throws JSONException{

      for(Triple triple : this.tripleDefinition){
        if(triple.valid(varName)){
          triple.createTriples(this, varName, obj);
        }
      }
    }
    
    public void createTriple(String subject, String predicate, String object){
       
      System.out.println(subject + "  " + predicate  + "   " + object);
      this.triplesToCreate.add(new Triple(subject, predicate, object));
    }
    
    public String getGlobalUri(String key) throws JSONException{
      Iterator<String> keys = this.inputData.keys();
      while (keys.hasNext()) {
        String k = keys.next();
        if (k.equals(key)) {
          return this.inputData.getString(key);
        }
      }
      return "";
    }
    
    public static List<Triple> createTestTriples() {

      List<Triple> triples = new ArrayList<Triple>();

      triples.add(new Triple("boneOrgan", "obo:systemic_part_of", "boneDivision", true));
      // triples.add(new QueryDependentNewInstance("?boneSegment",
      //    "regional_part_of", "boneOrgan", boneSegmentQuery(), false));
      triples.add(new ConstantNewInstance("boneSegment",
          "obo:regional_part_of", "boneOrgan", "http://w3id.org/rdfbones/core#EntireBone", true));
      triples.add(new ConstantNewInstance("completeness", "http://purl.obolibrary.org/obo/IAO_0000136",
          "boneSegment", "http://w3id.org/rdfbones/core#Completeness2State", true));
      triples.add(new Triple("completeness", "http://purl.obolibrary.org/obo/OBI_0000999", "comp2State"));
      triples.add(new Triple("individual", "http://purl.obolibrary.org/obo/BFO_0000051", "completeness", true));
      return triples;
    }

    public static JSONObject createTestJSON() throws JSONException{
      
      JSONObject arrived = new JSONObject();

      JSONObject boneDivision = new JSONObject();
      JSONArray boneOrgan = new JSONArray();

      JSONObject boneOrgan1 = new JSONObject();
      JSONObject boneOrgan2 = new JSONObject();

      JSONObject completeness1 = new JSONObject();
      JSONObject completeness2 = new JSONObject();
      
      completeness1.put("type", "existing");
      completeness1.put("uri", "complete");
     
      boneOrgan1.put("uri", "second vertebra");
      boneOrgan1.put("type", "new");
      boneOrgan1.put("comp2State", completeness1);
      
      completeness2.put("type", "existing");
      completeness2.put("uri", "incomplete");
      
      boneOrgan2.put("uri", "first vertebra");
      boneOrgan2.put("type", "new");
      boneOrgan2.put("comp2State", completeness2);

      boneOrgan.put(boneOrgan1);
      boneOrgan.put(boneOrgan2);
      
      boneDivision.put("boneOrgan", boneOrgan);    
      boneDivision.put("uri", "vertebral column");
      boneDivision.put("type", "new");

      arrived.put("boneDivision", boneDivision);
      arrived.put("individual", "individualUri#1");

      return arrived;
    }
    
    public static SPARQLQuery boneSegmentQuery() {

      SPARQLQuery query = new SPARQLQuery();
      query.queryText =
          "SELECT ?boneSegment"
              + "WHERE {"
              + " ?individualUri          vitro:mostSpecificType  ?skeletalInventoryType ."
              + " ?skeletalInventoryType  rdfs:subClassOf         ?restriction1  ."
              + " ?restriction1           owl:onProperty          obo:hasPart .  "
              + " ?restriction1           owl:someValuesFrom      ?completeness ."
              + " ?completeteness         rdfs:subClassOf         ?restriction2 . "
              + " ?restriction2           owl:onProperty          obo:isAbout . "
              + " ?restriction2           owl:someValuesFrom      ?boneSegment ."
              + " ?boneSegment            rdf:subClassOf          ?restriction3 ."
              + " ?restriction3           owl:onProperty          obo:regional_part_of ."
              + " ?restriction3           owl:someValuesFrom      ?boneOrgan ."
              + "";

      return query;
    }
    
    
    public void storeTriples(){      
      for(Triple triple : this.triplesToCreate){
        log.info(triple.subject + "  " + triple.predicate + " " + triple.object);
        this.objectDao.insertNewObjectPropertyStatement(
            new ObjectPropertyStatementImpl(
                    triple.subject, N3Utils.getOnlyPredicate(triple.predicate),triple.object));
      }
    }
}
