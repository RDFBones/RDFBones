package rdfbones.rdfdataset;

public class Triple {

  public RDFNode subject;
  public RDFNode object;
  public String predicate;
  public Boolean fromSubject;

  public Triple(Object subject, String predicate, Object object) {

    this.setSubject(subject);
    this.predicate = predicate;
    this.setObject(object);
  }

  public Triple(Object subject, String predicate, Object object, Boolean fromSubject) {

    this.setSubject(subject);
    this.predicate = predicate;
    this.setObject(object);
    this.fromSubject = fromSubject;
  }

  private void setSubject(Object subject) {
    if (subject instanceof RDFNode) {
      this.subject = (RDFNode) subject;
    } else {
      this.subject = new RDFNode((String) subject);
    }
  }

  private void setObject(Object object) {
    if (object instanceof RDFNode) {
      this.object = (RDFNode) object;
    } else if (object instanceof LiteralVariable) {
      this.object = (LiteralVariable) object;
    } else {
      this.object = new RDFNode((String) object);
    }
  }

  public String getTriple() {

    String t = new String();

    String subject = this.subject.getVarName();
    if (subject.contains(":") || subject.contains("<")) {
      t += subject;
    } else {
      t += "\t?" + subject;
    }

    String predicate = this.predicate;
    if (predicate.contains(":") || predicate.contains("<")) {
      t += "\t" + predicate + "\t";
    } else {
      t += "\t?" + predicate + "\t";
    }

    String object = this.object.getVarName();
    if (object.contains(":") || object.contains("<")) {
      t += object + ".";
    } else {
      t += "?" + object + ".";
    }

    return t += "\n";
  }
}
