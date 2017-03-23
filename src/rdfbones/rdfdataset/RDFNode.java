package rdfbones.rdfdataset;

import java.util.ArrayList;
import java.util.List;

public class RDFNode {

  public RDFNode(String varName){
    this.varName = varName;
  }
  
  public String varName;
  public String constantValue;
  public List<Triple> triples = new ArrayList<Triple>();
  
  public String getVarName() {
    return varName;
  }

  public void setVarName(String varName) {
    this.varName = varName;
  }
  
  public void addTriple(Triple triple){
  	this.triples.add(triple);
  }
  
  public RDFNode getNext(RDFNode node){
  
  	// node ---- this ---- next 
  	for(Triple triple : this.triples){
  		if(triple.getObject(this).varName != node.varName){
  			return triple.getObject(this);
  		}
  	}
  	return null;
  }
  
  public Triple nextTriple(RDFNode node){
    
  	// node ---- this ---- next 
  	for(Triple triple : this.triples){
  		if(triple.getObject(this).varName != node.varName){
  			return triple;
  		}
  	}
  	return null;
  }
}


