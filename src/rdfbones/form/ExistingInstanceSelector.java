package rdfbones.form;

import org.json.JSONObject;

import rdfbones.graphData.FormGraph;
import rdfbones.lib.JSON;
import rdfbones.table.DefaultTable;
import rdfbones.table.Table;

public class ExistingInstanceSelector extends FormElement {

  public ExistingInstanceSelector(String varName, String title){
    super(varName, title);
    this.type = new String("existingInstanceSelector");
  }
  
  @Override
  public JSONObject getDescriptor(FormConfiguration formConfig){

    JSONObject object = JSON.obj();
    JSON.put(object, "title", this.title);
    JSON.put(object, "type", this.type);
    JSON.put(object, "style", this.style);
    JSON.put(object, "dataKey", this.dataKey);
    if(formConfig.formGraphs.containsKey(this.dataKey)){
    	FormGraph formGraph = formConfig.formGraphs.get(this.dataKey);
    	if(formGraph.table != null){
    		JSON.put(object, "table", formGraph.getDescriptor());	
    		return object;
    	} 
    }
  	Table table = new DefaultTable(this.dataKey);
  	JSON.put(object, "table", table.getDescriptor());	
    return object;
  }
}