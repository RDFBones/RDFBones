package edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic;

import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.RetrievedDataSet;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.RestrictionTriples;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triples;
import edu.cornell.mannlib.vitro.webapp.n3editing.tripleLibrary.LabelTriple;
import edu.cornell.mannlib.vitro.webapp.n3editing.tripleLibrary.SubclassTriple;

public class SubClassesDataSet {
  
  static RetrievedDataSet getDataSet(){
    
    /*
     * Now this part of the code is static. Later this will
     * arrive from RDF triples.
     */
   RetrievedDataSet dataSet = new RetrievedDataSet();
    
   dataSet.triples.add(new SubclassTriple());
   dataSet.triples.add(new LabelTriple());
   
   dataSet.inputVars.add(new String("class"));
   dataSet.selectUris.add(new String("uri"));
   dataSet.selectLiterals.add(new String("label"));
   return dataSet;
  }
    
}
