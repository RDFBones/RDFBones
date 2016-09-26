package edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset;

import com.hp.hpl.jena.rdf.model.Property;

import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.SPARQLNode;

public class Triple {

  public SPARQLNode subject;
  public SPARQLNode object;
  public String predicate;
  
  public Triple(String subject, String predicate, String object){
      
    this.subject = new SPARQLNode(subject);
    this.predicate = new String(predicate);
    this.object = new SPARQLNode(object);
  }
  
  public SPARQLNode getSubject() {
    return subject;
  }
  public void setSubject(SPARQLNode subject) {
    this.subject = subject;
  }
  public SPARQLNode getObject() {
    return object;
  }
  public void setObject(SPARQLNode object) {
    this.object = object;
  }
  public String getPredicate() {
    return predicate;
  }
  public void setPredicate(String predicate) {
    this.predicate = predicate;
  }
  
  public String getTriple(){
    
    String t = new String();
    
    String subject = this.getSubject().getVarName();
    if(subject.contains(":") || subject.contains("<")){
      t += "\t " + subject; 
    } else {
      t += "\t ?" + subject;
    }
    
    String predicate = this.predicate;
    if(predicate.contains(":") || predicate.contains("<")){
      t += " " + predicate + " "; 
    } else {
      t += " ?" + predicate + " ";
    }
    
    String object = this.getObject().getVarName();
    if(object.contains(":") || object.contains("<")){
      t += " " + object + " . \n"; 
    } else {
      t += " ?" + object + " . \n";
    }
    
    return t;
  }
}
