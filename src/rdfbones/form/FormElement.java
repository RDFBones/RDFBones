package rdfbones.form;

import org.json.JSONArray;
import org.json.JSONObject;

import rdfbones.lib.JSON;
import rdfbones.rdfdataset.RDFNode;

public class FormElement {

  public RDFNode node;
  String type;
  String title;

  FormElement(){
    //TODO
  }
  
  public FormElement(String node, String title){
    this.node = new RDFNode(node);
    this.title = title;
  }
  
  FormElement(RDFNode node){
    this.node = node;
  }
  
  FormElement(RDFNode node, String type){
    this.node = node;
    this.type = type;
  }
  
  public JSONObject getJSON(){

    JSONObject object = JSON.obj();
    JSON.put(object, "title", this.title);
    JSON.put(object, "type", this.type);
    return object;
  }
}
