package rdfbones.formProcessing;

import org.json.JSONObject;

import rdfbones.form.FormConfiguration;
import rdfbones.lib.JSON;

public class AJAXError {

	static String ERRORMSG = "errormsg";
	
	public	static void noFormGraphKey(JSONObject input, String key){
		JSON.put(input, ERRORMSG,  "FormGraphKey " + key + " does not exist!");
	}

	public	static void noInstanceArray(JSONObject input){
		JSON.put(input, ERRORMSG,  "Instances are not defined");
	}
	
	public	static void noTask(JSONObject input){
		JSON.put(input, "errorMsg", "Task is not defined!");
	}

	public	static void noKey(JSONObject input){
		JSON.put(input, "errorMsg", "Key is not defined!");
	}
	
	public	static void unknownTask(JSONObject input, String task){
		JSON.put(input, "errorMsg", "The task -" + task + "- cannot be identified!");
	}
	
	public	static void unknownFormGraphKey(JSONObject input){
		JSON.put(input, "errorMsg", "The key for formGraph cannot be identified!");
	}
	
	public	static void requestDataUndefined(JSONObject input){
		JSON.put(input, "errorMsg", "Request data is undefined");
	}
	
	public	static void editKeyNotDefined(JSONObject input){
		JSON.put(input, "errorMsg", "Editkey is undefined");
	}
}
