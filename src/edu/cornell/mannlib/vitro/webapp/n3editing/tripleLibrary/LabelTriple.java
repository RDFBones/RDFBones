package edu.cornell.mannlib.vitro.webapp.n3editing.tripleLibrary;

import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triple;


public class LabelTriple extends Triple{

  public LabelTriple(){
     super("uri", "rdfs:label", "label");
  }
}