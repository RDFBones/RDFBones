package rdfbones.lib;

import java.util.List;

import rdfbones.graphData.Graph;
import rdfbones.rdfdataset.LabelTriple;
import rdfbones.rdfdataset.Triple;

public class LabelDataGetter extends SPARQLDataGetter{

  String key;
  public LabelDataGetter(Graph mainGraph) {

  	super();
  	this.mainGraph = mainGraph;
  	Triple triple = new LabelTriple("node");
  	this.inputKeys = ArrayLib.getList("node");
  	this.inputValues = this.inputKeys;
  	List<Triple> queryTriples = ArrayLib.getTripleList(triple);
  	this.setUrisLiterals(null, ArrayLib.getList("nodeLabel"));
  	this.initTriples(queryTriples);
  }
  
  public String getLabel(String nodeUri){
  	
  	if(this.getData(nodeUri).size() > 0){
  		return super.getData(nodeUri).get(0).get("nodeLabel");
  	} else {
  		return StringUtil.getClassLabel(nodeUri);
  	}
  }
}

