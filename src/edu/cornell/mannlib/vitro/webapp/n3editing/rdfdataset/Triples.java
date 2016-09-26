package edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset;

import java.util.ArrayList;
import java.util.List;

import edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic.BonyDataSet2;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triple;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class Triples {

  public List<Triple> triples = new ArrayList<Triple>();
  
  private static final Log log = LogFactory.getLog(BonyDataSet2.class.getName());
  
  public String getTriples(){
     String t = new String("");
     for(Triple triple : this.triples){
       t += triple.getTriple();
     }
     return t;
  }
}
