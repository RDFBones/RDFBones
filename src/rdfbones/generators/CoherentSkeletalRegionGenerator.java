package rdfbones.generators;

import javax.servlet.http.HttpSession;

import rdfbones.lib.RDFBonesUtils;
import rdfbones.lib.TripleLib;
import webappconnector.VIVOWebappConnector;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators.EditConfigurationGenerator;

public class CoherentSkeletalRegionGenerator implements EditConfigurationGenerator {

  @Override
  public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
    HttpSession session) throws Exception {

    return RDFBonesUtils.getEditConfiguration(vreq, TripleLib.csrDataTriples(), 
        TripleLib.csrSchemeTriples(), TripleLib.csrForm(), new VIVOWebappConnector(vreq));
  }
}