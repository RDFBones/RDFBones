package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.search.controller.DataTransformationAJAXController;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Graph;
import rdfbones.graphData.QueryStructure;
import rdfbones.rdfdataset.LiteralTriple;
import rdfbones.rdfdataset.Triple;

public class StringSPARQLDataGetter extends SPARQLDataGetter{

  private static final long serialVersionUID = 1L;
  private static final Log log = LogFactory
      .getLog(StringSPARQLDataGetter.class);
	String queryString;
	int numberOfInputs;
	
	public StringSPARQLDataGetter(Graph mainGraph, String queryString,
			List<String> uris, List<String> literals, int numberOfInputs) {

		this.mainGraph = mainGraph;
		this.queryString = N3Utils.getQueryPrefixes() + "\n" + queryString;
		this.numberOfInputs = numberOfInputs;
		setUrisLiterals(uris, literals);
	}

	public JSONArray getJSON(String inputValue) {
		return this.getJSON(ArrayLib.getList(inputValue));
	}
	
	@Override
	public JSONArray getJSON(List<String> inputValues) {

		int n = 1;
		for(String str : inputValues){
			this.queryString = this.queryString.replace("input" + Integer.toString(n), str);
			n++;
		}
		return QueryUtils.getJSON(this.mainGraph.getWebapp().sparqlResult(queryString, this.urisToSelect,
				this.literalsToSelect));
	}

  public JSONObject getSingleResult(List<String> inputValues) {

    return  JSON.object(this.getJSON(inputValues), 0);
  }
	
	public List<Map<String, String>> getData(List<String> inputValues) {

		this.inputValues = inputValues;
		return this.getData();
	}

}
