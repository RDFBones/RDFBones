package rdfbones.graphData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.lib.ArrayLib;
import rdfbones.lib.GraphLib;
import rdfbones.lib.JSON;
import rdfbones.lib.QueryLib;
import rdfbones.rdfdataset.LabelTriple;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.Triple;
import rdfbones.rdfdataset.Triples;
import rdfbones.table.DefaultTable;
import rdfbones.table.Table;
import rdfbones.table.TableCell;

public class Navigator extends FormGraph{

	public MultiTriple multiTriple;
	public String predicate;
  FormGraph formGraph;

  
	public Navigator(String varName, MultiTriple multiTriple) {

		List<Triple> triples = new ArrayList<Triple>();
		triples.add(new LabelTriple(varName));
		this.triples = triples;
		this.multiTriple = multiTriple;
		this.predicate = multiTriple.predicate;
		this.varName = varName;
		this.init();
	}

	public Navigator(String varName, MultiTriple multiTriple, Table table) {

		this(varName, multiTriple);
		this.table = table;
	}
	
	public Navigator(String varName, MultiTriple multiTriple, Navigator navigator) {

		this(varName, multiTriple);
		this.navigator = navigator;
	}

	public Navigator(String varName, MultiTriple multiTriple, Navigator navigator, Table table) {

		this(varName, multiTriple);
		this.navigator = navigator;
		this.table = table;
	}

	public void settings(String type, String title){
		this.table = new DefaultTable(this.varName, title);
		this.triples.add(new Triple(this.varName, "rdf:type", type));
	}
	
	@Override
	public void init(){
		this.nodes = GraphLib.getNodes(this.triples);
		ArrayLib.remove(this.nodes, this.varName);
	}
	

	
	public void errorCheck(){
		
		if(!this.multiTriple.subject.varName.equals(this.varName)
					&& !this.multiTriple.object.varName.equals(this.varName)){
			//Implemented later
		}
	}
	
	public JSONObject getDescriptor(JSONObject formGraphDescriptor){

		JSONObject descriptor = JSON.obj();
		JSON.put(descriptor, "type", "navigator");
		//JSON.put(descriptor, "title", this.varName + "Label");
		JSON.put(descriptor, "dataKey", this.varName);
		JSON.put(descriptor, "predicate", QueryLib.getPredicateKey(this.multiTriple.predicate));
		JSON.put(descriptor, "table", this.table.getDescriptor());
		//System.out.print("Navigator!  VarName : " + this.varName + "\n\n");

		if(this.navigator != null){
			JSON.put(descriptor, "subForm", this.navigator.getDescriptor(formGraphDescriptor));
		} else {
			JSONObject subForm = new JSONObject();
			JSON.put(subForm, "table", formGraphDescriptor);
			JSON.put(descriptor, "subForm", subForm);
		}
		return descriptor;
	}
	
	public List<Triple> getTriples(){
		
		List<Triple> triples = new ArrayList<Triple>();
		triples.addAll(this.triples);
		triples.add(this.multiTriple);
		if(this.navigator != null){
			triples.addAll(this.navigator.getTriples());
			return triples;
		} else {
			return triples;
		}
	}
	
	public JSONArray group(List<Map<String, String>> list){
		
		JSONArray array = JSON.arr();
		Map<String, List<Map<String, String>>> map = QueryLib.groupBy(list, this.varName);
		for(String key : map.keySet()){
			JSONObject object = QueryLib.getObject(map, key, this.nodes);
			JSON.put(object, this.varName, key);
			if(this.navigator != null){
				JSON.put(object, QueryLib.getPredicateKey(this.predicate), this.navigator.group(map.get(key)));	
			} else {
				//String predicate = GraphLib.getObject(this.multiTriple, this.varName);
				JSON.put(object, QueryLib.getPredicateKey(this.predicate), this.formGraph.group(map.get(key)));	
				
			}
			array.put(object);
		}
		return array;
	}
	
	
}