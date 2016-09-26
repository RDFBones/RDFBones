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

import edu.cornell.mannlib.vitro.webapp.beans.DataPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.beans.ObjectPropertyStatementImpl;
import edu.cornell.mannlib.vitro.webapp.config.AddCoherentBoneRegion;
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

  public JSONObject inputData;
  public List<Triple> tripleDefinition;
  List<Triple> triplesToCreate;
  List<Triple> dataTriplesToCreate;

  private Map<String, String> returnParams;

  public TripleCreator(JSONObject json, VitroRequest vreq, List<Triple> triples)
    throws JSONException {

    this.dataDao = vreq.getWebappDaoFactory().getDataPropertyStatementDao();
    this.objectDao =
        vreq.getWebappDaoFactory().getObjectPropertyStatementDao();
    this.propDao = vreq.getWebappDaoFactory().getPropertyInstanceDao();

    this.newUri = new NewURIMakerVitro(vreq.getWebappDaoFactory());

    this.returnParams = new HashMap<String, String>();

    Map<String, String> inputMap = new HashMap<String, String>();
    Map<String, String> outputMap = new HashMap<String, String>();

    this.tripleDefinition = triples;
    this.triplesToCreate = new ArrayList<Triple>();
    this.dataTriplesToCreate = new ArrayList<Triple>();

    this.inputData = json;
    log.info("tripleDefinition " + this.tripleDefinition.size());
    for (Triple triple : this.tripleDefinition) {
      Iterator<String> keys = this.inputData.keys();
      while (keys.hasNext()) {
        String key = keys.next();
        if (triple.valid(key)) {

          if (this.inputData.get(key) instanceof JSONArray) {
            for (int i = 0; i < this.inputData.getJSONArray(key).length(); i++) {
              triple.createTriples(this, key, (JSONObject) this.inputData
                  .getJSONArray(key).getJSONObject(i));
            }
          } else {
            triple.createTriples(this, key,
                (JSONObject) this.inputData.get(key));
          }
        }
      }
    }
    log.info(json.toString());
  }

  public JSONArray getTriples() throws JSONException {

    JSONArray array = new JSONArray();
    for (Triple triple : this.triplesToCreate) {

      JSONObject json = new JSONObject();
      json.put("subject", triple.subject);
      json.put("predicate", triple.predicate);
      json.put("object", triple.object);
      array.put(json);
    }
    return array;
  }

  public void createInstance(JSONObject obj) throws JSONException {

    try {
      String uri = this.newUri.getUnusedNewURI("");
      this.triplesToCreate.add(new Triple(uri, "rdf:type", obj
          .getString("uri")));
      String label = new String();
      if (obj.has("label")) {
        Object lab = obj.get("label");
        if (lab instanceof JSONObject) {

        } else { // It is just a string
          label = lab + " " + uri.substring(uri.length() - 3);
          this.dataTriplesToCreate.add(new Triple(uri, "rdfs:label", label));
          log.info(label);
        }
      }
      obj.put("type", "existing");
      obj.put("uri", uri);
    } catch (InsertException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }

  public void process(JSONObject obj, String newVarName) throws JSONException {

    /*
    for (Triple triple : this.tripleDefinition) {
      if (triple.valid(varName)) {
        triple.createTriples(this, varName, obj);
      }
    }*/
    for(Triple triple : this.tripleDefinition){
      String from = triple.from.equals("subject") ? triple.subject : triple.object;
      String to = triple.from.equals("subject") ? triple.object : triple.subject;
      log.info("From : " + from + "  newVarName : " + newVarName);
      if(from.equals(newVarName)){
        
        triple.createTriples(this, from, obj);
        /*
        if(triple instanceof ConstantNewInstance){
          log.info("inside");
          triple.createTriples(this, from, obj);
        } else { //instanceof Triple
           //Check if the object' (to) is in the 
          log.info("To " + to);
          Iterator<String> keys11 = obj.keys();
          log.info(keys11);
          while (keys11.hasNext()) {
            // If the object has to be new then we create it to new
            String k = keys11.next();
            if (k.equals(to)) {
              log.info("objectFinal");
              log.info(obj.toString());
              triple.createTriples(this, from, obj);
              break;
            }
          } 
        }
        */
      }
    }
  }

  public void createTriple(String subject, String predicate, String object) {

    this.triplesToCreate.add(new Triple(subject, predicate, object));
  }

  public String getGlobalUri(String key) throws JSONException {
    Iterator<String> keys = this.inputData.keys();
    while (keys.hasNext()) {
      String k = keys.next();
      if (k.equals(key)) {
        return this.inputData.getString(key);
      }
    }
    return "";
  }

  public void storeTriples() {
    for (Triple triple : this.triplesToCreate) {
      log.info(triple.subject + "  " + triple.predicate + " " + triple.object);
      this.objectDao
          .insertNewObjectPropertyStatement(new ObjectPropertyStatementImpl(
              triple.subject, N3Utils.getOnlyPredicate(triple.predicate),
              triple.object));
    }

    for (Triple triple : this.dataTriplesToCreate) {
      log.info(triple.subject + "  " + triple.predicate + " " + triple.object);
      this.dataDao
          .insertNewDataPropertyStatement(new DataPropertyStatementImpl(
              triple.subject, N3Utils.getOnlyPredicate(triple.predicate),
              triple.object));
    }
  }
}
