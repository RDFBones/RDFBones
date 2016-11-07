package rdfbones.rdfdataset;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FormData {

  public String input;
  //These are the inputs with cardinality 1
  public List<String> inputs = new ArrayList<String>();
  Map<String, FormData> subFormData = new HashMap<String, FormData>();
  
  public FormData(){
    this.input = new String("subject");
  }
  
  public FormData(String input){
    this.input = input;
  }
  
  public void addSubformData(String key, FormData formData){
    this.subFormData.put(key, formData);
  }
  
  public void setInputs(String input1){
    this.inputs = getList();
    this.inputs.add(input1);
  }
  
  public void setInputs(String input1, String input2){
    this.inputs = getList();
    this.inputs.add(input1);
    this.inputs.add(input2);
  }
  
  public void setInputs(String input1, String input2, String input3){
    this.inputs = getList();
    this.inputs.add(input1);
    this.inputs.add(input2);
    this.inputs.add(input3);
  }  
  
  static List<String> getList(){
    return new ArrayList<String>();
  }
}


