package rdfbones.form;

import java.util.Map;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.FormGraph;
import rdfbones.graphData.Graph;

public class FormConfiguration {

  public Form form;
  public Graph dataGraph;
  public Map<String, FormGraph> formGraphs;
  WebappConnector webapp;
  
  public FormConfiguration(Graph graph, Form form){
    this.dataGraph = graph;
    this.form = form;
    this.form.setFormConfig(this);
  }
  
  public FormConfiguration(Graph graph, Form form, Map<String, FormGraph> formGraphs){
    this.dataGraph = graph;
    this.form = form;
    this.form.setFormConfig(this);
    this.formGraphs = formGraphs;
    //Setting all the main graphs
    for(String key : this.formGraphs.keySet()){
    	this.formGraphs.get(key).setMainGraph(this.dataGraph);
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
