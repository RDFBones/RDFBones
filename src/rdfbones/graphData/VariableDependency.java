package rdfbones.graphData;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.graphData.GraphPath;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.DebugLib;
import rdfbones.lib.JSON;
import rdfbones.lib.SPARQLDataGetter;
import rdfbones.lib.UriLabelSPARQLDataGetter;
import rdfbones.rdfdataset.OptionalTriple;
import rdfbones.rdfdataset.Triple;

public class VariableDependency {

  public List<String> inputs;
  public SPARQLDataGetter dataGetter;
  public GraphPath path;
  public String varToGet;
  public Graph graph;
  FormGraph formGraph;
  
  public VariableDependency(Graph graph, GraphPath path, String varToGet) {

  	this.path = path;
    this.inputs = path.inputs;
    this.varToGet = varToGet;
    this.graph = graph;
  }
  
  public void extend(List<Triple> triples, String input){
  	this.inputs.add(input);
  	this.path.triples.addAll(triples);
  }
  
  public void extend(List<Triple> triples){
  	this.path.triples.addAll(triples);
  }
  
  public JSONArray getData(JSONObject inputs) {

  	List<String> inputData = new ArrayList<String>();
    for (String input : this.inputs) {
    	if(this.graph.mainInputValues.containsKey(input)){
    		inputData.add(this.graph.mainInputValues.get(input));
    	} else {
    		inputData.add(JSON.string(inputs, input));	
    	}
    }
    if(this.formGraph != null){
    	System.out.println("FormGraph is not null");
    	return this.formGraph.getData(this.dataGetter.getData(inputData));
    } else {
    	System.out.println("FormGraph is null");
    	System.out.println(this.dataGetter.queryTriples);
    	return QueryUtils.getJSON(this.dataGetter.getData(inputData)); 	
    }
  }

  public void initDataGetter(){
  	 path.triples.add(new OptionalTriple(varToGet, "rdfs:label", "label"));
  	 this.dataGetter =
         new UriLabelSPARQLDataGetter(this.graph, path.triples, varToGet, this.inputs);
  }
  
  public void initDataGetter(FormGraph formGraph){
  	
  	System.out.println("InitDataGetter");
  	this.formGraph = formGraph;
  	QueryInfo queryInfo = formGraph.queryInfo;
	  //queryInfo.triples.addAll(this.path.triples);
	  this.path.triples.addAll(queryInfo.triples);
	  queryInfo.uris.add(this.varToGet);
  	this.dataGetter = new SPARQLDataGetter(this.graph, this.path.triples, queryInfo.uris, 
  			queryInfo.literals, this.inputs);
	  DebugLib.logTripleList(queryInfo.triples, "QueryInfo Triples");
  }
  
  public String queryDebug() {
    return this.dataGetter.getQueryTriples();
  }
  
  public void debug(){
  	DebugLib.logTripleList("", this.dataGetter.mainGraph.webapp, this.path.triples);
  }
}
