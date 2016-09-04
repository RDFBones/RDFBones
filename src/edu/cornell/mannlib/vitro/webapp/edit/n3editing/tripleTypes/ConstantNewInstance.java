package edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes;

import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.TripleCreator;

public class ConstantNewInstance extends Triple{

  public ConstantNewInstance(String subject, String predicate, String object, String classUri) {
    super(subject, predicate, object);
    // TODO Auto-generated constructor stub
    this.classUri = classUri;
  }
  
  public ConstantNewInstance(String subject, String predicate, String object, String classUri, String fromObject) {
    super(subject, predicate, object, fromObject);
    // TODO Auto-generated constructor stub
    this.classUri = classUri;
  }
  
  String classUri;
  @Override
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
    
    obj.put(this.newVarName, newObj);
    
    this.createTriple(creator, newObj);
    System.out.println(obj.toString());
    System.out.println("newVarName");
    System.out.println(this.newVarName);
    creator.process(obj, this.newVarName);
  }
 
  public String getClassUri(TripleCreator creator, JSONObject obj){
    
    return this.classUri;
 }  
 
}
