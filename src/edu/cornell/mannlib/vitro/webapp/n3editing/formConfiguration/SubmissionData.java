package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

public class SubmissionData extends RequestData{

  public SubmissionData(String key){
    super(FormElementType.SUBMISSIONDATA);
    this.key = key;
  }
  
  public SubmissionData(String key, String varName){
    super(FormElementType.SUBMISSIONDATA);
    this.key = key;
    this.varName = varName;
  } 
}
