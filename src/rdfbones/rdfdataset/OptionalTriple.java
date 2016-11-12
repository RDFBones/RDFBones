package rdfbones.rdfdataset;

public class OptionalTriple extends Triple{

  public OptionalTriple(RDFNode subject, String predicate, RDFNode object) {
    super(subject, predicate, object);
    // TODO Auto-generated constructor stub
  }

  public OptionalTriple(String subject, String predicate, String object){
    
    super(subject, predicate, object);
  }
  
  public OptionalTriple(RDFNode subject, String predicate, String object){

    super(subject, predicate, object);
  }
  
  public OptionalTriple(String subject, String predicate, RDFNode object){
    
    super(subject, predicate, object);
  }  

}
