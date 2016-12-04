package rdfbones.form;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.lib.JSON;
import rdfbones.rdfdataset.Graph;

public class Form {

  String title;
  public String style;
  public Graph graph;
  public List<FormElement> formElements = new ArrayList<FormElement>();
  public Form(List<FormElement> formElements){
    this.formElements = formElements;
  }
  
  public Form(String title, Graph graph){
   this.title = title;
   this.graph = graph;
  }
  
  public Form(String title){
    this.title = title;
  }
  
  public Form(){
    this.style = "inline";
  }
   
  public JSONObject getJSON(){
    
    JSONObject object = JSON.obj();
    JSON.put(object, "title", title);
    JSONObject formElements = getSubFormJSON();
    if(formElements.length() > 0){
      JSON.put(object, "formElements", formElements);
    }
    return object;
  }
  
  public void setGraph(Graph graph){
    
    this.graph = graph;
    for(FormElement element : this.formElements){
      if(element instanceof SubformAdder){
        ((SubformAdder) element).subForm.setGraph(graph);
      }
    }
  }
  
  public JSONObject getSubFormJSON(){

    JSONObject descriptor = JSON.obj();
    if(this.style != null){
      JSON.put(descriptor, "style", this.style);
    } 
    JSONObject formElements = JSON.obj();
    for(FormElement element : this.formElements){
        String predicate = this.graph.graphMap.get(element.node.varName).inputPredicate;
        String key = predicate.substring(predicate.indexOf(":") + 1, predicate.length());
        JSON.put(formElements, key, element.getJSON());
    }
    JSON.put(descriptor, "formElements", formElements);
    return formElements;
  }
  
  public void debug(){
    this.graph.mainGraph.getWebapp().log(JSON.debug(getSubFormJSON(), 0));
  }
  
  public void log(String str){
    this.graph.mainGraph.getWebapp().log(str);
  }
}