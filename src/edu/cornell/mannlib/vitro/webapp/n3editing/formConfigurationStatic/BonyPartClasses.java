package edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.n3editing.tripleLibrary.LabelTriple;
import edu.cornell.mannlib.vitro.webapp.n3editing.tripleLibrary.SubclassTriple;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.RetrievedDataSet;

  
public class BonyPartClasses extends RetrievedDataSet{

  public BonyPartClasses(VitroRequest vreq){
    
    this.vreq = vreq;
    this.name = new String("bonyClasses");
    
    /*
     * uri, literal, inputParam
     */
    this.selectUris.add("uri");
    this.selectLiterals.add("label");
    //this.inputVars.add("class");
    
    this.filters.put("class", "http://purl.obolibrary.org/obo/FMA_29738");
    
    /*
     * Triples
     */
    this.triples.add(new SubclassTriple());
    this.triples.add(new LabelTriple());
  }
}  



