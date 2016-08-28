package edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic;

import java.util.ArrayList;
import java.util.List;


import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triple;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.RetrievedDataSet;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.RestrictionTriples;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triples;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.UnionTriples;
import edu.cornell.mannlib.vitro.webapp.n3editing.tripleLibrary.LabelTriple;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class BonyDataSet2 {
  
  private static final Log log = LogFactory.getLog(BonyDataSet2.class.getName());
  
  static RetrievedDataSet getDataSet(){
    
    /*
     * Now this part of the code is static. Later this will
     * arrive from RDF triples.
     */
    RetrievedDataSet dataSet = new RetrievedDataSet();
    Triples triples1 = new RestrictionTriples("boneOrgan", 
        "<http://purl.obolibrary.org/obo/fma#systemic_part_of>", "class", 1);
    Triples triples2 = new RestrictionTriples("uri",
        "<http://purl.obolibrary.org/obo/fma#constitutional_part_of>", "boneOrgan", 2);
    
    LabelTriple triple2 = new LabelTriple();
    
    List<Triple> unionTriples = new ArrayList<Triple>();
    unionTriples.add(new Triple("uri", "rdfs:subClassOf", "uri@"));
    unionTriples.add(new Triple("uri", "rdfs:label", "label"));

    dataSet.unionTripes.add(new UnionTriples(unionTriples));
    
    dataSet.triples.add(triple2);
    
    dataSet.inputVars.add(new String("class"));
    dataSet.multiTriples.add(triples1);
    dataSet.multiTriples.add(triples2);
    
    dataSet.selectUris.add(new String("uri"));
    dataSet.selectLiterals.add(new String("label"));
    
    return dataSet;
  }

}
