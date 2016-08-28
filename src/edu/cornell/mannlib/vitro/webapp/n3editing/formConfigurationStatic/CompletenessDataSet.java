package edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.ConstantDataSet;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.DataSet;

public class CompletenessDataSet extends ConstantDataSet {

  public CompletenessDataSet(){

    this.name = new String("testName");
    this.data = new ArrayList<Map<String, String>>();
    
    this.testMap = new HashMap<String, String>();
    
    this.testMap.put("a", "b");
    
    Map<String, String> complete = new HashMap<String, String>();
    complete.put("uri", "completeUri");
    complete.put("label", "Complete");
    
    Map<String, String> incomplete = new HashMap<String, String>();
    incomplete.put("uri", "incompleteUri");
    incomplete.put("label", "Partly Present");
    
    this.data.add(complete);
    this.data.add(incomplete);

    this.data1 = new ArrayList<String>();
    this.data1.add(new String("testString"));
  }
}
