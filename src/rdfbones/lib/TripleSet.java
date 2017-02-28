package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class TripleSet {

  private List<TripleStrings> triples = new ArrayList<TripleStrings>();

  public TripleSet(String tripleString){
    String[] tripleArray = tripleString.split("\\.");
    for(int i = 0; i < tripleArray.length; i++){
      String[] triple = tripleArray[i].split("\t");
      this.triples.add(new TripleStrings(triple[0], triple[1], triple[2]));
    }
  }
  
  public JSONArray getJSON() throws JSONException{
    
    JSONArray toReturn = new JSONArray();
    for(TripleStrings triple : this.triples){
      JSONObject tripleObject = new JSONObject();
      tripleObject.put("subject", triple.getSubject()); 
      tripleObject.put("predicate", triple.getPredicate()); 
      tripleObject.put("object", triple.getObject()); 
      toReturn.put(tripleObject);
    }
    return toReturn;
  }
  
  public void javaDebug(){
    for(TripleStrings triple : this.triples){
      //log.info(triple.getSubject() + "\t" + triple.getPredicate() + "\t" + triple.getObject());
    }
  }
}
