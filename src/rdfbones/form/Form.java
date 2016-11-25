package rdfbones.form;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.lib.JSON;

public class Form {

  String title;
  
  public List<FormElement> formElements = new ArrayList<FormElement>();
  public Form(List<FormElement> formElements){
    this.formElements = formElements;
  }
  
  public Form(String title){
   this.title = title;
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
  
  public JSONObject getSubFormJSON(){

    JSONObject formElements = JSON.obj();
    for(FormElement element : this.formElements){
        JSON.put(formElements, element.node.varName, element.getJSON());
    }
    return formElements;
  }
}