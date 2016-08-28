package edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.rdfbones.customExceptions.UnionTripleException;

public class UnionTriples extends Triples {

  
  private static final Log log = LogFactory.getLog(DataSet.class.getName());

  public List<Triple> additional = new ArrayList<Triple>();
  public String existing = new String();
  public String queryTriples = new String();
  public UnionTriples(List<Triple> triples){
    this.triples = triples;
    //Preprocess
    Integer index = 0;
    List<Integer> toRemove = new ArrayList<Integer>();
    for(Triple triple : this.triples){
      if(!triple.subject.varName.contains("@") && !triple.object.varName.contains("@")){
        this.additional.add(triple);
        log.info(index);
        toRemove.add(index);
      }
      index++;
    }
    //Remove elements from array - backward looping
    for(int counter = toRemove.size() - 1; counter >= 0; counter--){
      this.triples.remove(toRemove.get(counter).intValue());
    }
  }
  
  public String getAdditional(){
    String t = new String("");
    for(Triple triple : this.additional){
      t += triple.getTriple();
    }
    return t;
  }
  
  public List<String> getExisting(int cnt){
    
     List<String> existing = new ArrayList<String>();
     for(Triple triple : this.triples){
        if(triple.subject.varName.contains("@")){
          existing.add(triple.subject.varName.replace("@",""));
          triple.subject.varName = triple.subject.varName.replace("@", Integer.toString(cnt));
        }
        if(triple.object.varName.contains("@")){
          existing.add(triple.object.varName.replace("@", ""));
          triple.object.varName = triple.object.varName.replace("@", Integer.toString(cnt));
        }
      }
      if(existing.size() > 0){
        return existing;
      } else {
        throw new UnionTripleException("There is not variable with @ key!");
      }
  }
}
