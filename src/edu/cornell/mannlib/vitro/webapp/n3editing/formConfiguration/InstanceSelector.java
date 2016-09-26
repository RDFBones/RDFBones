package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

public class InstanceSelector extends FormElement {

  
  public InstanceSelector(String varName){
    super(varName);
    this.type = "instanceSelectorTable";
  }
  
  public InstanceSelector(String varName, String title, boolean simpleSelector){
    
    super(varName);
    this.title = title;
    this.type = "selector";
    this.dataType = "existing";
  }
}