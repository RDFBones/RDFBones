package rdfbones.rdfdataset;

public class RestrictionTriple extends Triple{

  String restrictionType = new String("owl:hasValue");
  
  public RestrictionTriple(String subject, String predicate, String object){
    
    super(subject, predicate, object);
  }
  
  public RestrictionTriple(String subject, String predicate, String object, String restType){
    super(subject, predicate, object);
    this.restrictionType = restType;
  }
  
  public RestrictionTriple(RDFNode subject, String predicate, String object){

    super(subject, predicate, object);
  }
  
  public RestrictionTriple(String subject, String predicate, RDFNode object){
    
    super(subject, predicate, object);
  }  
  
  public RestrictionTriple(RDFNode subject, String predicate, RDFNode object){
   
    super(subject, predicate, object);
  }
  
  public int i;
  
  @Override
  public String getTriple(){

    //It returns three triples
    String triples = new String();
    String restriction = new String("?R_" + this.subject.varName + "_" + i);
    triples += "\t?" + this.subject.varName + " rdfs:subClassOf " + restriction + ".\n";
    triples += "\t" + restriction + " owl:onProperty " + this.predicate + ".\n";
    triples += "\t" + restriction + " " + this.restrictionType + " ?" + this.object.varName + ".\n"; 
    return triples;
  }
  
  public void increment(){
    this.i++;
  }
}
