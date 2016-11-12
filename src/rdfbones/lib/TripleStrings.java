package rdfbones.lib;

public class TripleStrings {

  public TripleStrings(String subject, String predicate, String object){
    
    this.subject = subject;
    this.predicate = predicate;
    this.object = object;
  }
  
  public String getSubject() {
    return subject;
  }
  public void setSubject(String subject) {
    this.subject = subject;
  }
  public String getPredicate() {
    return predicate;
  }
  public void setPredicate(String predicate) {
    this.predicate = predicate;
  }
  public String getObject() {
    return object;
  }
  public void setObject(String object) {
    this.object = object;
  }

  String subject;
  String predicate;
  String object;
}
