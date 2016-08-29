package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

public class FormDefinition {

  /*
   * This class is the parent class of each
   * 
   */
  public FormElementType type;
  
  public FormElementType getType() {
    return type;
  }

  public FormDefinition(FormElementType type){
    this.type = type;
  }
  
}



