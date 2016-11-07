package rdfbones.rdfdataset;

import java.util.ArrayList;
import java.util.List;

import rdfbones.rdfdataset.Triple;

public class Triples {

  public List<Triple> triples = new ArrayList<Triple>();
  
  public String getTriples(){
     String t = new String("");
     for(Triple triple : this.triples){
       t += triple.getTriple();
     }
     return t;
  }
}
