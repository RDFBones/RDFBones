package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.DataSet;

public class FormElement {
  
  public String type;
  public String varName;
  public String dataType;
  public String dataSetName;
  public DataSet dataSet;
  public String title;
  
  public String getVarName() {
    return this.varName;
  }

  public String getTitle() {
    return title;
  }

  public FormElement(String varName){
    this.varName = varName;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getDataSetName() {
    return dataSetName;
  }

  public void setDataSetName(String dataSetName) {
    this.dataSetName = dataSetName;
  }

  public DataSet getDataSet() {
    return dataSet;
  }

  public void setDataSet(DataSet dataSet) {
    this.dataSet = dataSet;
  }
}
