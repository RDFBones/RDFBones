package rdfbones.table;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.graphData.FormGraph;
import rdfbones.lib.JSON;

public class Table {

	public List<TableCell> cells = new ArrayList<TableCell>();
	public FormGraph graph;
	String varName;
	String title;
		
	public Table(String title){
		this.title = title;
	}
	
	public Table(String varName, String title){

		this.varName = varName;
		this.title = title;
	}
	
	public JSONObject getDescriptor(){
	
		JSONObject object = JSON.obj();
		//Here comes maybe later new configuration data
    JSONArray cells = JSON.arr();
    for(TableCell cell : this.cells){
    	cells.put(cell.getDescriptor());
    }
    JSON.put(object, "title", this.title);
    JSON.put(object, "cells", cells);
    return object;
	}
}
