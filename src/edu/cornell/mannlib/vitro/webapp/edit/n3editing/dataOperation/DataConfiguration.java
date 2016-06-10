package edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes.Triple;


public class DataConfiguration {

  public List<Map<String, String>> triplesToCreate = new ArrayList<Map<String,String>>();
  
  public JSONObject arrived;
  public List<Triple> triples;
  
  public DataConfiguration(JSONObject arrived){
    
  }
  
  public Object exploreJSONObject(JSONObject toExplore){
    
    Object a = new Object();
    
    return a;
  }
  
  public List<Triple> findTriple(String node){
    
    List<Triple> triples = new ArrayList<Triple>();
    for(Triple triple : this.triples){
      if(triple.subject.equals(node) || triple.object.equals(triple)){
        triples.add(triple);
      }
    }
    return triples;
  }
  
}
