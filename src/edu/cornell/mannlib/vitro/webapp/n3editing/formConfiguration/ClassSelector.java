package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

import java.util.ArrayList;
import java.util.Map;

public class ClassSelector extends FormElement {

  public ArrayList<Map<String, String>> dataList;
  public ClassSelector(String varName, String title){
    super(varName);
    this.type = "selector";
    this.dataType = "new";
    this.title = title;
  }
}