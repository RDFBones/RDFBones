/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import rdfbones.formProcessing.DependencyCalculator;
import rdfbones.formProcessing.GraphProcessor;
import rdfbones.lib.TripleLib;
import webappconnector.VIVOWebappConnector;
import rdfbones.rdfdataset.Graph;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationUtils;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class StudyDesignExecutionGenerator implements EditConfigurationGenerator {

  private Log log = LogFactory.getLog(StudyDesignExecutionGenerator.class);

  @Override
  public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
    HttpSession session) throws Exception {

    EditConfigurationVTwo editConfiguration = new EditConfigurationVTwo();
    editConfiguration.setTemplate("genericForm.ftl");
    editConfiguration.setSubjectUri(vreq.getParameter("subjectUri"));
    Graph graph =
        GraphProcessor.getGraph(TripleLib.sdeDataTiples(), TripleLib.sdeSchemeTriples(),
            "subject");
    graph.init(new VIVOWebappConnector(vreq));
    DependencyCalculator.calculate(graph, TripleLib.sdeSchemeTriples(), TripleLib.sdeForm());

    editConfiguration.customForm(TripleLib.sdeForm());
    editConfiguration.setCustomGraph(graph);  
    editConfiguration.setObject(EditConfigurationUtils.getObjectUri(vreq));
    return editConfiguration;
  }
}