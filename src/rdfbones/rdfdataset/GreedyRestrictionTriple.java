package rdfbones.rdfdataset;

public class GreedyRestrictionTriple extends RestrictionTriple{

  public GreedyRestrictionTriple(String subject, String predicate, String object){
    
    super(subject, predicate, object);
  }
  
  public GreedyRestrictionTriple(String subject, String predicate, String object, String restType){
    super(subject, predicate, object);
    this.restrictionType = restType;
  }
  
  public GreedyRestrictionTriple(RDFNode subject, String predicate, String object){

    super(subject, predicate, object);
  }
  
  public GreedyRestrictionTriple(RDFNode subject, String predicate, String object, String restType){

    super(subject, predicate, object);
    this.restrictionType = restType;
  }
  
  public GreedyRestrictionTriple(String subject, String predicate, RDFNode object){
    
    super(subject, predicate, object);
  }  
  
  public GreedyRestrictionTriple(RDFNode subject, String predicate, RDFNode object){
   
    super(subject, predicate, object);
  }
}
