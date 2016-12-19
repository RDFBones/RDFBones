package rdfbones.rdfdataset;

public class QualifiedRestrictionTriple extends Triple{

  public QualifiedRestrictionTriple(Object subject, String predicate, Object object){
    
    super(subject, predicate, object);
  }
 
  public int i;
  
  @Override
  public String getTriple(){

    //It returns three triples
    String triples = new String();
    String restriction = new String("?R" + i + "_" + this.subject.varName);
    triples += "\t?" + this.subject.varName + " rdfs:subClassOf " + restriction + ".\n";
    triples += "\t" + restriction + " owl:onProperty " + this.predicate + ".\n";
    triples += "\t" + restriction + " owl:onClass ?" + this.object.varName + ".\n"; 
    return triples;
  }
  
  public void increment(){
    this.i++;
  }
}
