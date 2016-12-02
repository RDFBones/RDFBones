package rdfbones.rdfdataset;

public class OptionalTriple extends Triple{

  public OptionalTriple(Object subject, String predicate, Object object) {
    super(subject, predicate, object);
    // TODO Auto-generated constructor stub
  }

  @Override
  public String getTriple(){
    String triple = super.getTriple();
    return "\tOPTIONAL { " + triple.substring(1, triple.length() - 2 ) + " } \n" ;
  }
}
