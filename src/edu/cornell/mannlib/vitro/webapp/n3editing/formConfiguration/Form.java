package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.DataSet;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class Form {

  private static final Log log = LogFactory.getLog(Form.class.getName());

  public VitroRequest vreq;
  public List<FormElement> formElements = new ArrayList<FormElement>();
  public String dataOperation;
  
  public Map<String, Object> errors = new HashMap<String, Object>();
  public Map<String, DebugData> debugData = new HashMap<String, DebugData>();
  
  public Map<String, DebugData> getDebugData() {
    return debugData;
  }

  public Map<String, Object> getErrors() {
    return errors;
  }

  public Map<String, DataSet> dataSets = new HashMap<String, DataSet>();
  public String triplesToStore;
  
  public String getDataOperation() {
    return dataOperation;
  }

  public List<FormElement> getFormElements() {
    return formElements;
  }

  public void setFormElements(List<FormElement> formElements) {
    this.formElements = formElements;
  }

  public Map<String, DataSet> getDataSet() {
    return dataSets;
  }

  public void setDataSet(Map<String, DataSet> dataSets) {
    this.dataSets = dataSets;
  }

  public String getTriplesToStore() {
    return triplesToStore;
  }

  public void setTriplesToStore(String triplesToStore) {
    this.triplesToStore = triplesToStore;
  }

  public void setDataOperation(String dataOperation) {
    this.dataOperation = dataOperation;
  }
  
  public Form(VitroRequest vreq){
    this.vreq = vreq;
  }
  
  public void retrieveData(){
    
    /*
     * In the final version this method will be called by simply and it accesses the triple
     * store to ask for the configuration dataset.
     * Currently the subclasses are there for the static configuration
     */
  }
  
  public void initData(){
    
    this.debugData.put("dataQuery", new DebugData());
    for(String dataSetKey : this.dataSets.keySet()){
      this.dataSets.get(dataSetKey).setData(this);
    }
    
    for(FormElement element : this.formElements){
      element.dataSet = this.dataSets.get(element.varName);
    }
  }

}