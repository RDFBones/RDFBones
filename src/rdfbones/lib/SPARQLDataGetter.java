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

public class SPARQLDataGetter {

	String queryTriples;
	String selectVars;
	String query;
	List<String> urisToSelect;
	List<String> literalsToSelect;
	String subject;
	String object;
	public List<String> inputValues = new ArrayList<String>();
	public List<String> inputKeys;
	public List<Triple> queryTripleList;
	public WebappConnector connector;
	public Graph mainGraph;
	public boolean typeRetriever = false;

	public SPARQLDataGetter(){
		
	}
	
	public SPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples,
			List<String> uris, List<String> literals, List<String> inputKeys) {

		this.init(mainGraph, queryTriples, uris, literals, inputKeys);
	}

	/*
	public SPARQLDataGetter(WebappConnector connector, List<Triple> queryTriples,
			List<String> uris, List<String> literals, List<String> inputKeys) {

		this.init(connector, queryTriples, uris, literals, inputKeys);
	} */

	public SPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples,
			List<String> uris, List<String> literals) {

		this.init(mainGraph, queryTriples, uris, literals, new ArrayList<String>());
	}

	public SPARQLDataGetter(Graph mainGraph, List<Triple> queryTriples,
			List<String> uris, List<String> literals, String inputKey) {

		this.init(mainGraph, queryTriples, uris, literals,
				ArrayLib.getList(inputKey));
	}

	public SPARQLDataGetter(WebappConnector webappConnector) {
		this.connector = webappConnector;
	}

	void init(WebappConnector connector, List<Triple> queryTriples,
			List<String> uris, List<String> literals, List<String> inputKeys) {

		this.connector = connector;
		this.inputKeys = inputKeys;
		this.inputValues = inputKeys;
		setUrisLiterals(uris, literals);
		initTriples(queryTriples);
	}

	void init(Graph mainGraph, List<Triple> queryTriples,
			List<String> uris, List<String> literals, List<String> inputKeys) {

		this.mainGraph = mainGraph;
		this.inputKeys = inputKeys;
		this.inputValues = inputKeys;
		setUrisLiterals(uris, literals);
		initTriples(queryTriples);
	}
	
	void setUrisLiterals(List<String> uris, List<String> literals) {

		this.urisToSelect = uris;
		if (literals == null) {
			literals = new ArrayList<String>();
		}
		if (uris == null) {
			uris = new ArrayList<String>();
		}
		this.urisToSelect = uris;
		this.literalsToSelect = literals;
	}

	void initTriples(List<Triple> queryTriples) {

		calcUrisLiterals(queryTriples);
		GraphLib.incrementRestrictionTriples(queryTriples);
		this.selectVars = SPARQLUtils.assembleSelectVars(this.urisToSelect,
				this.literalsToSelect);
		if (!GraphLib.containsGreedy(queryTriples)) {
			this.queryTriples = SPARQLUtils.assembleQueryTriples(queryTriples);
		} else {
			QueryStructure qs = new QueryStructure(queryTriples,
					this.inputKeys.get(0));
			this.queryTriples = qs.getQuery();
		}
	}

	public List<Map<String, String>> getData() {

		String query = this.getQuery();
		return this.mainGraph.getWebapp().sparqlResult(query, this.urisToSelect,
				this.literalsToSelect);
	}

	public List<Map<String, String>> getData(String value) {

		this.inputValues = ArrayLib.getList(value);
		return this.getData();
	}

	public JSONArray getJSON(List<String> inputValues) {

		return QueryUtils.getJSON(getData(inputValues));
	}

	public List<Map<String, String>> getData(List<String> inputValues) {

		this.inputValues = inputValues;
		return this.getData();
	}

	public String getQueryTriples() {

		String queryTriples = this.queryTriples;
		int i = 0;
		for (String inputKey : this.inputKeys) {
			queryTriples += "\tFILTER ( ?" + inputKey + " = <"
					+ this.inputValues.get(i) + "> ) . \n";
			i++;
		}
		return queryTriples;
	}

	public String getQuery() {
		String query = new String("");
		query += N3Utils.getQueryPrefixes();
		query += "\nSELECT DISTINCT ";
		query += this.selectVars;
		query += "\nWHERE { \n ";
		query += this.getQueryTriples();
		query += "\n } ";
		return query;
	}

	private void calcUrisLiterals(List<Triple> queryTriples) {

		if (this.urisToSelect == null) {
			this.urisToSelect = new ArrayList<String>();
			this.literalsToSelect = new ArrayList<String>();
			for (Triple triple : queryTriples) {
				if (triple instanceof LiteralTriple) {
					this.literalsToSelect.add(triple.object.varName);
				} else {
					ArrayLib.addDistinct(this.urisToSelect, triple.object.varName);
				}
				ArrayLib.addDistinct(this.urisToSelect, triple.subject.varName);
			}
		}
	}
}
