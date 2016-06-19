package edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;




import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.TripleCreator;

public class Triple {

  
  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(Triple.class);
  
  
  public String subject;
  public String predicate;
  public String object;
  public String newVarName;
  public String fixUri;
  public boolean inverse;
  public boolean fromObject;

  public Triple(String subject, String predicate, String object) {
    this.subject = subject;
    this.predicate = predicate;
    this.object = object;
    this.fromObject = false;
    this.newVarName = this.object;
  }

  public Triple(String subject, String predicate, String object,
      boolean fromObject) {
    this.subject = subject;
    this.predicate = predicate;
    this.object = object;
    this.fromObject = fromObject;
    this.newVarName = this.subject;
  }

  public List<Triple> getTripleToCreate() {

    List<Triple> triple = new ArrayList<Triple>();
    return triple;
  }

  public boolean valid(String key) {

    /*
     * Key is the starting variable to the triple
     */
    if (this.fromObject) {
      if (key.equals(this.object)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (key.equals(this.subject)) {
        return true;
      } else {
        return false;
      }
    }
  }

  public void createTriples(TripleCreator creator, String key, JSONObject obj)
    throws JSONException {

    
    this.logMe();
    // The variable coming from the TripleCreator class has to be loaded to the
    if (obj.get("type").equals("new")) {
     log.info("NewTriple");
      creator.createInstance(obj);
    } else {
      log.info("error");
    }
    
    this.fixUri = obj.getString("uri");
    /*
     * Check if the uri is not a variable in the object
     */
    Iterator<String> keys1 = obj.keys();
    while (keys1.hasNext()) {
      String k = keys1.next();
      if (k.equals(key)) {
        this.fixUri = obj.getJSONObject(k).getString("uri");
      }
    }
    
    // Second check if any of the fields of the obj or global variable is equal
    // to the

    boolean found = false;
    Iterator<String> keys = obj.keys();
    while (keys.hasNext()) {
      // If the object has to be new then we create it to new
      String k = keys.next();
      if (k.equals(this.newVarName)) {
        found = true;
        if (obj.get(k) instanceof JSONArray) {
          /*
           * This default triples can create more triple at the same time
           */
         log.info("Array");
          for (int i = 0; i < obj.getJSONArray(k).length(); i++) {
           log.info("Array  " + i);
            JSONObject object = (JSONObject) obj.getJSONArray(k).get(i);
           log.info(object.toString());
            this.createTriple(creator, object);
            creator.process(object, this.newVarName);
          }
        } else { // It is a JSONObject
          log.info("Object");
          JSONObject object = (JSONObject) obj.get(k);
          this.createTriple(creator, object);
          creator.process(object, this.newVarName);
        }
      }
    }
    if (!found) {
     log.info("not found");
     log.info(this.newVarName);
      if(creator.inputData.has(this.newVarName)){
       log.info("global");
        String uri = creator.inputData.getString(this.newVarName); 
       log.info(uri);
        JSONObject glob = new JSONObject();
        glob.put("uri", uri);
        glob.put("type", "existing");
        this.createTriple(creator, glob);
      }
    } 
  }

  public void createTriple(TripleCreator creator, JSONObject obj)
    throws JSONException {

    if (obj.get("type").equals("new")) {
      creator.createInstance(obj);
    }

    if (this.fromObject) {
      creator.createTriple(obj.getString("uri"), this.predicate, this.fixUri);
    } else {
      creator.createTriple(this.fixUri, this.predicate, obj.getString("uri"));
    }
  }
  
  public void logMe(){
    
    log.info(this.subject + "  " + this.predicate + "  " + this.object);
  }

}
