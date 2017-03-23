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
	List<Triple> triples;
	SPARQLDataGetter formDataRetriever = null;
	public QueryInfo queryInfo;

	public FormGraph(String varName, List<Triple> triples, Table table) {
		
		this.varName = varName;
		this.triples = triples;
		this.table = table;
		this.nodes = GraphLib.getNodes(this.triples);
		this.setQueryInfo();
	}
	
	public JSONArray getData(List<Map<String, String>> data){
		return QueryUtils.getJSON(data);
	}
	
	public void setQueryInfo(){
		
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
	}
	
	public JSONObject getDescriptor(){
		return this.table.getDescriptor();
	}
}
