package rdfbones.rdfdataset;

public class ExistingRestrictionTriple extends Triple{

  public ExistingRestrictionTriple(String subject, String predicate, String object){
    
    super(subject, predicate, object);
  }
  
  public ExistingRestrictionTriple(RDFNode subject, String predicate, String object){

    super(subject, predicate, object);
  }
  
  public ExistingRestrictionTriple(String subject, String predicate, RDFNode object){
    
    super(subject, predicate, object);
  }  
  
  public ExistingRestrictionTriple(RDFNode subject, String predicate, RDFNode object){
   
    super(subject, predicate, object);
  }

}
