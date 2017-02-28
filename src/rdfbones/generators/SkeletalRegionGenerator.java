package rdfbones.generators;


import javax.servlet.http.HttpSession;

import rdfbones.lib.RDFBonesUtils;
import rdfbones.lib.TripleLib;
import webappconnector.VIVOWebappConnector;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators.EditConfigurationGenerator;

public class SkeletalRegionGenerator implements EditConfigurationGenerator {

  @Override
  public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
    HttpSession session) throws Exception {

    EditConfigurationVTwo editConfig = new EditConfigurationVTwo();
    editConfig.setTemplate("notImplemented.ftl");
    editConfig.setSubjectUri(EditConfigurationUtils.getSubjectUri(vreq));
    editConfig.setObject(EditConfigurationUtils.getObjectUri(vreq));
    return editConfig;
  }
}