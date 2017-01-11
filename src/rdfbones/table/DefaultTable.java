package rdfbones.table;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.lib.JSON;

public class DefaultTable extends Table {

	public DefaultTable(String varName){
		super(varName);
	}
	
	public DefaultTable(String varName, String title){
		
		super(varName, title);
		this.cells = new ArrayList<TableCell>();
		this.cells.add(new DefaultCell(varName + "Label"));
	}
	
}

