/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import rdfbones.lib.RDFBonesUtils;
import rdfbones.lib.TripleLib;
import webappconnector.VIVOWebappConnector;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class StudyDesignExecutionGenerator implements EditConfigurationGenerator {

  @Override
  public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
    HttpSession session) throws Exception {

    return RDFBonesUtils.getEditConfiguration(vreq, TripleLib.sdeDataTiples(), 
        TripleLib.sdeSchemeTriples(), TripleLib.sdeForm(), 
        TripleLib.sdeFormGraph(), new VIVOWebappConnector(vreq));
  }
}