package rdfbones.form;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.graphData.Graph;
import rdfbones.lib.JSON;
import rdfbones.lib.QueryLib;

public class Form {

	String title;
	public String style;
	public Graph graph;
	public FormConfiguration formConfig;

	public List<FormElement> formElements = new ArrayList<FormElement>();

	public Form(List<FormElement> formElements) {
		this.formElements = formElements;
	}

	public Form(String title, Graph graph) {
		this.title = title;
		this.graph = graph;
	}

	public Form(String title) {
		this.title = title;
	}

	public Form() {
		this.style = "inline";
	}

	public JSONObject getFormDescriptor() {

		JSONObject object = JSON.obj();
		JSON.put(object, "title", title);
		JSONObject formElements = getSubFormJSON();
		if (formElements.length() > 0) {
			JSON.put(object, "formElements", formElements);
		}
		return object;
	}

	public void setGraph(Graph graph) {

		this.graph = graph;
		for (FormElement element : this.formElements) {
			if (element instanceof SubformAdder) {
				((SubformAdder) element).subForm.setGraph(graph);
			}
		}
	}

	public void setFormConfig(FormConfiguration formConfig){
	    
	this.formConfig = formConfig;
	for(FormElement element : this.formElements){
      if(element instanceof SubformAdder){
        ((SubformAdder) element).subForm.setFormConfig(formConfig);
      }
      if(element instanceof AuxNodeSelector){
      	formConfig.dataGraph.formNodes.add(element.dataKey);
      }
    }
  }

	public JSONObject getSubFormJSON() {

		JSONObject descriptor = JSON.obj();
		if (this.style != null) {
			JSON.put(descriptor, "style", this.style);
		}
		JSONObject formElements = JSON.obj();
		for (FormElement element : this.formElements) {
			if(this.graph.graphMap.keySet().contains(element.node.varName)){
				String predicate = this.graph.graphMap.get(element.node.varName).inputPredicate;
				String key = QueryLib.getPredicateKey(predicate);
				JSON.put(formElements, key, element.getDescriptor(this.formConfig));
			} else {
				JSON.put(formElements, element.dataKey, element.getDescriptor(this.formConfig));
			}
		}
		JSON.put(descriptor, "formElements", formElements);
		return formElements;
	}

	public void setFormMap(Map<String, FormElement> map){
		
		for(FormElement element : this.formElements){
			map.put(element.dataKey, element);
			if(element instanceof SubformAdder){
				((SubformAdder) element).subForm.setFormMap(map);
			}
		}
	}
	
	public void debug() {
		this.graph.mainGraph.getWebapp().log(JSON.debug(getSubFormJSON(), 0));
	}

	public void log(String str) {
		this.graph.mainGraph.getWebapp().log(str);
	}
}