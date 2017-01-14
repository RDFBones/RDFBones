package rdfbones.lib;

import java.util.List;
import org.json.JSONObject;

import rdfbones.rdfdataset.Triple;

public class N3Lib {

	public static String getTriples(List<Triple> triples, JSONObject jsonObject){
	
		//System.out.println("Length : " + triples.size()); 
		StringBuilder sb = new StringBuilder();
		for(Triple triple : triples){
			String subject = JSON.string(jsonObject, triple.subject.varName); 
			String predicate = triple.predicate;
			String object = JSON.string(jsonObject, triple.object.varName); 
			sb.append(new String(subject + "\t" + predicate + "\t" + object + " .\n"));
		}
		System.out.println("");
		return sb.toString();
	}
}
