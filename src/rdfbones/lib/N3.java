package rdfbones.lib;

import java.util.List;

import org.json.JSONObject;

import rdfbones.graphData.Graph;
import rdfbones.rdfdataset.LiteralTriple;
import rdfbones.rdfdataset.Triple;

public class N3 {

	public static String getTriples(List<Triple> triples, JSONObject jsonObject){
	
		StringBuilder sb = new StringBuilder();
		for(Triple triple : triples){
			String subject = "<" + JSON.string(jsonObject, triple.subject.varName) + ">"; 
			String predicate = triple.predicate;
			String object = JSON.string(jsonObject, triple.object.varName); 
			if(!(triple instanceof LiteralTriple))
				object = "<" + object + ">";
			sb.append(new String(subject + "\t" + predicate + "\t" + object + " .\n"));
		}
		System.out.println("");
		return sb.toString();
	}
	
	public static void extendObject(JSONObject object, Graph graph){
		
		for(String mainInputNode : graph.mainInputNodes){
			JSON.put(object, mainInputNode, graph.mainGraph.mainInputValues.get(mainInputNode));
		}
	}
}
