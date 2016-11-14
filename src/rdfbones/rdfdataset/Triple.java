package rdfbones.rdfdataset;


public class Triple {

  public RDFNode subject;
  public RDFNode object;
  public String predicate;
  
  public Triple(String subject, String predicate, String object){
      
    this.subject = new RDFNode(subject);
    this.predicate = new String(predicate);
    this.object = new RDFNode(object);
  }
  
  public Triple(RDFNode subject, String predicate, String object){

    this.subject = subject;
    this.predicate = new String(predicate);
    this.object = new RDFNode(object);
  }
  
  public Triple(String subject, String predicate, RDFNode object){
    
    this.subject = new RDFNode(subject);
    this.predicate = new String(predicate);
    this.object = object;
  }  
  
  public Triple(RDFNode subject, String predicate, RDFNode object){
   
    this.subject = subject;
    this.predicate = new String(predicate);
    this.object = object;
  }
  
  public RDFNode getSubject() {
    return subject;
  }
  public void setSubject(RDFNode subject) {
    this.subject = subject;
  }
  public RDFNode getObject() {
    return object;
  }
  public void setObject(RDFNode object) {
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
      t += subject; 
    } else {
      t += "?" + subject;
    }
    
    String predicate = this.predicate;
    if(predicate.contains(":") || predicate.contains("<")){
      t += "\t" + predicate + "\t"; 
    } else {
      t += "\t?" + predicate + "\t";
    }
    
    String object = this.getObject().getVarName();
    if(object.contains(":") || object.contains("<")){
      t += object + "."; 
    } else {
      t += "?" + object + ".";
    }
    
    return t += "\n";
  }
}
