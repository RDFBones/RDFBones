package rdfbones.form;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.FormGraph;
import rdfbones.graphData.Graph;
import rdfbones.graphData.VariableDependency;
import rdfbones.lib.ArrayLib;

public class FormConfiguration {

  public Form form;
  public Graph dataGraph;
  public Map<String, FormGraph> formGraphs;
  public Map<String, FormElement> formElements = new HashMap<String, FormElement>();
  WebappConnector webapp;
  
  public FormConfiguration(Graph graph, Form form){
    this.dataGraph = graph;
    this.form = form;
    this.form.setFormConfig(this);
    this.init();
  }
  
  public FormConfiguration(Graph graph, Form form, Map<String, FormGraph> formGraphs){
    this.dataGraph = graph;
    this.form = form;
    this.form.setFormConfig(this);
    this.formGraphs = formGraphs;
    //Setting all the main graphs
    for(String key : this.formGraphs.keySet()){
    	this.formGraphs.get(key).mainGraph = this.dataGraph;
    }
    this.init();
  }
  
  public void init(){
    this.dataGraph.graphCache.put(this.dataGraph.varName, this.dataGraph);
    this.initDependencies();
    this.setFormCache();
    this.setFormNodes();
    for(String key : this.formElements.keySet()){
    	System.out.println("FormElements : " + key);
    }
  }
  
  public void initDependencies(){
  	
  	//Pairing formGraphs to variableDependencies
    for(String key : this.dataGraph.variableDependencies.keySet()){
    	VariableDependency varDep = this.dataGraph.variableDependencies.get(key);
    	if(this.formGraphs != null){
      	if(this.formGraphs.keySet().contains(key)){
      		varDep.initDataGetter(this.formGraphs.get(key));
      	} else {
      		varDep.initDataGetter();
      	}
    	} else {
    		varDep.initDataGetter();
    	}
    }
  }
  
  public void setFormNodes(){
  	
  	List<String> inputs = new ArrayList<String>();
  	Map<String, VariableDependency> varDeps = this.dataGraph.variableDependencies;
  	for(String key : varDeps.keySet()){
  		inputs.addAll(varDeps.get(key).inputs);
  	}
  	for(String graphKey : this.dataGraph.graphCache.keySet()){
			Graph graph = this.dataGraph.graphCache.get(graphKey);
			graph.nodesAsInput.addAll(ArrayLib.intersect(inputs, graph.nodes));
			graph.formNodes.addAll(getFormElements(graph));
			graph.formNodes.addAll(getSubFormElements(graph));
		} 
  }
  
  List<String> getSubFormNodes(List<String> nodes){

  	List<String> ret = new ArrayList<String>();
  	for(String node : nodes){
  		if(this.formElements.get(node) instanceof SubformAdder){
  			ret.add(node);
  		}
  	}
  	return ret;
  }
  
  List<String> getFormElements(Graph graph){
  	
  	List<String> formElements = new ArrayList<String>();
  	for(String node : graph.nodes){
  		if(this.formElements.containsKey(node)){
  			//System.out.println("ContainsKey : " + node);
  			if(!(this.formElements.get(node) instanceof SubformAdder)){
  				formElements.add(node);
  			}
  		} 
  	}
  	return formElements;
  }
  
  List<String> getSubFormElements(Graph graph){
  	
  	List<String> formElements = new ArrayList<String>();
  	for(String key : graph.subGraphs.keySet()){
  		Graph subGraph = graph.subGraphs.get(key);
  		for(String node : subGraph.nodes){
  			if(this.formElements.containsKey(node)){
  				System.out.println("SubFormNode : " + node);
  				if(this.formElements.get(node) instanceof SubformAdder){
    				formElements.add(node);
    			}
    		}
    	}
  	}
  	return formElements;
  }
  
  public void setFormCache(){
  	this.form.setFormMap(this.formElements);
  }
  
  public void setWebapp(WebappConnector webapp){
    this.webapp = webapp;
    this.dataGraph.setWebapp(webapp);
  }
  
  public void graphDebug(){
    this.dataGraph.debug(0);
  }
  
  public void getExistingData(String object, String subject){
    
    this.dataGraph.getExistingData(subject, object);
  }
  
  void log(String msg){
    this.webapp.log(msg);
  }
  
}
