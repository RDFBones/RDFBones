package rdfbones.generators;

import javax.servlet.http.HttpSession;

import rdfbones.lib.RDFBonesUtils;
import rdfbones.lib.TripleLib;
import webappconnector.VIVOWebappConnector;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators.EditConfigurationGenerator;

public class SingleBoneGenerator implements EditConfigurationGenerator {

  @Override
  public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
    HttpSession session) throws Exception {

    return RDFBonesUtils.getEditConfiguration(vreq, TripleLib.srDataTriples(),
        TripleLib.srSchemeTriples(), TripleLib.srForm(), new VIVOWebappConnector(vreq));
  }
}