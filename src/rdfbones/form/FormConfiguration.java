package rdfbones.form;

import java.util.Map;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.FormGraph;
import rdfbones.graphData.Graph;
import rdfbones.graphData.VariableDependency;

public class FormConfiguration {

  public Form form;
  public Graph dataGraph;
  public Map<String, FormGraph> formGraphs;
  WebappConnector webapp;
  
  public FormConfiguration(Graph graph, Form form){
    this.dataGraph = graph;
    this.form = form;
    this.form.setFormConfig(this);
    this.initDependencies();
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
    this.initDependencies();
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
