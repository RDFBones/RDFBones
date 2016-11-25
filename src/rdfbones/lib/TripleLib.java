package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;

import rdfbones.form.ExistingInstanceSelector;
import rdfbones.form.Form;
import rdfbones.form.FormElement;
import rdfbones.form.Selector;
import rdfbones.form.SubformAdder;
import rdfbones.rdfdataset.Constant;
import rdfbones.rdfdataset.ExistingInstance;
import rdfbones.rdfdataset.ExistingRestrictionTriple;
import rdfbones.rdfdataset.FormInputNode;
import rdfbones.rdfdataset.GreedyRestrictionTriple;
import rdfbones.rdfdataset.InputNode;
import rdfbones.rdfdataset.MainInputNode;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.RestrictionTriple;
import rdfbones.rdfdataset.Triple;

public class TripleLib {

  public static List<Triple> sdeDataTiples() {

    List<Triple> triple = new ArrayList<Triple>();
    triple.add(new Triple(new MainInputNode("subject"), "obo:BFO_0000051", "object"));
    triple
        .add(new MultiTriple("object", "obo:BFO_0000051", "specimenCollectionProcess"));
    triple.add(new MultiTriple("specimenCollectionProcess", "obo:OBI_0000293",
        new ExistingInstance("boneSegment")));
    triple.add(new Triple("specimenCollectionProcess", "obo:OBI_0000299", "specimen"));
    triple.add(new Triple("assay", "obo:OBI_0000293", "specimen"));
    triple.add(new MultiTriple("assay", "obo:OBI_0000299", "measurementDatum"));
    triple.add(new Triple("measurementDatum", "obo:IAO_0000299", new FormInputNode(
        "categoricalLabel")));
    return triple;
  }

  public static List<Triple> sdeSchemeTriples() {

    List<Triple> triple = new ArrayList<Triple>();
    triple.add(new RestrictionTriple("subjectType", "obo:BFO_0000051",
        "studyDesignExecutionType"));
    triple.add(new RestrictionTriple("studyDesignExecutionType", "obo:BFO_0000051",
        new InputNode("assayType")));
    triple.add(new RestrictionTriple(new FormInputNode("assayType"), "obo:OBI_0000293",
        "specimenType"));
    triple.add(new RestrictionTriple("specimenCollectionProcessType", "obo:OBI_0000299",
        "specimenType"));
    triple.add(new RestrictionTriple("specimenCollectionProcessType", "obo:OBI_0000293",
        "entireBonyPart"));
    triple.add(new RestrictionTriple("entireBonyPart", "obo-fma:regional_part_of",
        "bonyPart", "owl:allValuesFrom"));
    triple.add(new RestrictionTriple("bonyPart", "obo-fma:constitutional_part_of",
        "boneOrganType", "owl:someValuesFrom"));
    triple.add(new RestrictionTriple("assayType", "obo:OBI_0000299",
        new FormInputNode( "measurementDatumType")));
    triple.add(new GreedyRestrictionTriple(new FormInputNode("measurementDatumType"), "obo:OBI_0000299",
        "categoricalLabelType", "owl:onClass"));
    triple.addAll(schemeTriplesSubClasses());
    triple.addAll(schemeTriplesTypes());
    return triple;
  }

  public static List<Triple> schemeTriplesSubClasses(){
    
    List<Triple> triple = new ArrayList<Triple>();
    triple.add(new Triple("studyDesignExecutionType", "rdfs:subClassOf", 
        new Constant("obo:OBI_0000471")));
    triple.add(new Triple("specimenCollectionProcessType", "rdfs:subClassOf",
        new Constant("obo:OBI_0000659")));
    triple.add(new Triple("assayType", "rdfs:subClassOf",
        new Constant("obo:OBI_0000070")));
    triple.add(new Triple("measurementDatumType", "rdfs:subClassOf",
        new Constant("obo:OBI_0000070MDType")));
    return triple;
  }
  
  public static List<Triple> schemeTriplesTypes(){
    
    List<Triple> triple = new ArrayList<Triple>();
    triple.add(new Triple(new MainInputNode("subject"), "rdf:type", "subjectType"));
    triple.add(new Triple("assay", "rdf:type", new FormInputNode("assayType")));
    triple.add(new Triple("specimen", "rdf:type", "specimenType"));
    triple.add(new Triple("specimenCollectionProcess", "rdf:type",
        "specimenCollectionProcessType"));
    triple.add(new Triple("measurementDatum", "rdf:type", new FormInputNode(
        "measurementDatumType")));
    triple.add(new Triple("object", "rdf:type", "studyDesignExecutionType"));
    triple.add(new ExistingRestrictionTriple("boneOrgan", "rdf:type", "boneOrganType"));
    triple.add(new ExistingRestrictionTriple("categoricalLabel", "rdf:type", "categoricalLabelType"));
    return triple;
  }
  
  public static Form sdeForm() {

    Form measDatumSubForm = new Form();
    FormElement categoricalLabel = new Selector("categoricalLabel");
    measDatumSubForm.formElements.add(categoricalLabel);

    SubformAdder measurementDatum = new SubformAdder("measurementDatumType");
    measurementDatum.subForm = measDatumSubForm;

    FormElement boneOrgan = new ExistingInstanceSelector("boneOrgan");

    Form assySubForm = new Form();
    assySubForm.formElements.add(boneOrgan);
    assySubForm.formElements.add(measurementDatum);

    SubformAdder assayType = new SubformAdder("assayType");
    assayType.subForm = assySubForm;
    Form mainForm = new Form();
    mainForm.formElements.add(assayType);

    return mainForm;
  }
}
