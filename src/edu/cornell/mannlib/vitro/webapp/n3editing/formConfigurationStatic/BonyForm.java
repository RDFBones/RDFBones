package edu.cornell.mannlib.vitro.webapp.n3editing.formConfigurationStatic;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.ClassSelector;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.Form;
import edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration.InstanceSelector;

public class BonyForm{


  public static Form getForm(VitroRequest vreq){

    Form form = new Form(vreq);
  
    form.dataOperation = new String("addSingleBoneOf");
    
    form.dataSets.put("subClasses", SubClassesDataSet.getDataSet());
    form.dataSets.put("completeness", new CompletenessDataSet());

    form.formElements.add(new ClassSelector("subClasses", "Bony Part Type"));
    form.formElements.add(new InstanceSelector("completeness", "Completeness", true));
    
    form.triplesToStore = new String("addSingleBoneRegion");
    return form;
  }
}
