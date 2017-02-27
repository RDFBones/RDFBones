package rdfbones.lib;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import rdfbones.form.Form;
import rdfbones.form.FormConfiguration;
import rdfbones.formProcessing.DependencyCalculator;
import rdfbones.formProcessing.WebappConnector;
import rdfbones.graphData.FormGraph;
import rdfbones.graphData.Graph;
import rdfbones.graphData.SubGraphInfo;
import rdfbones.graphData.UnionForm;
import rdfbones.rdfdataset.*;
import webappconnector.PlainJavaWebappConnector;

public class GraphLib {

	public static FormConfiguration getFormConfig(List<Triple> dataTriples,
			List<Triple> schemeTriples, Form form) {

		return getFormConfig(dataTriples, schemeTriples, form,
				new PlainJavaWebappConnector(true));
	}

	public static FormConfiguration getFormConfig(List<Triple> dataTriples,
			List<Triple> schemeTriples, Form form, WebappConnector webapp) {

		List<Triple> schemeCopy1 = ArrayLib.copyList(schemeTriples);
		Graph graph = new Graph(dataTriples, schemeCopy1, webapp);
		form.setGraph(graph);
		List<Triple> schemeCopy2 = ArrayLib.copyList(schemeTriples);
		DependencyCalculator.calculate(graph, schemeCopy2, form);
		return new FormConfiguration(graph, form);
	}

	public static FormConfiguration getFormConfig(List<Triple> dataTriples,
			List<Triple> schemeTriples, Form form, Map<String, FormGraph> formGraphs) {

		return getFormConfig(dataTriples, schemeTriples, form, formGraphs,
				new PlainJavaWebappConnector(true));
	}

	public static FormConfiguration getFormConfig(List<Triple> dataTriples,
			List<Triple> schemeTriples, Form form, Map<String, FormGraph> formGraphs,
			WebappConnector webapp) {

		List<Triple> schemeCopy1 = ArrayLib.copyList(schemeTriples);
		Graph graph = new Graph(dataTriples, schemeCopy1, webapp);
		form.setGraph(graph);
		List<Triple> schemeCopy2 = ArrayLib.copyList(schemeTriples);
		DependencyCalculator.calculate(graph, schemeCopy2, form);
		return new FormConfiguration(graph, form, formGraphs);
	}

	public static void setGraphMap(Graph graph) {
		for (String node : graph.nodes) {
			if (!graph.varName.equals(node)) {
				// graph.log(graph.inputNode + "   " + node);
				graph.mainGraph.graphMap.put(node, graph);
			}
		}
	}

	public static Map<String, String> getLabelMap(Graph graph) {

		LabelDataGetter dataGetter = new LabelDataGetter(graph.mainGraph);
		Map<String, String> map = new HashMap<String, String>();
		for (String labelClass : graph.labelClasses) {
			String classUri = graph.graphDataMap.get(labelClass);
			String value = dataGetter.getLabel(classUri);
			if (graph.mainGraph.inputLabel) {
				value = graph.mainGraph.inputLabelValue + "." + value;
			}
			map.put(labelClass + "Label", value);
		}
		return map;
	}

	public static List<Triple> optionalClassLabelTripels(List<String> inputClasses) {

		List<Triple> triples = new ArrayList<Triple>();
		for (String inputClass : inputClasses) {
			triples.add(new OptionalTriple(inputClass, "rdfs:label", inputClass
					+ "Label"));
		}
		return triples;
	}

	public static List<String> classLabels(List<String> inputClasses) {

		List<String> labels = new ArrayList<String>();
		for (String inputClass : inputClasses) {
			if (inputClass.contains("Type"))
				labels.add(inputClass + "Label");
		}
		return labels;
	}

	public static List<Triple> addLabelTriples(List<Triple> triples) {

		List<Triple> all = new ArrayList<Triple>();
		List<String> labelsOnForm = new ArrayList<String>();
		for (Triple triple : triples) {
			if (triple.predicate.equals("rdfs:label")) {
				labelsOnForm.add(triple.subject.varName);
			}
		}
		for (Triple triple : triples) {
			if (triple.predicate.equals("rdf:type")
					&& triple.object.varName.contains("Type")
					&& !labelsOnForm.contains(triple.subject.varName)) {
				String labelVarName = triple.subject.varName + "Label";
				Triple labelTriple = new Triple(triple.subject, "rdfs:label",
						labelVarName);
				all.add(labelTriple);
			}
			if (triple.predicate.equals("rdfs:label")) {

			}
		}
		all.addAll(triples);
		return all;
	}

	public static void setNodes(Graph graph) {

		graph.nodes = getNodes(graph.dataTriples);
		for (Triple triple : graph.dataTriples) {
			setNodeMap(graph.mainGraph, triple, triple.subject.varName);
			setNodeMap(graph.mainGraph, triple, triple.object.varName);
		}
	}

	public static void setNodeMap(Graph graph, Triple triple, String varName) {
		if (graph.nodeMap.containsKey(varName)) {
			graph.nodeMap.get(varName).add(triple);
		} else {
			List<Triple> triples = new ArrayList<Triple>();
			triples.add(triple);
			graph.nodeMap.put(varName, triples);
		}
	}

	public static List<String> getNodes(List<Triple> triples) {

		List<String> nodes = new ArrayList<String>();
		for (Triple triple : triples) {
			ArrayLib.addDistinct(nodes, triple.subject.varName);
			ArrayLib.addDistinct(nodes, triple.object.varName);
		}
		return nodes;
	}

	public static String getSubject(Triple triple, String varName) {

		if (triple.subject.varName.equals(varName)) {
			return triple.subject.varName;
		} else {
			return triple.object.varName;
		}
	}

	public static String getObject1(Triple triple, String varName) {

		if (triple.subject.varName.equals(varName)) {
			return triple.object.varName;
		} else if (triple.object.varName.equals(varName)) {
			return triple.subject.varName;
		} else {
			return null;
		}
	}

	public static String getObject(Triple triple, String varName) {

		if (triple.subject.varName.equals(varName)
				&& !Boolean.FALSE.equals(triple.fromSubject)) {
			return triple.object.varName;
		} else if (triple.object.varName.equals(varName)
				&& !Boolean.TRUE.equals(triple.fromSubject)) {
			return triple.subject.varName;
		} else {
			return null;
		}
	}

	public static RDFNode getSubjectNode(Triple triple, String varName) {

		if (triple.subject.varName.equals(varName)) {
			return triple.subject;
		} else {
			return triple.object;
		}
	}

	public static RDFNode getObjectNode(Triple triple, String varName) {

		if (triple.subject.varName.equals(varName)) {
			return triple.object;
		} else {
			return triple.subject;
		}
	}

	public static List<Triple> getNotRestrictionTriples(List<Triple> triples,
			String node) {

		List<Triple> toReturn = new ArrayList<Triple>();
		for (Triple triple : triples) {
			if (triple.subject.varName.equals(node)
					|| triple.object.varName.equals(node)) {
				if (!(triple instanceof RestrictionTriple)) {
					toReturn.add(triple);
				}
			}
		}
		return toReturn;
	}

	public static List<String> getObjectNodes(List<Triple> triples) {

		List<String> object = new ArrayList<String>();
		for (Triple triple : triples) {
			object.add(triple.object.varName);
		}
		return object;
	}

	public static List<Triple> getAndRemoveTypeTriples(List<Triple> triples,
			List<String> nodes) {

		List<Triple> toReturn = new ArrayList<Triple>();
		List<Integer> nums = getTypeNums(triples, nodes);
		ArrayLib.set(toReturn, triples, nums);
		ArrayLib.remove(triples, nums);
		return toReturn;
	}

	public static List<Triple> getAndRemoveSubClassTriples(List<Triple> triples,
			List<String> nodes) {

		List<Triple> toReturn = new ArrayList<Triple>();
		List<Integer> nums = getSubClassNums(triples, nodes);
		ArrayLib.set(toReturn, triples, nums);
		ArrayLib.remove(triples, nums);
		return toReturn;
	}

	public static List<Integer> getTypeNums(List<Triple> triples,
			List<String> nodes) {

		return getTripleNums(triples, nodes, "rdf:type");
	}

	public static List<Integer> getSubClassNums(List<Triple> triples,
			List<String> nodes) {

		return getTripleNums(triples, nodes, "rdfs:subClassOf");
	}

	public static List<Integer> getTripleNums(List<Triple> triples,
			List<String> nodes, String predicate) {

		List<Integer> typeNums = new ArrayList<Integer>();
		Integer i = 0;
		for (Triple triple : triples) {
			if (nodes.contains(triple.subject.varName)
					&& triple.predicate.equals(predicate)) {
				typeNums.add(i);
			}
			i++;
		}
		return typeNums;
	}

	public static List<Triple> getTypeTriples(List<Triple> triples,
			List<String> nodes) {
		return getTriples(triples, nodes, "rdf:type");
	}

	public static List<Triple> getSubClassTriples(List<Triple> triples,
			List<String> nodes) {
		return getTriples(triples, nodes, "rdf:subClassOf");
	}

	public static List<Triple> getTriples(List<Triple> triples,
			List<String> nodes, String predicate) {

		List<Triple> typeTriples = new ArrayList<Triple>();
		for (String node : nodes) {
			typeTriples.add(getTriple(triples, node, predicate));
		}
		return typeTriples;
	}

	public static Triple getTriple(List<Triple> triples, String node,
			String predicate) {

		for (Triple triple : triples) {
			if (triple.subject.varName.equals(node)
					&& triple.predicate.equals(predicate)) {
				return triple;
			}
		}
		return null;
	}

	public static List<Triple> getAndRemoveTriples(List<Triple> triples,
			String node) {

		List<Integer> typeNums = new ArrayList<Integer>();
		Integer i = 0;
		List<Triple> neighbours = new ArrayList<Triple>();
		for (Triple triple : triples) {
			if (triple.subject.varName.equals(node)
					&& !(Boolean.FALSE.equals(triple.fromSubject))) {
				neighbours.add(triple);
				typeNums.add(i);
			}
			if (triple.object.varName.equals(node)
					&& !(Boolean.TRUE.equals(triple.fromSubject))) {
				neighbours.add(triple);
				typeNums.add(i);
			}
			i++;
		}
		ArrayLib.remove(triples, typeNums);
		return neighbours;
	}

	public static List<Triple> getRestrictionTriples(List<String> nodes,
			List<Triple> triples) {

		List<Triple> addTo = new ArrayList<Triple>();
		for (Triple triple : triples) {
			if (nodes.contains(triple.subject.varName)
					&& nodes.contains(triple.object.varName)) {
				addTo.add(triple);
			}
		}
		return addTo;
	}

	public static List<Triple> getAndRemoveRestrictionTriples(List<String> nodes,
			List<Triple> triples) {

		List<Integer> nums = new ArrayList<Integer>();
		Integer i = 0;
		for (Triple triple : triples) {
			if (nodes.contains(triple.subject.varName)
					&& nodes.contains(triple.object.varName)) {
				nums.add(i);
			}
			i++;
		}
		List<Triple> toReturn = new ArrayList<Triple>();
		ArrayLib.set(toReturn, triples, nums);
		ArrayLib.remove(triples, nums);
		return toReturn;
	}

	public static List<String> getNewInstances(List<Triple> triples) {

		List<String> newInstances = new ArrayList<String>();
		for (Triple triple : triples) {
			if (!(triple.subject instanceof ExistingInstance)
					&& !(triple.subject instanceof InputNode)) {
				ArrayLib.addDistinct(newInstances, triple.subject.varName);
			}
			if (!(triple.object instanceof ExistingInstance)
					&& !(triple.object instanceof InputNode)
					&& !(triple.object instanceof LiteralVariable)) {
				ArrayLib.addDistinct(newInstances, triple.object.varName);
			}
		}
		return newInstances;
	}

	public static List<String> getExistingInstances(List<Triple> triples) {

		List<String> newInstances = new ArrayList<String>();
		for (Triple triple : triples) {
			if ((triple.subject instanceof ExistingInstance)) {
				ArrayLib.addDistinct(newInstances, triple.subject.varName);
			}
			if (triple.object instanceof ExistingInstance) {
				ArrayLib.addDistinct(newInstances, triple.object.varName);
			}
		}
		return newInstances;
	}

	public static void setSchemeTriples(Graph graph,
			List<Triple> restrictionTriples) {

		List<Triple> restTriples = new ArrayList<Triple>();
		GraphLib.setNodes(graph);
		restTriples.addAll(GraphLib.getAndRemoveTypeTriples(restrictionTriples,
				graph.nodes));
		graph.typeNodes = GraphLib.getObjectNodes(restTriples);
		graph.typeNodes.addAll(GraphLib.typeInstances(restrictionTriples));
		restTriples.addAll(GraphLib.getAndRemoveRestrictionTriples(graph.typeNodes,
				restrictionTriples));
		restTriples.addAll(GraphLib.getAndRemoveSubClassTriples(restrictionTriples,
				graph.typeNodes));
		graph.nodes.addAll(graph.typeNodes);
		graph.schemeTriples = restTriples;
	}

	public static List<String> typeInstances(List<Triple> restrictionTriples) {

		List<String> instances = new ArrayList<String>();
		for (Triple triple : restrictionTriples) {
			if (triple instanceof HasValueRestrictionTriple) {
				ArrayLib.addDistinct(instances, triple.object.varName);
			}
		}
		return instances;
	}

	public static void setDataInputVars(Graph graph) {

		// Variables to set
		graph.triplesToStore = new ArrayList<Triple>();
		graph.newInstances = new ArrayList<String>();
		graph.instances = new ArrayList<String>();
		graph.inputInstances = new ArrayList<String>();
		graph.constantLiterals = new ArrayList<String>();
		graph.inputLiterals = new ArrayList<String>();
		graph.inputClasses = new ArrayList<String>();
		graph.mainInputNodes = new ArrayList<String>();
		graph.labelClasses = new ArrayList<String>();

		graph.typeQueryTriples = new ArrayList<Triple>();
		graph.labelTriples = new ArrayList<Triple>();

		graph.classesToSelect = new ArrayList<String>();

		graph.triplesToStore.addAll(graph.dataTriples);

		// newInstamces, literals inputs
		for (Triple triple : graph.schemeTriples) {
			if (!triple.predicate.equals("rdf:type")) {
				graph.typeQueryTriples.add(triple);
			}
			if (triple.subject instanceof InputNode
					&& !(triple instanceof ExistingRestrictionTriple)) {
				ArrayLib.addDistinct(graph.inputClasses, triple.subject.varName);
				GraphLib.setMainInputNode(triple.subject, graph);
			}
			if (triple.object instanceof InputNode) {
				ArrayLib.addDistinct(graph.inputClasses, triple.object.varName);
				GraphLib.setMainInputNode(triple.object, graph);
			}
		}

		for (Triple triple : graph.dataTriples) {
			if (triple.subject instanceof InputNode) {
				ArrayLib.addDistinct(graph.inputInstances, triple.subject.varName);
				GraphLib.setMainInputNode(triple.subject, graph);
			} else {
				ArrayLib.addDistinct(graph.newInstances, triple.subject.varName);
			}

			if (triple.object instanceof InputNode) {
				if (triple instanceof LiteralTriple) {
					ArrayLib.addDistinct(graph.inputLiterals, triple.object.varName);
					GraphLib.setMainInputNode(triple.object, graph);
				} else {
					ArrayLib.addDistinct(graph.inputInstances, triple.object.varName);
				}
			} else {
				if (triple instanceof LiteralTriple) {
					ArrayLib.addDistinct(graph.constantLiterals, triple.object.varName);
				} else {
					ArrayLib.addDistinct(graph.newInstances, triple.object.varName);
				}
			}
		}

		// triplesToStore, typeQueryTriples, classesToSelect
		for (Triple triple : graph.schemeTriples) {
			if (triple instanceof RestrictionTriple) {
				ArrayLib.addDistinct(graph.classesToSelect, triple.subject.varName);
				ArrayLib.addDistinct(graph.classesToSelect, triple.object.varName);
			} else {

				if (triple.predicate.equals("rdf:type")) {
					if (!(triple.subject instanceof InputNode)) {
						graph.triplesToStore.add(triple);
					}
					if (!(triple.object instanceof InputNode)) {
						ArrayLib.addDistinct(graph.classesToSelect, triple.object.varName);
					}
				}
			}
		}

		for (Triple triple : graph.triplesToStore) {
			if (triple.predicate.equals("rdf:type")) {
				graph.labelClasses.add(triple.object.varName);
				graph.labelTriples.add(new LabelTriple(triple.subject.varName,
						triple.object.varName + "Label"));
			}
		}
		graph.instances.addAll(graph.newInstances);
		graph.instances.addAll(graph.inputInstances);
	}

	public static void setDataRetrievalVars(Graph graph) {

		// Variables to set
		graph.dataRetreivalQuery = new ArrayList<Triple>();
		graph.urisToSelect = new ArrayList<String>();
		graph.literalsToSelect = new ArrayList<String>();
		graph.dataRetreivalQuery.addAll(graph.dataTriples);

		for (String var : graph.newInstances) {
			graph.urisToSelect.add(var);
			graph.urisToSelect.add(var + "Type");
			graph.dataRetreivalQuery.add(QueryLib.getMSTTriple(var));
			graph.literalsToSelect.add(var + "Label");
			graph.dataRetreivalQuery.add(QueryLib.getOptionalLabelTriple(var));
		}

		for (String var : graph.inputInstances) {
			graph.urisToSelect.add(var);
			graph.urisToSelect.add(var + "Type");
			if (graph.typeQueryTriples.size() > 0) {
				graph.typeQueryTriples.add(QueryLib.getMSTTriple(var));
			}
			graph.literalsToSelect.add(var + "Label");
			graph.dataRetreivalQuery.add(QueryLib.getOptionalLabelTriple(var));
		}

		for (String var : graph.inputLiterals) {
			graph.literalsToSelect.add(var);
		}
		for (String var : graph.constantLiterals) {
			graph.literalsToSelect.add(var);
		}
	}

	public static void setMainInputNode(RDFNode node, Graph graph) {
		if (node instanceof MainInputNode) {
			ArrayLib.addDistinct(graph.mainGraph.mainInputNodes, node.varName);
			ArrayLib.addDistinct(graph.mainInputNodes, node.varName);
		}
	}

	public static List<String> getMainInputVars(List<Triple> triples) {
		List<String> mainInputVars = new ArrayList<String>();
		for (Triple triple : triples) {
			if (triple.subject instanceof MainInputNode) {
				mainInputVars.add(triple.subject.varName);
			}
			if (triple.object instanceof MainInputNode) {
				mainInputVars.add(triple.object.varName);
			}
		}
		return mainInputVars;
	}

	public static void incrementRestrictionTriples(List<Triple> triples) {

		int i = 0;
		for (Triple triple : triples) {
			if (triple instanceof RestrictionTriple) {
				((RestrictionTriple) triple).i = i;
				i++;
			}
		}
	}

	public static List<Triple> getSubclassTriples(String input,
			List<Triple> triples) {
		List<Triple> subClassTriples = new ArrayList<Triple>();
		for (Triple triple : triples) {
			if (triple.predicate.equals("rdfs:subClassOf")
					&& triple.subject.varName.equals(input)) {
				subClassTriples.add(triple);
			}
		}
		return subClassTriples;
	}

	public static boolean containsGreedy(List<Triple> triples) {

		for (Triple triple : triples) {
			if (triple instanceof GreedyRestrictionTriple) {
				return true;
			}
		}
		return false;
	}

	public static GreedyRestrictionTriple isGreedy(List<Triple> triples,
			String startNode) {

		for (Triple triple : triples) {
			if ((triple.subject.varName.equals(startNode) || triple.object.varName
					.equals(startNode)) && (triple instanceof GreedyRestrictionTriple)) {
				return (GreedyRestrictionTriple) triple;
			}
		}
		return null;
	}

	public static String assembleTriples(List<Triple> triples) {

		String tripleString = new String("");
		for (Triple triple : triples) {
			tripleString += triple.getTriple();
		}
		return tripleString;
	}

	public static UnionForm getUnionForm(List<Triple> triples, String startNode) {

		List<Triple> graphTriples = new ArrayList<Triple>();
		List<String> nodeBuffer = new ArrayList<String>();
		String greedyNode = null;
		nodeBuffer.add(startNode);
		while (true) {
			SubGraphInfo info = GraphLib.subGraphInfoRemove(triples, startNode,
					nodeBuffer.remove(0));
			if (info.greedyNode != null && greedyNode == null) {
				greedyNode = info.greedyNode;
			}
			graphTriples.addAll(info.triples);
			nodeBuffer.addAll(info.nodes);
			if (nodeBuffer.size() == 0) {
				break;
			}
		}
		return new UnionForm(graphTriples, greedyNode);
	}

	public static SubGraphInfo subGraphInfoRemove(List<Triple> triples,
			String startNode, String node) {

		SubGraphInfo info = new SubGraphInfo();
		List<Integer> nums = new ArrayList<Integer>();
		Integer i = 0;
		for (Triple triple : triples) {
			if (triple.subject.varName.equals(node)
					|| triple.object.varName.equals(node)) {
				if (triple instanceof GreedyRestrictionTriple
						&& !startNode.equals(node)) {
					info.greedyNode = node;
					info.greedyTriple = triple;
				} else {
					info.triples.add(triple);
					nums.add(i);
					info.nodes.add(GraphLib.getObject(triple, node));
				}
			}
			i++;
		}
		ArrayLib.remove(triples, nums);
		return info;
	}

	public static SubGraphInfo subGraphInfo(List<Triple> triples, String node) {

		SubGraphInfo info = new SubGraphInfo();
		for (Triple triple : triples) {
			if (triple.subject.equals(node) || triple.object.equals(node)) {
				info.triples.add(triple);
				info.nodes.add(GraphLib.getObject(triple, node));
			}
		}
		return info;
	}

	public static List<String> getLiterals(List<Triple> triples) {

		List<String> str = new ArrayList<String>();
		for (Triple triple : triples) {
			if (triple instanceof LiteralTriple) {
				str.add(triple.object.varName);
			}
		}
		return str;
	}

	public static List<String> getUris(List<Triple> triples) {

		List<String> str = new ArrayList<String>();
		for (Triple triple : triples) {
			if (!(triple instanceof LiteralTriple)) {
				ArrayLib.addDistinct(str, triple.subject.varName);
				ArrayLib.addDistinct(str, triple.object.varName);
			}
		}
		return str;
	}

	public static Triple getTypeTriple(String varName) {

		return new Triple(varName, "rdf:type", varName + "Type");
	}

	public static Triple getTypeTriple(String varName, String classVarName) {

		return new Triple(varName, "rdf:type", classVarName);
	}

	public static void setTypeTriple(Graph graph, String variableName) {

		for (Triple triple : graph.typeTriples) {
			if (triple.subject.varName.equals(variableName)) {
				graph.triplesToStore.add(triple);
				break;
			}
		}
	}
}
