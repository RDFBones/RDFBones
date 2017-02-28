package rdfbones.graphData;

import java.util.List;

import rdfbones.rdfdataset.Triple;

public class QueryInfo {

	public List<Triple> triples;
	public List<String> uris;
	public List<String> literals;
	
	public QueryInfo(List<Triple> triples, List<String> uris, List<String> literals){
		
		this.triples = triples;
		this.uris = uris;
		this.literals = literals;
	}
}
