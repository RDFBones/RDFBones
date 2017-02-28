package rdfbones.lib;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import rdfbones.form.ExistingInstanceSelector;
import rdfbones.form.Form;
import rdfbones.form.FormElement;
import rdfbones.form.LiteralField;
import rdfbones.form.Selector;
import rdfbones.form.SubformAdder;
import rdfbones.graphData.FormGraph;
import rdfbones.graphData.Graph;
import rdfbones.graphData.Navigator;
import rdfbones.rdfdataset.Constant;
import rdfbones.rdfdataset.ExistingInstance;
import rdfbones.rdfdataset.ExistingRestrictionTriple;
import rdfbones.rdfdataset.FormInputNode;
import rdfbones.rdfdataset.GreedyRestrictionTriple;
import rdfbones.rdfdataset.HasValueRestrictionTriple;
import rdfbones.rdfdataset.InputNode;
import rdfbones.rdfdataset.LiteralTriple;
import rdfbones.rdfdataset.MainInputNode;
import rdfbones.rdfdataset.MultiTriple;
import rdfbones.rdfdataset.QualifiedRestrictionTriple;
import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.RestrictionTriple;
import rdfbones.rdfdataset.Triple;
import rdfbones.table.ImagesCell;
import rdfbones.table.Table;
import rdfbones.table.TableCell;

public class TripleLib {

	public static Form sdeForm() {

		Form measDatumSubForm = new Form("Measurement Datum");

		FormElement categoricalLabel = new Selector("categoricalLabel", "");
		measDatumSubForm.formElements.add(categoricalLabel);

		SubformAdder measurementDatum = new SubformAdder("measurementDatumType",
				"Measurement Type");
		measurementDatum.subForm = measDatumSubForm;

		FormElement boneOrgan = new ExistingInstanceSelector("boneSegment",
				"Bone Segment");

		Form assySubForm = new Form("Assays");
		assySubForm.formElements.add(boneOrgan);
		assySubForm.formElements.add(measurementDatum);

		SubformAdder assayType = new SubformAdder("assayType", "Assays");
		assayType.subForm = assySubForm;

		LiteralField labelField = new LiteralField("objectUriLabel", "Label");

		Form mainForm = new Form("Study Design Execution");
		mainForm.formElements.add(labelField);
		mainForm.formElements.add(assayType);

		return mainForm;
	}

	public static List<Triple> sdeDataTiples() {

		List<Triple> triple = new ArrayList<Triple>();
		triple.add(new Triple(new MainInputNode("subjectUri"), "obo:BFO_0000051",
				"objectUri"));
		triple.add(new MultiTriple("objectUri", "obo:BFO_0000051",
				"assay"));
		triple.add(new MultiTriple("specimenCollectionProcess", "obo:OBI_0000293",
				new ExistingInstance("boneSegment")));
		triple.add(new Triple("specimenCollectionProcess", "obo:OBI_0000299",
				"specimen"));
		triple.add(new Triple("assay", "obo:OBI_0000293", "specimen"));
		triple.add(new MultiTriple("assay", "obo:OBI_0000299", "measurementDatum"));
		triple.add(new Triple("measurementDatum", "obo:IAO_0000299",
				new FormInputNode("categoricalLabel")));
		return triple;
	}

	public static List<Triple> sdeSchemeTriples() {

		List<Triple> triple = new ArrayList<Triple>();
		triple.add(new RestrictionTriple("subjectType", "obo:BFO_0000051",
				"studyDesignExecutionType", "owl:someValuesFrom"));
		triple.add(new RestrictionTriple("studyDesignExecutionType",
				"obo:BFO_0000051", new InputNode("assayType"), "owl:someValuesFrom"));
		triple.add(new QualifiedRestrictionTriple(new FormInputNode("assayType"),
				"obo:OBI_0000293", "specimenType"));
		triple.add(new RestrictionTriple("specimenCollectionProcessType",
				"obo:OBI_0000299", "specimenType", new String("owl:allValuesFrom")));
		triple.add(new RestrictionTriple("specimenCollectionProcessType",
				"obo:OBI_0000293", new FormInputNode("boneSegmentType"), ArrayLib
						.getArray("owl:allValuesFrom", "owl:someValuesFrom")));
		triple.add(new QualifiedRestrictionTriple("assayType", "obo:OBI_0000299",
				new FormInputNode("measurementDatumType")));
		triple.add(new GreedyRestrictionTriple(new FormInputNode(
				"measurementDatumType"), "obo:OBI_0000999", "categoricalLabelType",
				"owl:onClass"));
		triple.addAll(sdeschemeTriplesSubClasses());
		triple.addAll(sdeschemeTriplesTypes());
		return triple;
	}

	public static List<Triple> sdeschemeTriplesSubClasses() {

		List<Triple> triple = new ArrayList<Triple>();
		triple.add(new Triple("studyDesignExecutionType", "rdfs:subClassOf",
				new Constant("obo:OBI_0000471")));
		triple.add(new Triple("specimenCollectionProcessType", "rdfs:subClassOf",
				new Constant("obo:OBI_0000659")));
		triple.add(new Triple("assayType", "rdfs:subClassOf", new Constant(
				"obo:OBI_0000070")));
		// triple.add(new Triple("measurementDatumType", "rdfs:subClassOf",
		// new Constant("obo:OBI_0000070MDType")));
		return triple;
	}

	public static List<Triple> sdeschemeTriplesTypes() {

		List<Triple> triple = new ArrayList<Triple>();
		triple.add(new Triple(new MainInputNode("subjectUri"), "rdf:type",
				"subjectType"));
		triple.add(new Triple("assay", "rdf:type", new FormInputNode("assayType")));
		triple.add(new Triple("specimen", "rdf:type", "specimenType"));
		triple.add(new Triple("specimenCollectionProcess", "rdf:type",
				"specimenCollectionProcessType"));
		triple.add(new Triple("measurementDatum", "rdf:type", new FormInputNode(
				"measurementDatumType")));
		triple.add(new Triple("objectUri", "rdf:type", "studyDesignExecutionType"));
		triple.add(new ExistingRestrictionTriple(new InputNode("boneSegment"),
				"rdf:type", "boneSegmentType"));
		triple.add(new ExistingRestrictionTriple(new InputNode("categoricalLabel"),
				"rdf:type", "categoricalLabelType"));
		return triple;
	}

	public static Map<String, FormGraph> sdeFormGraph() {

		Map<String, FormGraph> formGraphs = new HashMap<String, FormGraph>();
		FormGraph formGraph = new FormGraph(boneOrganTriples(), "boneSegment",
				sdeNavigatorSimplified(), boneOrganTable());
		formGraphs.put("boneSegment", formGraph);
		return formGraphs;
	}

	public static Navigator sdeNavigatorSimplified() {

		MultiTriple skiMultiTriple = new MultiTriple("skeletalInventory",
				"obo:BFO_0000051", "measurementDatum");
		Navigator skiNavigator = new Navigator("skeletalInventory", skiMultiTriple);
		skiNavigator.settings("rdfbones:SkeletalInventory",
				"skeletal inventory");
		return skiNavigator;
	}

	public static Navigator sdeNavigator() {

		MultiTriple skiMultiTriple = new MultiTriple("skeletalInventory",
				"obo:BFO_0000051", "measurementDatum");
		Navigator skiNavigator = new Navigator("skeletalInventory", skiMultiTriple);
		skiNavigator.settings("rdfbones:SkeletalInventory",
				"skeletal inventory");

		MultiTriple cridMultiTriple = new MultiTriple("crid", "obo:IAO_0000136",
				"skeletalInventory");
		Navigator cridNavigator = new Navigator("crid", cridMultiTriple,
				skiNavigator);
		cridNavigator.settings("obo:IAO_0000578", "CRID");

		MultiTriple cridRegMultiTriple = new MultiTriple("crid", "obo:IAO_0000219",
				"cridReg");
		Navigator cridRegNavigator = new Navigator("cridReg", cridRegMultiTriple,
				cridNavigator);
		cridRegNavigator.settings("obo:IAO_0000579", "CRID registry");
		return cridRegNavigator;
	}

	public static Table boneOrganTable() {

		Table boneOrgan = new Table("bone organ");
		boneOrgan.cells.add(new TableCell("Label", "label", 0));
		boneOrgan.cells.add(new TableCell("Type", "typeLabel", 1));
		//boneOrgan.cells.add(new ImagesCell(2));
		return boneOrgan;
	}

	public static List<Triple> boneOrganTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		triples
				.add(new Triple("measurementDatum", "obo:IAO_0000136", "boneSegment"));
		triples.add(new Triple("boneSegment", "obo-fma:regional_part_of",
				"bonyPart"));
		triples.add(new Triple("bonyPart", "obo-fma:constitutional_part_of",
				"boneOrgan"));
		triples.add(new Triple("boneOrgan", "vitro:mostSpecificType", "type"));
		triples.add(new LiteralTriple("type", "rdfs:label", "typeLabel"));
		triples.add(new LiteralTriple("boneOrgan", "rdfs:label", "label"));
		// triples.addAll(getImageTriples("boneOrgan"));
		return triples;
	}

	public static List<Triple> getImageTriples(String varName) {

		List<Triple> triples = new ArrayList<Triple>();
		triples.add(new MultiTriple(varName, "rdfbones:isDepicted", "image"));
		triples.add(new Triple("image",
				"<http://vivo.mydomain.edu/individual/hasFile>", "file"));
		triples.add(new LiteralTriple("file", "vitro-public:downloadLocation",
				"url"));
		return triples;
	}

	public static Form csrForm() {

		Selector catLabelSelector = new Selector("categoricalLabel");
		Form measurementForm = new Form("");
		measurementForm.style = "inline";
		measurementForm.formElements.add(catLabelSelector);

		SubformAdder boneOrganFormElement = new SubformAdder("boneOrganType",
				"BoneOrgans");
		boneOrganFormElement.style = "inline";
		boneOrganFormElement.subForm = measurementForm;
		Form boneOrganForm = new Form("");
		boneOrganForm.formElements.add(boneOrganFormElement);

		SubformAdder skeletalRegion = new SubformAdder("skeletalRegionType",
				"Skeletal Regions");
		skeletalRegion.subForm = boneOrganForm;
		Form mainForm = new Form("Skull");
		mainForm.formElements.add(skeletalRegion);
		return mainForm;
	}

	public static List<Triple> csrDataTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		RDFNode subject = new MainInputNode("subjectUri");

		triples.add(new Triple(subject, "rdfbones:hasCoherentSkeletalRegion",
				"objectUri"));
		triples.add(new Triple(subject, "obo:BFO_0000051", "measurementDatum",
				false));
		triples.add(new Triple("measurementDatum", "obo:IAO_0000299",
				new FormInputNode("categoricalLabel")));
		triples.add(new Triple("measurementDatum", "obo:IAO_0000136",
				"bonyPartSegment"));
		triples.add(new Triple("bonyPartSegment", "obo-fma:regional_part_of",
				"bonyPart"));
		triples.add(new Triple("bonyPart", "obo-fma:constitutional_part_of",
				"boneOrgan"));
		triples.add(new MultiTriple("boneOrgan", "obo-fma:systemic_part_of",
				"skeletalRegion"));
		triples.add(new MultiTriple("skeletalRegion", "obo-fma:systemic_part_of",
				"objectUri"));
		return triples;
	}

	public static List<Triple> csrSchemeTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		// RestrictionTriples
		triples.add(new RestrictionTriple("skeletalInventoryType",
				"obo:BFO_0000051", "measurementDatumType", "owl:someValuesFrom"));
		triples.add(new GreedyRestrictionTriple("measurementDatumType",
				"obo:OBI_0000999", "categoricalLabelType", "owl:allValuesFrom"));
		triples.add(new RestrictionTriple("measurementDatumType",
				"obo:IAO_0000136", "bonyPartSegmentType", "owl:allValuesFrom"));
		triples.add(new RestrictionTriple("bonyPartSegmentType",
				"obo-fma:regional_part_of", "bonyPartType", "owl:allValuesFrom"));
		triples.add(new RestrictionTriple("bonyPartType",
				"obo-fma:constitutional_part_of", new FormInputNode("boneOrganType"),
				"owl:someValuesFrom"));
		triples.add(new RestrictionTriple(new FormInputNode("boneOrganType"),
				"obo-fma:systemic_part_of", new FormInputNode("skeletalRegionType"),
				"owl:someValuesFrom"));
		triples.add(new RestrictionTriple(new FormInputNode("skeletalRegionType"),
				"obo-fma:systemic_part_of", new MainInputNode("rangeUri"),
				"owl:someValuesFrom"));
		triples.addAll(csrTypeTriples());
		return triples;
	}

	public static List<Triple> csrTypeTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		triples.add(new Triple("objectUri", "rdf:type", new MainInputNode(
				"rangeUri")));
		triples.add(new Triple("skeletalRegion", "rdf:type", new FormInputNode(
				"skeletalRegionType")));
		triples.add(new Triple("boneOrgan", "rdf:type", new FormInputNode(
				"boneOrganType")));
		triples.add(new Triple("bonyPart", "rdf:type", "bonyPartType"));
		triples
				.add(new Triple("bonyPartSegment", "rdf:type", "bonyPartSegmentType"));
		triples.add(new Triple("measurementDatum", "rdf:type",
				"measurementDatumType"));
		triples.add(new Triple(new MainInputNode("subjectUri"), "rdf:type",
				"skeletalInventoryType"));
		triples.add(new ExistingRestrictionTriple(
				new InputNode("categoricalLabel"), "rdf:type", "categoricalLabelType"));
		return triples;
	}

	public static Form srForm() {

		SubformAdder measurementFormElement = new SubformAdder(
				"measurementDatumType", "Categorical Label");
		Form measurementForm = new Form("");
		measurementForm.formElements.add(measurementFormElement);

		/*
		 * SubformAdder boneSegmentFormElement = new
		 * SubformAdder("bonyPartSegmentType", "Bone Segment");
		 * boneSegmentFormElement.subForm = measurementForm; Form boneSegmentForm =
		 * new Form(""); boneSegmentForm.formElements.add(boneSegmentFormElement);
		 */
		SubformAdder boneOrganFormElement = new SubformAdder("boneOrganType",
				"BoneOrgans");
		boneOrganFormElement.subForm = measurementForm;
		Form boneOrganForm = new Form("");
		boneOrganForm.formElements.add(boneOrganFormElement);

		SubformAdder skeletalRegion = new SubformAdder("skeletalRegionType",
				"Skeletal Regions");
		skeletalRegion.subForm = boneOrganForm;
		Form mainForm = new Form("Skull");
		mainForm.formElements.add(skeletalRegion);
		return mainForm;
	}

	public static List<Triple> srDataTriples() {

		List<Triple> triples = new ArrayList<Triple>();

		triples.add(new MultiTriple("object", "rdf:type", new FormInputNode(
				"skeletalRegionType")));
		triples.add(new MultiTriple("boneOrgan", "rdf:type", new FormInputNode(
				"boneOrganType")));
		triples.add(new Triple("bonyPart", "rdf:type", "bonyPartType"));
		triples
				.add(new Triple("bonyPartSegment", "rdf:type", "bonyPartSegmentType"));
		triples.add(new Triple("measurementDatum", "rdf:type",
				"measurementDatumType"));
		triples.add(new Triple("subject", "rdf:type", "skeletalInventoryType",
				false));
		return null;
	}

	public static List<Triple> srSchemeTriples() {
		List<Triple> triples = new ArrayList<Triple>();
		// RestrictionTriples
		triples.add(new RestrictionTriple("skeletalInventoryType",
				"obo:BFO_0000051", new FormInputNode("measurementDatumType"),
				"owl:someValuesFrom"));
		triples.add(new RestrictionTriple("measurementDatumType",
				"obo:IAO_0000136", new FormInputNode("bonyPartSegmentType"),
				"owl:allValuesFrom"));
		triples.add(new RestrictionTriple("bonyPartSegmentType",
				"obo-fma:regional_part_of", new FormInputNode("bonyPartType"),
				"owl:allValuesFrom"));
		triples.add(new RestrictionTriple(new FormInputNode("bonyPartType"),
				"obo-fma:constitutional_part_of", new FormInputNode("boneOrganType"),
				"owl:someValuesFrom"));
		triples.add(new RestrictionTriple(new FormInputNode("boneOrganType"),
				"obo-fma:systemic_part_of", new FormInputNode("skeletalRegionType"),
				"owl:someValuesFrom"));
		triples.add(new RestrictionTriple(new FormInputNode("skeletalRegionType"),
				"obo-fma:systemic_part_of", new MainInputNode("rangeUri"),
				"owl:someValuesFrom"));
		triples.addAll(srTypeTriples());
		return triples;
	}

	public static List<Triple> srTypeTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		triples.add(new MultiTriple("object", "rdf:type", new FormInputNode(
				"skeletalRegionType")));
		triples.add(new MultiTriple("boneOrgan", "rdf:type", new FormInputNode(
				"boneOrganType")));
		triples.add(new Triple("bonyPart", "rdf:type", "bonyPartType"));
		triples
				.add(new Triple("bonyPartSegment", "rdf:type", "bonyPartSegmentType"));
		triples.add(new Triple("measurementDatum", "rdf:type",
				"measurementDatumType"));
		triples.add(new Triple(new MainInputNode("subject"), "rdf:type",
				"skeletalInventoryType"));
		return triples;
	}

	public static Form sbForm() {

		SubformAdder measurementFormElement = new SubformAdder(
				"measurementDatumType", "Bone Segment");
		Form measurementForm = new Form("");
		measurementForm.formElements.add(measurementFormElement);

		SubformAdder boneSegmentFormElement = new SubformAdder(
				"bonyPartSegmentType", "Bone Segment");
		boneSegmentFormElement.subForm = measurementForm;
		Form boneSegmentForm = new Form("");
		boneSegmentForm.formElements.add(boneSegmentFormElement);

		SubformAdder boneOrganFormElement = new SubformAdder("boneOrganType",
				"BoneOrgans");
		boneOrganFormElement.subForm = boneSegmentForm;
		Form boneOrganForm = new Form("");
		boneOrganForm.formElements.add(boneOrganFormElement);

		Form mainForm = new Form("");
		mainForm.formElements.add(boneOrganFormElement);
		return mainForm;
	}

	public static List<Triple> sbDataTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		triples.add(new Triple("subject", "obo:BFO_0000051", "measurementDatum"));
		triples.add(new MultiTriple("measurementDatum", "obo:IAO_0000136",
				"bonyPartSegment"));
		triples.add(new MultiTriple("bonyPartSegment", "obo-fma:regional_part_of",
				"bonyPart"));
		triples.add(new Triple("bonyPart", "obo-fma:constitutional_part_of",
				"object"));
		return triples;
	}

	public static List<Triple> sbSchemeTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		// RestrictionTriples
		triples.add(new RestrictionTriple("skeletalInventoryType",
				"obo:BFO_0000051", new FormInputNode("measurementDatumType"),
				"owl:someValuesFrom"));
		triples.add(new RestrictionTriple(
				new FormInputNode("measurementDatumType"), "obo:IAO_0000136",
				"bonyPartSegmentType", "owl:allValuesFrom"));
		triples.add(new RestrictionTriple("bonyPartSegmentType",
				"obo-fma:regional_part_of", "bonyPartType", "owl:allValuesFrom"));
		triples.add(new RestrictionTriple("bonyPartType",
				"obo-fma:constitutional_part_of", new FormInputNode("boneOrganType"),
				"owl:someValuesFrom"));
		triples
				.add(new RestrictionTriple(new FormInputNode("boneOrganType"),
						"obo-fma:systemic_part_of", "skeletalRegionType",
						"owl:someValuesFrom"));
		triples.add(new RestrictionTriple("skeletalRegionType",
				"obo-fma:systemic_part_of", new MainInputNode("rangeUri"),
				"owl:someValuesFrom"));
		triples.addAll(sbTypeTriples());
		return triples;
	}

	public static List<Triple> sbTypeTriples() {
		List<Triple> triples = new ArrayList<Triple>();
		triples.add(new Triple("object", "rdf:type", new FormInputNode(
				"boneOrganType")));
		triples.add(new Triple("bonyPart", "rdf:type", "bonyPartType"));
		triples
				.add(new Triple("bonyPartSegment", "rdf:type", "bonyPartSegmentType"));
		triples.add(new Triple("measurementDatum", "rdf:type",
				"measurementDatumType"));
		triples.add(new Triple(new MainInputNode("subject"), "rdf:type",
				"skeletalInventoryType"));
		return triples;
	}

	public static List<Triple> skeletalInvTypeTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		triples.add(GraphLib.getTypeTriple("subjectUri", "investigationType"));
		triples.add(GraphLib.getTypeTriple("plan"));
		triples.add(GraphLib.getTypeTriple("planning"));
		triples.add(GraphLib.getTypeTriple("skeletalMaterialSpecification"));
		triples.add(GraphLib.getTypeTriple("skeletalInventory"));
		return triples;
	}

	public static Form skeletalInvForm() {

		FormElement skeletalInventory = new ExistingInstanceSelector(
				"skeletalInventory", "Select skeletal inventory");
		Form mainForm = new Form("SkeletalInventory");
		mainForm.formElements.add(skeletalInventory);
		return mainForm;
	}

	public static List<Triple> skeletalInvDataTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		triples.add(new Triple(new MainInputNode("subjectUri"), "obo:BFO_00000051",
				"planning"));
		triples.add(new Triple("planning", "obo:BFO_00000339", "studyDesign"));
		triples.add(new Triple("plan", "obo:RO_00000059", "studyDesign"));
		triples.add(new Triple("plan", "obo:BFO_00000051",
				"skeletalMaterialSpecification"));
		triples.add(new MultiTriple("skeletalMaterialSpecification",
				"obo:IAO_00000136", "skeletalInventory"));
		return triples;
	}

	public static List<Triple> skeletalInvRestrictionTriples() {

		List<Triple> triples = new ArrayList<Triple>();
		triples.add(new RestrictionTriple("investigationType", "obo:BFO_0000051",
				"planningType", "owl:someValuesFrom"));
		triples.add(new HasValueRestrictionTriple("planningType",
				"obo:OBI_0000299", "studyDesign"));
		triples.add(new HasValueRestrictionTriple("planType", "obo:RO_0000059",
				"studyDesign"));
		triples.add(new RestrictionTriple("planType", "obo:BFO_0000051",
				"skeletalMaterialSpecificationType", "owl:someValuesFrom"));
		triples.add(new RestrictionTriple("skeletalMaterialSpecificationType",
				"obo:IAO_0000136", "skeletalInventoryType", "owl:someValuesFrom"));
		triples.addAll(TripleLib.skeletalInvTypeTriples());
		return triples;
	}

}

/*
 * USED LATER triple.add(new RestrictionTriple("subjectType", "obo:BFO_0000051",
 * "planningType", "owl:someValuesFrom"));
 * 
 * triple.add(new RestrictionTriple("planningType", "obo:BFO_0000339",
 * "studyDesign", "owl:hasValue")); triple.add(new
 * RestrictionTriple("studyDesign", "obo:BFO_0000339", "planType",
 * "owl:hasValue")); triple.add(new RestrictionTriple("planType",
 * "obo:BFO_0000051", "skeletalMaterialSpecificationType", "owl:hasValue"));
 * triple.add(new RestrictionTriple("skeletalMaterialSpecificationType",
 * "obo:BFO_0000051", //"skeletalInventoryType", "owl:hasValue")); new
 * InputNode("boneSegment"), "owl:hasValue")); triple.add(new
 * Triple("skeletalInventory", "rdf:type", "skeletalInventoryType"));
 * triple.add(new ExistingRestrictionTriple("skeletalInventory",
 * "obo:BFO_0000051", "measurementDatum")); triple.add(new
 * ExistingRestrictionTriple("measurementDatum", "obo:IAO_0000136", new
 * InputNode("boneSegment")));
 */