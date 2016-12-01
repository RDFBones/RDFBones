package rdfbones.form;

import rdfbones.formProcessing.WebappConnector;
import rdfbones.rdfdataset.Graph;

public class FormConfiguration {

  public Form form;
  public Graph dataGraph;
  WebappConnector webapp;
  
  public FormConfiguration(Graph graph, Form form){
    this.dataGraph = graph;
    this.form = form;
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
