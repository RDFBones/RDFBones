package rdfbones.form;

import org.json.JSONObject;

import rdfbones.lib.JSON;

public class SubformAdder extends FormElement{
  
  String type = "subFormAdder";
  public String dataKey;
  public Form subForm;
  public SubformAdder(String name, String title){
    super(name, title);
  }
  
  public SubformAdder(String name, String title, String dataKey ){
    super(name, title);
    this.dataKey = dataKey;
  }
  
  @Override
  public JSONObject getJSON(){
   
    JSONObject obj = super.getJSON();
    if(this.dataKey != null){
      JSON.put(obj, "dataKey", this.dataKey);
    }
    JSONObject formElements = this.subForm.getSubFormJSON();
    if(formElements.length() > 0){
      JSON.put(obj, "formElements", formElements);
    }   
    return obj;
  }
}
