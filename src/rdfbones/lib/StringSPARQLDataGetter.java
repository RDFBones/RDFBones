package rdfbones.lib;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.Graph;

public class StringSPARQLDataGetter extends SPARQLDataGetter{

  private static final long serialVersionUID = 1L;
	String queryString;
	int numberOfInputs = 1;
	WebappConnector webapp = null;
	
	public StringSPARQLDataGetter(WebappConnector webapp, String queryString,
     List<String> uris, List<String> literals) {

	   this.webapp = webapp;
	   this.queryString = N3Utils.getQueryPrefixes() + "\n" + queryString;
	   setUrisLiterals(uris, literals);
	}
	 
	public StringSPARQLDataGetter(Graph mainGraph, String queryString,
     List<String> uris, List<String> literals) {

	  this.mainGraph = mainGraph;
	  this.webapp = mainGraph.getWebapp();
    this.queryString = N3Utils.getQueryPrefixes() + "\n" + queryString;
    setUrisLiterals(uris, literals);
	}
	
	public StringSPARQLDataGetter(Graph mainGraph, String queryString,
			List<String> uris, List<String> literals, int numberOfInputs) {

	  this.mainGraph = mainGraph;
		this.webapp = mainGraph.getWebapp();
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
		  if(str.contains(":") && N3Utils.prefixDef.containsKey(str.split(":")[0])){
	      this.queryString = this.queryString.replace("<input" + Integer.toString(n) + ">", str);
		  } else {
		    this.queryString = this.queryString.replace("input" + Integer.toString(n), str);
	    }
			n++;
		}
		return QueryUtils.getJSON(this.webapp.sparqlResult(queryString, this.urisToSelect,
				this.literalsToSelect));
	}

  public JSONObject getSingleResult(List<String> inputValues) {

    return  JSON.object(this.getJSON(inputValues), 0);
  }

  public JSONObject getSingleResult(String... inputValue) {

    return this.getSingleResult(ArrayLib.getList(inputValue));
  }
  
	public List<Map<String, String>> getData(List<String> inputValues) {

		this.inputValues = inputValues;
		return this.getData();
	}
}
