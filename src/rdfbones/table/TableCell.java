package rdfbones.table;

import org.json.JSONObject;

import rdfbones.lib.JSON;

public class TableCell {

	String title;
	String varName;
	int num;
	
	public TableCell(String title, String varName, int num){
		
		this.title = title;
		this.varName = varName;
		this.num = num;
	}
	
	public JSONObject getDescriptor(){
		
		JSONObject object = JSON.obj();
    JSON.put(object, "title", this.title);
    JSON.put(object, "dataKey", this.varName);
    JSON.put(object, "num", this.num);
    return object;
	}
}