package rdfbones.rdfdataset;

public class GreedyRestrictionTriple extends RestrictionTriple{

  public GreedyRestrictionTriple(Object subject, String predicate, Object object){
    
    super(subject, predicate, object);
  }
  
  public GreedyRestrictionTriple(Object subject, String predicate, Object object, String restType){
    super(subject, predicate, object);
    this.restrictionType = restType;
  }
}
