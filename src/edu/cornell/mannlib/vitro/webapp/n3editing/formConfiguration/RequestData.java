package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

public class RequestData extends FormDefinition{

   public String key;
   public String varName;
   
   public String getKey() {
    return key;
  }

  public String getVarName() {
    return varName;
  }

  public RequestData(FormElementType type){
     super(type);
   }
   
   public RequestData(String key){
     super(FormElementType.REQUESTDATA);
     this.key = key;
   }
   
   public RequestData(String key, String varName){
     super(FormElementType.REQUESTDATA);
     this.key = key;
     this.varName = varName;
   }
   
}
