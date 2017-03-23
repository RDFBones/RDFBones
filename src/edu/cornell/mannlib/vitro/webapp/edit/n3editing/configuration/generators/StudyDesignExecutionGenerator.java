/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import rdfbones.form.Form;
import rdfbones.form.FormConfiguration;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.FormGraph;
import rdfbones.lib.GraphLib;
import rdfbones.lib.RDFBonesUtils;
import rdfbones.lib.TripleLib;
import rdfbones.rdfdataset.Triple;
import webappconnector.VIVOWebappConnector;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class StudyDesignExecutionGenerator implements EditConfigurationGenerator {

  @Override
  public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
    HttpSession session) throws Exception {

      EditConfigurationVTwo editConfig = new EditConfigurationVTwo();
      editConfig.setTemplate("genericForm.ftl");
      editConfig.setSubjectUri(EditConfigurationUtils.getSubjectUri(vreq));
      editConfig.setObject(EditConfigurationUtils.getObjectUri(vreq));
      
      FormConfiguration formConfig = GraphLib.getFormConfig(TripleLib.sde(),
          TripleLib.sdeForm(), TripleLib.sdeFormGraph(), new VIVOWebappConnector(vreq));
      
      formConfig.dataGraph.globalLabelKey = new String("objectUriLabel");

      editConfig.setFormConfig(formConfig);
      return editConfig;
    }
  
}