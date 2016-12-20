package rdfbones.formProcessing;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.form.FormConfiguration;
import rdfbones.graphData.FormGraph;
import rdfbones.lib.JSON;

public class AJAXController {

	//Input
	static String TASK = "task";
	static String KEY = "key";
	static String INSTANCEARRAY = "instanceArray";

	//Output
	static String TABLEDATA = "tableData";
	public JSONObject response = new JSONObject();
	JSONObject requestData;
	
	public AJAXController(FormConfiguration formConfig, JSONObject requestData){
		setResponse(formConfig, requestData);
	}
	
	public void setResponse(FormConfiguration formConfig, JSONObject requestData){

		this.requestData = requestData;
		if (check(TASK)) {
			switch (get(TASK)) {
			
			case "formDescriptor":
				JSON.put(this.response,"formDescriptor",formConfig.form.getFormDescriptor());
		    JSON.put(this.response, "dataDependencies", formConfig.dataGraph.dependencyDescriptor());
				break;
			case "formGraphData":
				if (check(KEY) && check(INSTANCEARRAY)) {
					if (formConfig.formGraphs.containsKey(get(KEY))) {
						FormGraph graph = formConfig.formGraphs.get(get(KEY));
						response(TABLEDATA, graph.getTableData(getJSONArray(INSTANCEARRAY)));
					} else {
						AJAXError.noFormGraphKey(response, get(KEY));
					}
				}
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

	public void response(String key, Object value){
		JSON.put(this.requestData, key, value);
	}
	
	public String get(String key) {
		return JSON.string(this.requestData, key);
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
