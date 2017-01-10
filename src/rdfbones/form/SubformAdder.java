package rdfbones.form;

import org.json.JSONObject;

import rdfbones.lib.JSON;

public class SubformAdder extends FormElement{
  
  public Form subForm;

  public SubformAdder(String name){

    super(name, new String(""));
    this.type = new String("adder");
  }
  
  public SubformAdder(String name, String title){
    super(name, title);
    this.type = new String("adder");
  }

  @Override
  public JSONObject getDescriptor(FormConfiguration formConfig){
   
    JSONObject obj = super.getDescriptor(formConfig);
    if(this.dataKey != null){
      JSON.put(obj, "dataKey", this.dataKey);
    }
    if(this.subForm != null){
      JSONObject formElements = this.subForm.getSubFormJSON();
      if(formElements.length() > 0){
        JSON.put(obj, "formElements", formElements);
      } 
    }
    return obj;
  }
}
