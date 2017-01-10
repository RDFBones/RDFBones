package rdfbones.rdfdataset;

public class RDFNode {

  
  public RDFNode(String varName){
    this.varName = varName;
  }
  
  public String varName;
  public String constantValue;
  
  public String getVarName() {
    return varName;
  }

  public void setVarName(String varName) {
    this.varName = varName;
  }
}


