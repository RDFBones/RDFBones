package rdfbones.rdfdataset;

import rdfbones.lib.StringUtil;

public class RestrictionTriple extends Triple{

  String restrictionType = new String("owl:hasValue");
  String[] types;
  boolean multiTypes = false;
  
  public RestrictionTriple(Object subject, String predicate, Object object){
    
    super(subject, predicate, object);
  }
  
  public RestrictionTriple(Object subject, String predicate, Object object, String restType){
    super(subject, predicate, object);
    this.restrictionType = restType;
  }
 
  public RestrictionTriple(Object subject, String predicate, Object object, String[] types){
    super(subject, predicate, object);
    this.types = types;
    this.multiTypes = true;
  }
  
  public int i;
  
  @Override
  public String getTriple(){

    //It returns three triples
    String triples = new String();
    String restriction = new String("?R" + i + "_" + this.subject.varName);
    triples += "\t?" + this.subject.varName + " rdfs:subClassOf " + restriction + ".\n";
    triples += "\t" + restriction + " owl:onProperty " + this.predicate + ".\n";
    if(this.multiTypes){
    	String restType = " ?restrictionType" + i;
    	triples += "\t" + restriction + restType + " ?" + this.object.varName + ".\n";
  		triples += "\tFILTER (";
  		for(int i = 0; i < this.types.length; i++){
  			triples += restType + " = " + this.types[i] + " ||"; 
    	}
  		triples = StringUtil.cutFromEnd(triples, 2);
  		triples += ") .";
    } else {
      triples += "\t" + restriction + " " + this.restrictionType + " ?" + this.object.varName + ".\n"; 
    }
    return triples;
  }
  
  public void increment(){
    this.i++;
  }
}
