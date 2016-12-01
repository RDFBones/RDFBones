package rdfbones.rdfdataset;

public class RestrictionTriple extends Triple{

  String restrictionType = new String("owl:hasValue");
  
  public RestrictionTriple(Object subject, String predicate, Object object){
    
    super(subject, predicate, object);
  }
  
  public RestrictionTriple(Object subject, String predicate, Object object, String restType){
    super(subject, predicate, object);
    this.restrictionType = restType;
  }
 
  public int i;
  
  @Override
  public String getTriple(){

    //It returns three triples
    String triples = new String();
    String restriction = new String("?R" + i + "_" + this.subject.varName);
    triples += "\t?" + this.subject.varName + " rdfs:subClassOf " + restriction + ".\n";
    triples += "\t" + restriction + " owl:onProperty " + this.predicate + ".\n";
    triples += "\t" + restriction + " " + this.restrictionType + " ?" + this.object.varName + ".\n"; 
    return triples;
  }
  
  public void increment(){
    this.i++;
  }
}
