package rdfbones.lib;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import edu.cornell.mannlib.vitro.webapp.search.controller.DataTransformationAJAXController;

import rdfbones.graphData.Graph;
import rdfbones.rdfdataset.LabelTriple;
import rdfbones.rdfdataset.Triple;

public class LabelDataGetter extends SPARQLDataGetter{

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory
      .getLog(LabelDataGetter.class);
  
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

    if(nodeUri == null){
      return "label";
    } else {
      if(this.getData(nodeUri).size() > 0){
        return super.getData(nodeUri).get(0).get("nodeLabel");
      } else {
        return StringUtil.getClassLabel(nodeUri);
      }
    }
  }
}

