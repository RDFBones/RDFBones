package rdfbones.rdfdataset;


public class LiteralTriple extends Triple{

  public LiteralTriple(Object subject, String predicate, String object) {
    super(subject, predicate, new LiteralVariable(object));
    // TODO Auto-generated constructor stub
  }

}
