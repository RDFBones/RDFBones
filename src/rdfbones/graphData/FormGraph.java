package rdfbones.graphData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.DebugLib;
import rdfbones.lib.GraphLib;
import rdfbones.lib.JSON;
import rdfbones.lib.MainGraphSPARQLDataGetter;
import rdfbones.lib.QueryLib;
import rdfbones.lib.SPARQLDataGetter;
import rdfbones.lib.SPARQLUtils;
import rdfbones.lib.StringUtil;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.Triple;
import rdfbones.table.Table;
import rdfbones.table.TableCell;
import rdfbones.formProcessing.WebappConnector;

public class FormGraph extends Graph {

	public Table table = null;
	public Navigator navigator;
	List<Triple> triples;
	SPARQLDataGetter formDataRetriever = null;
	public QueryInfo queryInfo;


	public FormGraph() {
		
	}
	
	public FormGraph(List<Triple> triples, String startNode, Navigator navigator,
		Table table) {

		this.varName = startNode;
		this.triples = triples;
		this.navigator = navigator;
		this.table = table;
		this.init();
	}

	public JSONArray getData(List<Map<String, String>> data){
		
		if(this.navigator != null){
			return this.navigator.group(data);
		} else {
			return QueryUtils.getJSON(data);
		}
	}
	
	public FormGraph(Triple triple, String varName, List<Triple> triples) {
	
		super(triple, varName, triples);
	}
	
	public void init(){
		this.nodes = GraphLib.getNodes(this.triples);
		System.out.println("MainGraphNodes : " + this.nodes.toString());
		this.setFormGraph(this);
		this.setQueryInfo();
	}
	
	public void setFormGraph(FormGraph graph){
		
		if(this.navigator != null){
			this.navigator.formGraph = graph;
			this.navigator.setFormGraph(graph);
		}
	}
	
	public void setQueryInfo(){
		
  	this.triples.addAll(this.navigator.getTriples());
		List<String> uris = new ArrayList<String>();
		List<String> literals = new ArrayList<String>();
		this.setUrisLiterals(uris, literals);
		this.queryInfo = new QueryInfo(this.triples, uris, literals);
	}
	
	public void setUrisLiterals(List<String> uris, List<String> literals){
		
		//Setting literals
		for(TableCell cell : this.table.cells){
			literals.add(cell.varName);
		}
		uris.add(this.varName);
		if(this.navigator != null){
			this.navigator.setUrisLiterals(uris, literals);
		}
	}
	
	public JSONObject getDescriptor(){
		
		if(this.navigator != null){
			System.out.println("Here 1");
			return this.navigator.getDescriptor(this.table.getDescriptor());
		} else {
			System.out.println("Here 2");
			return this.table.getDescriptor();
		}
	}
	
	public JSONArray group(List<Map<String, String>> list){
		
		JSONArray array = JSON.arr();
		Map<String, List<Map<String, String>>> map = QueryLib.groupBy(list, this.varName);
		for(String key : map.keySet()){
			JSONObject object = QueryLib.getObject(map, key, this.nodes);
			array.put(object);
		}
		return array;
	}
	
}
