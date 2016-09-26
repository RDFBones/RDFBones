package edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.query.ResultSet;

import edu.cornell.mannlib.vedit.controller.OperationController;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.Form;

public class DataSet {

  public VitroRequest vreq;
  public String name;
  
  public List<String> data1;
  public List<Map<String, String>> data;
  
  public String getName(){
    return name;
  }
  
  public List<Map<String, String>> getData(){
    return this.data;
  }

  public void setData(Form form){
    //Do nothing
  }
}
