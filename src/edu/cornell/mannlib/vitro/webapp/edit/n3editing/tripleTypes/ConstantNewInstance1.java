package edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes;

import java.util.Iterator;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.TripleCreator;

public class ConstantNewInstance1 extends Triple{

  private static final Log log = LogFactory.getLog(ConstantNewInstance1.class);

  
  public ConstantNewInstance1(String subject, String predicate, String object, String classUri) {
    super(subject, predicate, object);
    // TODO Auto-generated constructor stub
    this.classUri = classUri;
  }
  
  public ConstantNewInstance1(String subject, String predicate, String object, String classUri, String fromObject) {
    super(subject, predicate, object, fromObject);
    // TODO Auto-generated constructor stub
    this.classUri = classUri;
  }
  
  String classUri;
  
  public void createTriples(TripleCreator creator, String key, JSONObject obj) throws JSONException{

    /*
     * VarName is the node which we want to add to the existing
     */
    
    System.out.println("key");
    System.out.println(key);
    if(obj.has(key)){
      this.fixUri = ((JSONObject) obj.get(key)).getString("uri");
    } else {
      this.fixUri = obj.getString("uri");
    }
    
    JSONObject newObj = new JSONObject();
    
    newObj.put("uri", this.getClassUri(creator, obj));
    creator.createInstance(newObj);
    /*
     * The newly created object is set to the JSON object so that it
     * can be referenced by the further triples creation. 
     */
    obj.put(this.newVarName, newObj);
    
    this.createTriple(creator, newObj);

    creator.process(obj, this.newVarName);
  }
 
  public String getClassUri(TripleCreator creator, JSONObject obj){
    
    return this.classUri;
 }  
 
}
