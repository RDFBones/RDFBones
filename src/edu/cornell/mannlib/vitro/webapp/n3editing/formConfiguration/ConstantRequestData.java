package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

public class ConstantRequestData extends RequestData {

    public String value;
    
    public ConstantRequestData(String varName, String value){
      super(FormElementType.CONSTANTREQUESTDATA);
      this.varName = varName;
      this.value = value;
    }

    public String getValue() {
      return value;
    }
} 