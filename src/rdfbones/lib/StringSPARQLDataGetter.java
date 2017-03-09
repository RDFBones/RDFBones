package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Graph;
import rdfbones.graphData.QueryStructure;
import rdfbones.rdfdataset.LiteralTriple;
import rdfbones.rdfdataset.Triple;

public class StringSPARQLDataGetter extends SPARQLDataGetter{


	String queryString;
	int numberOfInputs;
	
	public StringSPARQLDataGetter(Graph mainGraph, String queryString,
			List<String> uris, List<String> literals, int numberOfInputs) {

		this.mainGraph = mainGraph;
		this.queryString = queryString;
		this.numberOfInputs = numberOfInputs;
		setUrisLiterals(uris, literals);
	}

	public JSONArray getJSON(String inputValue) {
		return this.getJSON(ArrayLib.getList(inputValue));
	}
	
	@Override
	public JSONArray getJSON(List<String> inputValues) {

		String query = new String("");
		int n = 1;
		for(String str : inputValues){
			this.query = this.query.replace("input" + Integer.toString(n), str);
			n++;
		}
		return QueryUtils.getJSON(this.mainGraph.getWebapp().sparqlResult(query, this.urisToSelect,
				this.literalsToSelect));
	}

	public List<Map<String, String>> getData(List<String> inputValues) {

		this.inputValues = inputValues;
		return this.getData();
	}

}
