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
import rdfbones.formProcessing.WebappConnector;

public class FormGraph extends Graph {

	public Table table;
	
	public FormGraph(List<Triple> triples, String startNode) {

		//this.mainGraph = this;
		this.inputNode = startNode;
		this.initialize(triples);
		this.initGraphStructure();
	}

	public FormGraph(Triple triple, String inputNode, List<Triple> triples) {
	
		super(triple, inputNode, triples);
	}

	public JSONArray getTableData(JSONArray jsonArray) {

		this.existingData = new JSONArray();
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject object = QueryUtils.getJSONObject(this.dataRetriever
					.getData(JSON.getStr(jsonArray, i)));
			this.existingData.put(object);
		}
		this.getGraphData();
		return this.existingData;
	}

	public void initialize(List<Triple> triples) {
		this.initialGraphMap = new HashMap<RDFNode, Graph>();
		List<Triple> neighbours = GraphLib.getAndRemoveTriples(triples,
				this.inputNode);
		for (Triple triple : neighbours) {
			RDFNode node = GraphLib.getObjectNode(triple, this.inputNode);
			initialGraphMap.put(node, new FormGraph(triple, node.varName, triples));
		}
	}

	public void initGraphStructure() {
		this.initGraphMap(this);
	}

	
	@Override
	public void initGraphMap(Graph graph) {

	  for (RDFNode key : this.initialGraphMap.keySet()) {
			Graph subGraph = this.initialGraphMap.get(key);
			Triple triple = subGraph.triple;
			if (triple instanceof MultiTriple) {
				subGraph.inputNode = GraphLib.getObject1(triple, key.varName);
				subGraph.inputPredicate = triple.predicate;
				subGraph.mainGraph = graph.mainGraph;
				subGraph.dataTriples.add(triple);
				subGraph.initGraphStructure();
				graph.subGraphs.put(QueryLib.getPredicateKey(triple.predicate),
						(FormGraph) subGraph);
			} else {
				graph.dataTriples.add(triple);
				subGraph.initGraphMap(graph);
			}
		}
		this.dataRetriever = new SPARQLDataGetter(mainGraph, this.dataTriples,
				GraphLib.getUris(this.dataTriples),
				GraphLib.getLiterals(this.dataTriples), this.inputNode);
	}
	
	public void setMainGraph(Graph graph){
		this.mainGraph = graph;
		this.dataRetriever.mainGraph = graph;
		for(String key : this.subGraphs.keySet()){
			((FormGraph) this.subGraphs.get(key)).setMainGraph(graph);
		}
	}
	
}
