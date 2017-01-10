package rdfbones.formProcessing;

import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.form.FormConfiguration;
import rdfbones.graphData.FormGraph;
import rdfbones.graphData.Graph;
import rdfbones.graphData.VariableDependency;
import rdfbones.lib.JSON;

public class AJAXController {

	// Input
	static String TASK = "task";
	static String KEY = "key";
	static String INSTANCEARRAY = "instanceArray";
	static String INPUTPARAMETERS = "inputParameters";
	static String SUBJECTURI = "subjectUri";
	static String OBJECTURI = "objectUri";
	
	// Output
	static String TABLEDATA = "tableData";
	public JSONObject response = new JSONObject();
	JSONObject requestData;

	public AJAXController(FormConfiguration formConfig, JSONObject requestData) {
		setResponse(formConfig, requestData);
	}

	public void setResponse(FormConfiguration formConfig, JSONObject requestData) {

		Graph graph = formConfig.dataGraph;
		this.requestData = requestData;
		if (check(TASK)) {
			switch (get(TASK)) {

			case "formDescriptor":
				JSON.put(this.response, "formDescriptor",
						formConfig.form.getFormDescriptor());
				JSON.put(this.response, "dataDependencies",
						formConfig.dataGraph.dependencyDescriptor());
				break;
			case "formGraphData":
				if (check(KEY)) {
					if (formConfig.formGraphs.containsKey(get(KEY))) {
						//FormGraph formGraph = formConfig.formGraphs.get(get(KEY));
						JSONObject inputParameters = getJSONObject(INPUTPARAMETERS);
						System.out.println(inputParameters.toString());
						VariableDependency varDep = graph.variableDependencies.get(get(KEY));
						System.out.println(graph.variableDependencies.keySet());
						JSONArray response = varDep.getData(inputParameters);
						response(TABLEDATA, response);
					} else {
						AJAXError.noFormGraphKey(response, get(KEY));
					}
				}
				break;
			case "existingFormGraphData" :
				
				graph.getExistingData(get(SUBJECTURI), get(OBJECTURI));
				response(JSON.getJSON(graph.existingData, 0));
				break;
		
			case "dependentData":
				break;

			default:
				AJAXError.unknownTask(response, get(TASK));
				break;
			}
		} else {
			AJAXError.noTask(response);
		}
	}

	public Boolean check(String key) {

		if (this.requestData.has(key)) {
			return true;
		} else {
			errorMsg(key);
			return false;
		}
	}

	public void response(JSONObject value) {
		this.response = value;
	}
	
	public void response(String key, Object value) {
		JSON.put(this.response, key, value);
	}

	public String get(String key) {
		return JSON.string(this.requestData, key);
	}

	public JSONObject getJSONObject(String key) {
		return JSON.get(this.requestData, key);
	}

	public JSONArray getJSONArray(String key) {
		return JSON.array(this.requestData, key);
	}

	public void errorMsg(String key) {

		switch (key) {

		case "task":
			AJAXError.noTask(response);
			break;
		case "key":
			AJAXError.noKey(response);
			break;
		case "instanceArray":
			AJAXError.noInstanceArray(response);
			break;
		}
	}
}
