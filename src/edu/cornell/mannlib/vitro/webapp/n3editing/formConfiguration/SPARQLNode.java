package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

public class SPARQLNode {

  
  public SPARQLNode(String varName){
    this.varName = varName;
  }
  
  public String varName;

  public String getVarName() {
    return varName;
  }

  public void setVarName(String varName) {
    this.varName = varName;
  }
}


