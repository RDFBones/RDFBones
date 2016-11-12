/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators;

import static edu.cornell.mannlib.vitro.webapp.modelaccess.ModelNames.DISPLAY;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import rdfbones.formProcessing.GraphProcessor;
import rdfbones.lib.JSON;
import rdfbones.lib.TripleSet;
import rdfbones.rdfdataset.ExistingInstance;
import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.InputNode;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.RestrictionTriple;
import rdfbones.rdfdataset.Triple;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.NewURIMakerVitro;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.NewURIMaker;

public class StudyDesignExecutionGenerator implements EditConfigurationGenerator {

	  private Log log = LogFactory.getLog(StudyDesignExecutionGenerator.class);	
	  
    @Override
    public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq,
            HttpSession session) throws Exception {

      EditConfigurationVTwo editConfiguration = new EditConfigurationVTwo();   
      editConfiguration.setTemplate("genericForm.ftl");
      editConfiguration.setSubjectUri(vreq.getParameter("subjectUri"));
      Graph graph = GraphProcessor.getGraph(getTriples(), getSchemeTriples(), "subject");
      graph.init(vreq);
      graph.debug(0);
      editConfiguration.setCustomGraph(graph);
      
      //TripleSet triples = new TripleSet(triplesToCreate);
      //triples.javaDebug();
      
      return editConfiguration;
    }
    
    static List<Triple> getTriples(){
      
      List<Triple> triple = new ArrayList<Triple>();
      triple.add(new Triple(new InputNode("subject"), "obo:BFO_0000051", "studyDesingExecution"));
      triple.add(new MultiTriple("studyDesingExecution", "obo:BFO_0000051", "specimenCollectionProcess"));
      triple.add(new MultiTriple("specimenCollectionProcess", "obo:OBI_0000293", new InputNode("boneSegment")));
      triple.add(new Triple("specimenCollectionProcess", "obo:OBI_0000299", "specimen"));
      triple.add(new Triple("assay", "obo:OBI_0000293", "specimen"));
      triple.add(new MultiTriple("assay", "obo:OBI_0000299", "measurementDatum"));
      triple.add(new Triple("measurementDatum", "obo:IAO_0000299", new InputNode("categoricalLabel")));
      return triple;
    }
    
    static List<Triple> getSchemeTriples(){
      
      List<Triple> triple = new ArrayList<Triple>();
      triple.add(new Triple(new InputNode("subject"), "rdf:type", "subjectType"));
      triple.add(new RestrictionTriple("subjectType", "obo:BFO_0000051", "studyDesignExecutionType"));
      triple.add(new Triple("studyDesingExecution", "rdf:type", "studyDesignExecutionType"));
      triple.add(new Triple("studyDesignExecutionType", "rdfs:subClassOf", "obo:OBI_0000471"));
      triple.add(new Triple("specimenCollectionProcess", "rdf:type", "specimenCollectionProcessType"));
      triple.add(new Triple("assay", "rdf:type", new InputNode("assayType")));
      triple.add(new Triple("specimen", "rdf:type", "specimenType"));
      triple.add(new Triple("specimenCollectionProcessType", "rdfs:subClassOf", "obo:OBI_0000659"));
      triple.add(new Triple("specimenType", "rdfs:subClassOf", "obo:OBI_0100051"));
      triple.add(new Triple("measurementDatum", "rdf:type", new InputNode("measurementDatumType")));
      triple.add(new RestrictionTriple(new InputNode("assayType"), "obo:OBI_0000293", "specimenType"));
      triple.add(new RestrictionTriple("specimenCollectionProcessType", "obo:BFO_0000051", "specimenType"));
      return triple;
    }
}