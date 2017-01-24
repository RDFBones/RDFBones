package rdfbones.rdfdataset;


public class LabelTriple extends Triple{

  public LabelTriple(String subject){
  	super(subject, "rdfs:label", subject + "Label");
    // TODO Auto-generated constructor stub
  }
  
  public LabelTriple(String subject, String object){
  	super(subject, "rdfs:label", object);
    // TODO Auto-generated constructor stub
  }
  
}
