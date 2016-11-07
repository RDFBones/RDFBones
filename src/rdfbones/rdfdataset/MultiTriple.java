package rdfbones.rdfdataset;


public class MultiTriple extends Triple{

  public MultiTriple(String subject, String predicate, String object) {
    super(subject, predicate, object);
    // TODO Auto-generated constructor stub
  }
  
  public MultiTriple(String subject, String predicate, RDFNode object) {
    super(subject, predicate, object);
    // TODO Auto-generated constructor stub
  }
  
  public MultiTriple(RDFNode subject, String predicate, String object) {
    super(subject, predicate, object);
    // TODO Auto-generated constructor stub
  }
  
  public MultiTriple(RDFNode subject, String predicate, RDFNode object) {
    super(subject, predicate, object);
    // TODO Auto-generated constructor stub
  }
}
