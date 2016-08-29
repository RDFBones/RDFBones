package edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.ClassSelector;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.Form;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.InstanceSelector;


public class BonyForm2 {
  
  public static Form getForm(VitroRequest vreq){
    
    Form form = new Form(vreq);
    form.dataSets.put("classes", BonyDataSet2.getDataSet());
    form.formElements.add(new ClassSelector("classes", "SelectBonyPart"));
    
    form.dataSets.put("completeness", new CompletenessDataSet());
    form.formElements.add(new InstanceSelector("completeness", "Completeness", true));

    form.triplesToStore = new String("addSingleBoneRegion");
    
    return form;
  }
}