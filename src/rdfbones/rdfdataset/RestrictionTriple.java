package rdfbones.rdfdataset;

public class RestrictionTriple extends Triple{

  public RestrictionTriple(String subject, String predicate, String object){
    
    super(subject, predicate, object);
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
  
  public int i = 0;
  
  
  @Override
  public String getTriple(){

    //It returns three triples
    String triples = new String();
    String restriction = new String("?R_" + this.subject.varName + "_" + i);
    triples += "\t?" + this.subject.varName + " rdfs:subClassOf " + restriction + ".\n";
    triples += "\t" + restriction + " owl:onProperty " + this.predicate + ".\n";
    triples += "\t" + restriction + " owl:hasValue " + "?" + this.object.varName + ".\n"; 
    return triples;
  }
  
  public void increment(){
    this.i++;
  }
}
