package rdfbones.graphData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import rdfbones.lib.DebugLib;
import rdfbones.lib.GraphLib;
import rdfbones.lib.JSON;
import rdfbones.lib.MainGraphSPARQLDataGetter;
import rdfbones.lib.N3;
import rdfbones.lib.QueryLib;
import rdfbones.lib.SPARQLDataGetter;
import rdfbones.lib.SPARQLUtils;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.Triple;
import rdfbones.form.ExistingInstanceSelector;
import rdfbones.form.FormConfiguration;
import rdfbones.formProcessing.WebappConnector;

public class Graph {

	// Input
	public String varName;
	public Triple triple = null;
	public String inputPredicate = null;
	public String firstNode = null;
	
	// Triples
	public List<Triple> dataTriples = new ArrayList<Triple>();
	public List<Triple> typeTriples = new ArrayList<Triple>();
	public List<Triple> schemeTriples;

	public List<String> nodes;
	public List<String> typeNodes;

	// Data Input - Storage
	public List<Triple> triplesToStore;
	public List<String> newInstances;
	public List<String> instances;
	public List<String> inputInstances;
	public List<String> constantLiterals;
	public List<String> inputLiterals;
	public List<String> inputClasses;
	public List<String> mainInputNodes;
	public List<String> formNodes = new ArrayList<String>();
	public List<String> nodesAsInput = new ArrayList<String>();
	public Map<String, String> mainInputValues;
	public Map<String, String> calculatedMainInputs;

	// Data Input - type query
	public List<String> classesToSelect;
	public List<Triple> typeQueryTriples;

	// Data Retrival
	public List<Triple> dataRetreivalQuery;
	public List<String> urisToSelect;
	public List<String> literalsToSelect;

	public Map<RDFNode, Graph> initialGraphMap;
	public Map<String, Graph> graphCache = new HashMap<String, Graph>();
	public Map<String, Graph> graphMap;
	public Map<String, List<Triple>> nodeMap;
	public Map<String, Graph> subGraphs = new HashMap<String, Graph>();
	public Map<String, Graph> optionalGraphs = new HashMap<String, Graph>();
	public Map<String, Graph> nodeGraphMap;

	public Map<String, VariableDependency> variableDependencies = new HashMap<String, VariableDependency>();
	public JSONArray existingData = new JSONArray();
	public Map<String, String> existingTriples;
	public Map<String, String> graphDataMap;

	public SPARQLDataGetter dataRetriever;
	public SPARQLDataGetter typeRetriever;
	WebappConnector webapp;
	public Graph mainGraph;
	public FormConfiguration formConfiguration;
	
	
	public Graph(List<Triple> triples, List<Triple> schemeTriples,
			WebappConnector webapp) {

		this.varName = new String("subjectUri");
		this.graphMap = new HashMap<String, Graph>();
		this.nodeMap = new HashMap<String, List<Triple>>();
		this.nodeGraphMap = new HashMap<String, Graph>();
		this.mainGraph = this;
		this.webapp = webapp;
		this.initialize(triples);
		this.initGraphStructure();
		this.setGraphDescriptor(schemeTriples);
		this.setMaps();
	}

	public Graph(Triple triple, String inputNode, List<Triple> triples) {
		this.triple = triple;
		this.varName = inputNode;
		this.initialize(triples);
	}

	public Graph() {
		// TODO Auto-generated constructor stub
	}

	public void initialize(List<Triple> triples) {

		this.initialGraphMap = new HashMap<RDFNode, Graph>();
		List<Triple> neighbours = GraphLib.getAndRemoveTriples(triples,
				this.varName);
		for (Triple triple : neighbours) {
			RDFNode node = GraphLib.getObjectNode(triple, this.varName);
			initialGraphMap.put(node, new Graph(triple, node.varName, triples));
		}
	}

	public void initGraphStructure() {
		this.initGraphMap(this);
	}

	public void initGraphMap(Graph graph) {

		for (RDFNode key : this.initialGraphMap.keySet()) {
			Graph subGraph = this.initialGraphMap.get(key);
			Triple triple = subGraph.triple;
			if (triple instanceof MultiTriple) {
				subGraph.varName = GraphLib.getObject1(triple, key.varName);
				subGraph.firstNode = key.varName;
				subGraph.inputPredicate = triple.predicate;
				subGraph.mainGraph = graph.mainGraph;
				subGraph.mainGraph.graphCache.put(subGraph.varName, subGraph);
				subGraph.initGraphStructure();
				if (subGraph.triple != null)
					subGraph.dataTriples.add(triple);
				graph.subGraphs.put(QueryLib.getPredicateKey(triple.predicate),
						(Graph) subGraph);
			} else {
				graph.dataTriples.add(triple);
				subGraph.initGraphMap(graph);
			}
		}
	}

	public void setGraphDescriptor(List<Triple> schemeTriples) {

		// log("SubgraphDescriptor");
		GraphLib.setSchemeTriples(this, schemeTriples);
		GraphLib.setDataInputVars(this);
		GraphLib.setDataRetrievalVars(this);
		GraphLib.setGraphMap(this);
		if (this.inputPredicate == null) {
			this.dataRetriever = new MainGraphSPARQLDataGetter(mainGraph,
					this.dataRetreivalQuery, this.urisToSelect, this.literalsToSelect);
		} else {
			this.dataRetriever = new SPARQLDataGetter(mainGraph,
					this.dataRetreivalQuery, this.urisToSelect, this.literalsToSelect,
					this.varName);
		}
		if (this.typeQueryTriples.size() > 0 && this.inputClasses.size() > 0
				&& this.classesToSelect.size() > 0) {
			this.typeQueryTriples.addAll(GraphLib
					.optionalClassLabelTripels(this.classesToSelect));
			List<String> literalsToSelect = GraphLib
					.classLabels(this.classesToSelect);
			this.typeRetriever = new SPARQLDataGetter(mainGraph,
					this.typeQueryTriples, this.classesToSelect, literalsToSelect,
					this.inputClasses);
		}
		for (String key : this.subGraphs.keySet()) {
			this.subGraphs.get(key).setGraphDescriptor(schemeTriples);
		}
	}

	public void setMaps() {

		this.mainInputValues = new HashMap<String, String>();
		for (String mainInput : this.mainInputNodes) {
			this.mainInputValues.put(mainInput,
					this.webapp.getInputParameter(mainInput));
		}
		for(String node : this.nodes){
			this.mainGraph.nodeGraphMap.put(node, this);
		}
	}

	/*
	 * Data Retrieval
	 */
	public JSONObject getExistingData(String subject, String object) {

		this.existingData = QueryUtils
				.getJSON(((MainGraphSPARQLDataGetter) this.dataRetriever).getData(
						subject, object));
		this.getGraphData(JSON.obj());
		return JSON.getJSON(this.existingData, 0);
	}

	public JSONArray getGraphData(String value, JSONObject parentData) {

		// Here the parent graph input is used as well
		this.existingData = QueryUtils.getJSON(this.dataRetriever.getData(value));
		this.getGraphData(parentData);
		return this.existingData;
	}

	protected void getGraphData(JSONObject parentData) {

		if (this.subGraphs.keySet().size() == 0) {
			if(notExistingSelector()){
				System.out.println("FirstNode : " + this.firstNode);
				for (int i = 0; i < this.existingData.length(); i++) {
					JSONObject object = JSON.object(this.existingData, i);
					JSON.put(object, "formData", this.getFormData(object, parentData));
				}
			}
		} else {
			for (int i = 0; i < this.existingData.length(); i++) {
				for (String key : this.subGraphs.keySet()) {
					Graph subGraph = this.subGraphs.get(key);
					JSONObject object = JSON.object(this.existingData, i);
					JSON.put(object, "formData", this.getFormData(object, parentData));
					String initialValue = JSON.string(object, subGraph.varName);
					JSONArray data = subGraph.getGraphData(initialValue,
							getParentData(object, parentData));
					JSON.put(object, key, data);
				}
			}
		}
	}
	
	boolean notExistingSelector(){
		
		if( this.mainGraph.formConfiguration.formElements.containsKey(this.firstNode)) {
			if(this.mainGraph.formConfiguration.formElements.get(this.firstNode)
					instanceof ExistingInstanceSelector){
				return false;
			}
		}
		return true;
	}
	
	public JSONObject getFormData(JSONObject object, JSONObject parentData) {

		// This object already contains the
		JSONObject formData = JSON.obj();
		for (String formNode : this.formNodes) {
			System.out.println(formNode);
			VariableDependency varDep = this.mainGraph.variableDependencies
					.get(formNode);
			JSONObject inputData = JSON.obj();
			for (String input : varDep.inputs) {
				if (object.has(input)) {
					JSON.copyValue(inputData, object, input);
				} else if (parentData.has(input)) {
					JSON.copyValue(inputData, parentData, input);
				} else if(this.mainGraph.mainInputValues.containsKey(input)){
					String value = this.mainGraph.mainInputValues.get(input);
					JSON.put(inputData, input, value);
				}
			}
			JSON.put(formData, formNode, varDep.getData(inputData));
		}
		return formData;
	}

	public JSONObject getParentData(JSONObject dataObject, JSONObject parentData) {

		JSONObject obj = JSON.copyObject(parentData);
		for (String formNode : this.nodesAsInput) {
			JSON.copyValue(obj, dataObject, formNode);
		}
		return obj;
	}

	/*
	 * Saving Data
	 */

	public String saveInitialData(JSONObject inputObject) {
		Map<String, String> variableMap = new HashMap<String, String>();
		return this.getData(inputObject, variableMap);
	}

	public String saveData(JSONObject inputObject, String key, String value) {

		Map<String, String> variableMap = new HashMap<String, String>();
		variableMap.put(key, value);
		return this.getData(inputObject, variableMap);
	}

	public String getData(JSONObject inputObject, Map<String, String> variableMap){
		
		this.setInstanceMap(inputObject, variableMap);
		this.setTypes(inputObject, variableMap);
		return generateN3(inputObject, variableMap);
	}
	
	public JSONObject saveDataAJAX(JSONObject inputObject, String key, String value){
		
		Map<String, String> variableMap = new HashMap<String, String>();
		variableMap.put(key, value);
		this.setInstanceMap(inputObject, variableMap);
		this.setTypes(inputObject, variableMap);
		JSONObject graphData = JSON.obj();
		JSON.convert(variableMap);
		JSON.put(graphData, "graphData", JSON.convert(variableMap));
		JSON.put(graphData, "triplesToAdd", generateN3(inputObject, variableMap));
		return graphData;
	}
	
	public String setTypes(JSONObject inputObject,
			Map<String, String> variableMap) {

		if (this.typeRetriever != null) {
			String inputValue = JSON.string(inputObject, this.inputClasses.get(0));
			List<Map<String, String>> data = this.typeRetriever.getData(inputValue);
			if (data.size() > 0) {
				variableMap.putAll(data.get(0));
			} else {
				log("noResult");
			}
		}
		return generateN3(inputObject, variableMap);
	}

	void setInstanceMap(JSONObject obj, Map<String, String> instanceMap) {

		// New Instances
		for (String newInstance : this.newInstances) {
			if (!this.varName.equals(newInstance)) {
				instanceMap.put(newInstance, this.mainGraph.getWebapp().getUnusedURI());
			}
		}

		for (String mainInputNode : this.mainInputNodes) {
			instanceMap.put(mainInputNode,
					this.mainGraph.mainInputValues.get(mainInputNode));
		}
		// InputData
		for (String inputClass : this.inputClasses) {
			instanceMap.put(inputClass, JSON.string(obj, inputClass));
		}

		for (String inputInstance : this.inputInstances) {
			if (!this.mainInputNodes.contains(inputInstance))
				instanceMap.put(inputInstance, JSON.string(obj, inputInstance));
		}
		for (String inputLiteral : this.inputLiterals) {
			instanceMap.put(inputLiteral, JSON.string(obj, inputLiteral));
		}
	}

	public String generateN3(JSONObject inputObject,
			Map<String, String> variableMap) {

		// Creating string to create
		this.graphDataMap = variableMap;
		log("\n VariableMap");
		DebugLib.mapLog(variableMap, this);
		Map<String, String> labelMap = GraphLib.getLabels(variableMap);
		log("\n LabelMap");
		DebugLib.mapLog(labelMap, this);
		//List<Triple> triplesToStore = GraphLib.addLabelTriples(this.triplesToStore);
		String triplesString = SPARQLUtils.assembleTriples(this.triplesToStore);
		triplesString = QueryUtils.subUrisForQueryLiterals(triplesString, labelMap);
		triplesString = QueryUtils.subUrisForQueryVars(triplesString, variableMap);
		for (String subgraphKey : this.subGraphs.keySet()) {
			Graph subGraph = this.subGraphs.get(subgraphKey);
			String key = subGraph.varName;
			String value = variableMap.get(key);
			JSONArray array = JSON.array(inputObject, subgraphKey);
			for (int i = 0; i < array.length(); i++) {
				JSONObject jsonObject = JSON.object(array, i);
				triplesString += subGraph.saveData(jsonObject, key, value);
			}
		}
		return triplesString;
	}

	public void debug() {
		this.debug(0);
	}

	public void debug(int n) {
		DebugLib.debug(n, this);
	}

	public void debugMulti(int n) {
		DebugLib.debugMulti(n, this);
	}

	public void dependencyDebug() {

		this.mainGraph.getWebapp().log(JSON.debug(this.dependencyDescriptor()));
		for (String key : this.variableDependencies.keySet()) {
			VariableDependency dep = this.variableDependencies.get(key);
			this.mainGraph.log("\n" + key + "\n");
			dep.debug();
		}
	}

	public JSONObject dependencyDescriptor() {

		JSONObject object = JSON.obj();
		for (String dependencyKey : this.variableDependencies.keySet()) {
			VariableDependency dependency = mainGraph.variableDependencies
					.get(dependencyKey);
			JSON.put(object, dependencyKey, JSON.array(dependency.inputs));
		}
		return object;
	}

	public void debugMap(int n) {
		String tab = new String(new char[n]).replace("\0", "\t");
		if (this.triple != null)
			System.out.println(tab + this.triple.subject.varName + "\t"
					+ this.triple.predicate + "\t" + this.triple.object.varName);
		n++;
		for (RDFNode key : this.initialGraphMap.keySet()) {
			System.out.println(tab + "\t" + key.varName);
			this.initialGraphMap.get(key).debugMap(n);
		}
	}

	public void log(String msg) {
		this.mainGraph.getWebapp().log(msg);
	}

	public WebappConnector getWebapp() {
		return webapp;
	}

	public void setWebapp(WebappConnector webapp) {
		this.webapp = webapp;
	}

	public JSONObject getDependentData(JSONObject requestData) {

		JSONArray inputArray = null;
		String arrayKey = new String("");
		JSONObject response = JSON.obj();
		JSONObject dependencies = JSON.object(requestData, "dependentVars");

		if (requestData.has("arrayKey")) {
			arrayKey = JSON.string(requestData, "arrayKey");
			inputArray = JSON.array(requestData, arrayKey);
			for (int j = 0; j < inputArray.length(); j++) {
				String arrayElement = JSON.stringArr(inputArray, j);
				if (!response.has(arrayElement)) {
					JSON.put(response, arrayElement, new JSONObject());
				}
				Iterator<?> keys = dependencies.keys();
				while (keys.hasNext()) {
					String key = (String) keys.next();
					JSONObject inputVars = JSON.object(dependencies, key);
					JSON.put(inputVars, arrayKey, arrayElement);
					VariableDependency dependency = this.variableDependencies.get(key);
					JSON.put(JSON.get(response, arrayElement), key,
							dependency.getData(inputVars));
				}
			}
		} else {
			Iterator<?> keys = dependencies.keys();
			while (keys.hasNext()) {
				String key = (String) keys.next();
				JSONObject inputVars = JSON.object(dependencies, key);
				VariableDependency dependency = this.variableDependencies.get(key);
				JSON.put(response, key, dependency.getData(inputVars));
			}
		}
		System.out.println(JSON.debug(response));
		return response;
	}

	public String deleteData(JSONObject object) {

		// System.out.println("Debug subgraph");
		// this.debug();
		String dataToDelete = N3.getTriples(this.triplesToStore, object);
		for (String key : this.subGraphs.keySet()) {
			Graph subGraph = this.subGraphs.get(key);
			JSONArray array = JSON.array(object,
					QueryLib.getPredicateKey(subGraph.inputPredicate));
			for (int i = 0; i < array.length(); i++) {
				dataToDelete += subGraph.deleteData(JSON.object(array, i));
			}
		}
		return dataToDelete;
	}
}
