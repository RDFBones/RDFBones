package rdfbones.graphData;

import java.util.ArrayList;
import java.util.List;

import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.Triple;

public class SubGraphInfo {

  public List<Triple> triples = new ArrayList<Triple>();
  public List<String> nodes = new ArrayList<String>();
  public String greedyNode = null;
  
  public void resetNodes(){
    this.nodes = new ArrayList<String>();
  }
}
