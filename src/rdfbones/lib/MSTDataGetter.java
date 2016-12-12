package rdfbones.lib;

import java.util.List;

import rdfbones.graphData.Graph;
import rdfbones.rdfdataset.Triple;

public class MSTDataGetter extends SPARQLDataGetter{

  String key;
  public MSTDataGetter(Graph mainGraph, Triple triple) {

    super(mainGraph, ArrayLib.getTripleList(triple), ArrayLib.getList(triple.object.varName),
        null);
    this.key = triple.object.varName;
  } 
  
  public String getType(String input){
    return super.getData(input).get(0).get(this.key);
  }
 }

