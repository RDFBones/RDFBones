package rdfbones.lib;

import java.util.List;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import rdfbones.form.Form;
import rdfbones.form.FormConfiguration;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.rdfdataset.Triple;

public class RDFBonesUtils {

  public static EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
    List<Triple> dataTriples, List<Triple> schemeTriples, Form form, WebappConnector webapp){
    
    EditConfigurationVTwo editConfig = new EditConfigurationVTwo();
    editConfig.setTemplate("genericForm.ftl");
    editConfig.setSubjectUri(EditConfigurationUtils.getSubjectUri(vreq));
    editConfig.setObject(EditConfigurationUtils.getObjectUri(vreq));
    editConfig.setFormConfig(GraphLib.getFormConfig(dataTriples, schemeTriples, form, webapp));
    return editConfig;
  }
}
