package rdfbones.graphData;

import java.util.List;

import rdfbones.rdfdataset.Triple;

public class UnionForm {

  public List<Triple> triples;
  public String greedyNode = null;
  
  public UnionForm(List<Triple> triples, String greedyNode){
    this.triples = triples;
    this.greedyNode = greedyNode;
  }
}

