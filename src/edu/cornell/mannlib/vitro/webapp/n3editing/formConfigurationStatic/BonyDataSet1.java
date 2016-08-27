package edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic;

import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.RetrievedDataSet;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.RestrictionTriples;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triple;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triples;
import edu.cornell.mannlib.vitro.webapp.n3editing.tripleLibrary.LabelTriple;

public class BonyDataSet1 {
  
  static RetrievedDataSet getDataSet(){
    
    /*
     * Now this part of the code is static. Later this will
     * arrive from RDF triples.
     */
    RetrievedDataSet dataSet = new RetrievedDataSet();
    Triples triples1 = new RestrictionTriples("skeletalDivision", 
        "<http://purl.obolibrary.org/obo/fma#systemic_part_of>", "class", 1);
    Triples triples2 = new RestrictionTriples("boneOrgan", 
        "<http://purl.obolibrary.org/obo/fma#systemic_part_of>", "skeletalDivision", 2);
    Triples triples3 = new RestrictionTriples("uri", 
        "<http://purl.obolibrary.org/obo/fma#constitutional_part_of>", "boneOrgan", 3);
    
    Triple triple1 = new LabelTriple();
    
    dataSet.triples.add(triple1);
    
    dataSet.multiTriples.add(triples1);
    dataSet.multiTriples.add(triples2);
    dataSet.multiTriples.add(triples3);
    
    dataSet.inputVars.add(new String("class"));
    
    dataSet.selectUris.add(new String("uri"));
    dataSet.selectLiterals.add(new String("label"));
    
    return dataSet;
  }

}
