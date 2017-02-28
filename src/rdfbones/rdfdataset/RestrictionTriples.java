package rdfbones.rdfdataset;

public class RestrictionTriples extends Triples{

  public RestrictionTriples(String subClass, String property, String claas, int num){
    
    String restriction = new String("restriction" + Integer.toString(num));
    Triple t1 = new Triple(subClass, "rdfs:subClassOf", restriction);
    Triple t2 = new Triple(restriction, "owl:onProperty", property);
    Triple t3 = new Triple(restriction, "owl:someValuesFrom", claas);
    this.triples.add(t1);
    this.triples.add(t2);
    this.triples.add(t3);
  } 
}
  
  
