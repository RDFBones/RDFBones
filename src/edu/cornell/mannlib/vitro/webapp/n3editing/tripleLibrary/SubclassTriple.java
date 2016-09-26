package edu.cornell.mannlib.vitro.webapp.n3editing.tripleLibrary;

import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triple;

public class SubclassTriple extends Triple{

  public SubclassTriple(){
    super("uri", "rdfs:subClassOf", "class");
  }
}