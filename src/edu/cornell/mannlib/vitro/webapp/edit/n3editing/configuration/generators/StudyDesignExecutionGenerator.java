/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators;

import static edu.cornell.mannlib.vitro.webapp.modelaccess.ModelNames.DISPLAY;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import rdfbones.formProcessing.GraphProcessor;
import rdfbones.lib.TripleLib;
import webappconnector.WebappConnector;
import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.InputNode;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.RestrictionTriple;
import rdfbones.rdfdataset.Triple;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;

public class StudyDesignExecutionGenerator implements EditConfigurationGenerator {

  private Log log = LogFactory.getLog(StudyDesignExecutionGenerator.class);

  @Override
  public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
    HttpSession session) throws Exception {

    EditConfigurationVTwo editConfiguration = new EditConfigurationVTwo();
    editConfiguration.setTemplate("genericForm.ftl");
    editConfiguration.setSubjectUri(vreq.getParameter("subjectUri"));
    Graph graph = GraphProcessor.getGraph(TripleLib.sdeDataTiples(), TripleLib.sdeSchemeTriples(), "subject");
    graph.init(new WebappConnector(vreq));
    //graph.debug(0);
    editConfiguration.setCustomGraph(graph);

    // TripleSet triples = new TripleSet(triplesToCreate);
    // triples.javaDebug();

    return editConfiguration;
  }
}