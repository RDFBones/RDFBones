package edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.TripleCreator;

public class Triple {

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

    // The variable coming from the TripleCreator class has to be loaded to the
    if (obj.get("type").equals("new")) {
      System.out.println("NewTriple");
      creator.createInstance(obj);
    }
    this.fixUri = obj.getString("uri");

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
          System.out.println("Array");
          for (int i = 0; i < obj.getJSONArray(k).length(); i++) {
            System.out.println("Array  " + i);
            JSONObject object = (JSONObject) obj.getJSONArray(k).get(i);
            System.out.println(object.toString());
            this.createTriple(creator, object);
            creator.process(object, this.newVarName);
          }
        } else { // It is a JSONObject
          System.out.println("Object");
          JSONObject object = (JSONObject) obj.get(k);
          this.createTriple(creator, object);
          creator.process(object, this.newVarName);
        }
      }
    }
    if (!found) {
      System.out.println("not found");
      System.out.println(this.newVarName);
      if(creator.inputData.has(this.newVarName)){
        System.out.println("global");
        String uri = creator.inputData.getString(this.newVarName); 
        System.out.println(uri);
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

}
