package rdfbones.rdfdataset;


public class Triple {

  public RDFNode subject;
  public RDFNode object;
  public String predicate;
  
  public Triple(Object subject, String predicate, Object object){
    
    this.setSubject(subject);
    this.predicate = predicate;
    this.setObject(object);
  }
  
  private void setSubject(Object subject){
    if(subject instanceof RDFNode){
      this.subject = (RDFNode) subject;
    } else {
      this.subject = new RDFNode((String) subject);
    }
  }
  
  private void setObject(Object object){
    if(object instanceof RDFNode){
      this.object = (RDFNode) object;
    } else {
      this.object = new RDFNode((String) object);
    }
  }
  
  public String getTriple(){
    
    String t = new String();
    
    String subject = this.subject.getVarName();
    if(subject.contains(":") || subject.contains("<")){
      t += subject; 
    } else {
      t += "\t?" + subject;
    }
    
    String predicate = this.predicate;
    if(predicate.contains(":") || predicate.contains("<")){
      t += "\t" + predicate + "\t"; 
    } else {
      t += "\t?" + predicate + "\t";
    }
    
    String object = this.object.getVarName();
    if(object.contains(":") || object.contains("<")){
      t += object + "."; 
    } else {
      t += "?" + object + ".";
    }
    
    return t += "\n";
  }
}
