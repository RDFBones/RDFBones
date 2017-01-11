package rdfbones.rdfdataset;

public class HasValueRestrictionTriple extends RestrictionTriple{

  public HasValueRestrictionTriple(Object subject, String predicate, Object object){
    
    super(subject, predicate, object);
    this.restrictionType = new String("owl:hasValue");
  }
}
