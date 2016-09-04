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
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triples;

public class Triple1 extends Triple{

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory.getLog(Triple1.class);
  
  public String subject;
  public String predicate;
  public String object;
  public String newVarName;
  public String fixUri;
  public boolean inverse;
  
  public String from;
  //public boolean fromObject;
  //public boolean fromBoth;

  public Triple1(String subject, String predicate, String object) {
    super(subject, predicate, object);
  }

  public Triple1(String subject, String predicate, String object,
      String from) {
    super(subject, predicate, object, from);
  }

  public boolean valid(String key) {

    /*
     * Key is the starting variable to the triple
     */
    
    switch(this.from){
    
    case "all" :
        return true;
    case "object" :
        if (key.equals(this.object)) {
          return true;
        } else {
          return false;
        }
    case "subject":
        if (key.equals(this.subject)) {
          return true;
        } else {
          return false;
        }
     default :
        return false;
    }
    
  }

  public void createTriples(TripleCreator creator, String key, JSONObject obj)
    throws JSONException {

    /*
     * Triple is not necessarily creates the triple.
     * It gets the incoming object and the main object
     * and if the to' has not been found no triple
     * is created.
     */
    
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
    // to the object'

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
      //We have to check if the object' is defined in the 
      //input JSON object
      if(creator.inputData.has(this.newVarName)){
        log.info("global");
        //It is simple string not an object
        Object in = creator.inputData.get(this.newVarName);
        String uri = new String();
        if(in instanceof JSONObject){
          log.info("JSONObject");
          uri = ((JSONObject) in).getString("uri");
        } else {
          //Simple string
          log.info("STRING");
          uri = in.toString();
        }
        
        log.info(uri);
        JSONObject glob = new JSONObject();
        glob.put("uri", uri);
        glob.put("type", "existing");
        this.createTriple(creator, glob);
      } 
    } 
    
    //The peculiarity of the ConstantNewInstance that it does not need
    //input JSON object. So if there is a ConstantNewInstance whose subject'
    // is the this.newVar (object`) then we have to continoue the triples generation
    creator.process(obj, this.newVarName);
    
    /*
     * If the object' was retrieved from the global input data
     * then there is not further processing right now. 
     * @Task
     * Figure out a use case where this could be useful
     */
  }

  public void createTriple(TripleCreator creator, JSONObject obj)
    throws JSONException {

    if (obj.get("type").equals("new")) {
      creator.createInstance(obj);
    }

    switch(this.from){
      
    case "object" : 
      creator.createTriple(obj.getString("uri"), this.predicate, this.fixUri);
      break;
    case "subject" :
      creator.createTriple(this.fixUri, this.predicate, obj.getString("uri"));
      break;
    default :
      break;
    }
  }
  
  public void logMe(){
    
    log.info(this.subject + "  " + this.predicate + "  " + this.object);
  }

}
