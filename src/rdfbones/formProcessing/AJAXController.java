package rdfbones.formProcessing;

import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import rdfbones.form.FormConfiguration;
import rdfbones.graphData.FormGraph;
import rdfbones.graphData.Graph;
import rdfbones.graphData.VariableDependency;
import rdfbones.lib.JSON;
import rdfbones.lib.N3;
import rdfbones.rdfdataset.Triple;

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

			case "formSubmission":
				String triplesToCreate = graph
						.saveInitialData(getJSONObject("dataToStore"));
				JSON.put(response, "triplesToCreate", triplesToCreate);
				if (!formConfig.webapp.addTriples(triplesToCreate, get("editKey"))) {
					JSON.put(response, "failed", true);
				}
				break;
			case "formDescriptor":
				JSON.put(this.response, "formDescriptor",
						formConfig.form.getFormDescriptor());
				JSON.put(this.response, "dataDependencies",
						formConfig.dataGraph.dependencyDescriptor());
				break;
			case "formGraphData":
				if (check(KEY)) {
					if (formConfig.formGraphs.containsKey(get(KEY))) {
						// FormGraph formGraph = formConfig.formGraphs.get(get(KEY));
						JSONObject inputParameters = getJSONObject(INPUTPARAMETERS);
						System.out.println(inputParameters.toString());
						VariableDependency varDep = graph.variableDependencies
								.get(get(KEY));
						System.out.println(graph.variableDependencies.keySet());
						JSONArray response = varDep.getData(inputParameters);
						response(TABLEDATA, response);
					} else {
						AJAXError.noFormGraphKey(response, get(KEY));
					}
				}
				break;
			case "existingFormGraphData":
				response(graph.getExistingData(get(SUBJECTURI), get(OBJECTURI)));
				break;

			case "dependentData":
				break;

			case "editData":
				JSONObject object = getJSONObject("graphData");
				String variable = get("variableToEdit");
				String newValue = get("newValue");
				String remove = N3.getTriples(graph.nodeMap.get(variable), object);
				JSON.put(object, variable, newValue);
				String add = N3.getTriples(graph.nodeMap.get(variable), object);
				formConfig.webapp.removeTriples(remove, get("editKey"));
				formConfig.webapp.addTriples(add, get("editKey"));
				break;

			case "addTriple":
				JSONObject object1 = getJSONObject("graphData");
				String variable1 = get("variableToEdit");
				String add1 = N3.getTriples(graph.nodeMap.get(variable1), object1);
				formConfig.webapp.addTriples(add1, get("editKey"));
				break;
	
			case "removeTriple" : 
				JSONObject object2 = getJSONObject("graphData");
				String variable2 = get("variableToEdit");
				String remove2 = N3.getTriples(graph.nodeMap.get(variable2), object2);
				formConfig.webapp.removeTriples(remove2, get("editKey"));
				break;

			case "addFormData":

				Graph addGraph = graph.graphMap.get(get("formKey"));
				String varName =  addGraph.varName;
				String value = JSON.string(getJSONObject("parentData"), varName);
				String triplesToAdd = addGraph.saveData(getJSONObject("formData"), varName, value);
				JSON.put(response, "triplesAdded", triplesToAdd);
				if(formConfig.webapp.addTriples(triplesToAdd, get("editKey"))){
					JSON.put(response, "failed", false);
				} else {
					JSON.put(response, "failed", true);
				}
				break;

			case "deleteFormData":

				Graph delGraph = graph.graphMap.get(get("formKey"));
				String triplesToDelete = delGraph
						.deleteData(getJSONObject("graphData"));
				JSON.put(response, "triplesDeleted", triplesToDelete);
				if(formConfig.webapp.removeTriples(triplesToDelete, get("editKey"))){
					JSON.put(response, "failed", false);
				} else {
					JSON.put(response, "failed", true);
				}
				break;

			case "deleteAll":
				String graphTriples = graph
						.deleteData(getJSONObject("graphData"));
				System.out.println(get("editKey"));
				JSON.put(response, "triplesDeleted", graphTriples);
				if(formConfig.webapp.removeTriples(graphTriples, get("editKey"))){
					JSON.put(response, "failed", false);
				} else {
					JSON.put(response, "failed", true);
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
