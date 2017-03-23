package rdfbones.formProcessing;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import rdfbones.form.Form;
import rdfbones.form.FormElement;
import rdfbones.form.LiteralField;
import rdfbones.form.SubformAdder;
import rdfbones.graphData.Graph;
import rdfbones.graphData.GraphPath;
import rdfbones.graphData.VariableDependency;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.GraphLib;
import rdfbones.lib.TripleLib;
import rdfbones.rdfdataset.Constant;
import rdfbones.rdfdataset.GreedyRestrictionTriple;
import rdfbones.rdfdataset.InputNode;
import rdfbones.rdfdataset.MainInputNode;
import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.RestrictionTriple;
import rdfbones.rdfdataset.Triple;
import rdfbones.rdfdataset.TripleCollector;
import rdfbones.test.PathTest;

public class DependencyCalculator {

  public static void calculate(Graph graph, List<Triple> triples, Form form){
    
    List<String> inputVariables = GraphLib.getMainInputVars(triples);
    calculate(graph, triples, form, inputVariables);
  }
  
  public static void calculate(Graph graph, TripleCollector coll, Form form){
    
    List<String> inputVariables = GraphLib.getMainInputVars(coll.schemeTriples);
    calculate(graph, coll.schemeTriples, form, inputVariables);
    
    Map<String, RDFNode> map = GraphLib.processTriples(coll.instanceRestTriples);
  	List<String> inputNodes = ArrayLib.copyStrList(graph.mainInputNodes);
    calculateInstanceRestrictionTriples(graph, form, map, inputNodes);
  }
  
  public static void calculateInstanceRestrictionTriples(Graph graph, Form form, Map<String, RDFNode> map,
  		List<String> inputNodes){
  	
  	for(FormElement element : form.formElements){
  		if(map.containsKey(element.dataKey)){
  			List<GraphPath> paths = GraphLib.getPaths(map.get(element.dataKey), inputNodes);
  			//PathTest.debugPaths(paths);
  			inputNodes.add(element.dataKey);
  			if(graph.variableDependencies.containsKey(element.dataKey)){
  				GraphPath path = paths.get(0);
  				if(path.finalNode instanceof Constant){
  					graph.variableDependencies.get(element.dataKey).extend(path.triples);
  				} else {
  					graph.variableDependencies.get(element.dataKey).extend(path.triples, path.finalNode.varName);
  				}
  			} else {
  				VariableDependency varDep = new VariableDependency(graph, paths.get(0), element.dataKey);
  				graph.variableDependencies.put(element.dataKey, varDep);
  			}
  		}
  		if(element instanceof SubformAdder){
  			List<String> copyInputNodes = ArrayLib.copyStrList(inputNodes);
  			calculateInstanceRestrictionTriples(graph, ((SubformAdder) element).subForm, map, copyInputNodes);
  		}
  	}
  }

  public static void calculate(Graph graph, List<Triple> triples, Form form,
    List<String> inputVariables) {

    if (form == null) {
      return;
    }
    for (FormElement element : form.formElements) {
      if(!(element instanceof LiteralField)){
      	List<Triple> copy = new ArrayList<Triple>(triples.size());
        copy.addAll(triples);
        String node = element.node.varName;
        GraphPath graphPath =
            getGraphPath(copy, inputVariables, node);
        graphPath.validate(inputVariables, copy);
        graph.variableDependencies.put(node, new VariableDependency(graph,
            graphPath, node)); 
        inputVariables.add(node);	
      }
    }
    // Do the iteration for the subforms
    for (FormElement element : form.formElements) {
      if (element instanceof SubformAdder) {
        calculate(graph, triples, ((SubformAdder) element).subForm, inputVariables);
      }
    }
  }
  
  public static GraphPath getGraphPath(List<Triple> triples,
      List<String> inputVars, String node) {

  		return getGraphPath(new GraphPath(), triples, inputVars, node);
  }
  
  static GraphPath getGraphPath(GraphPath path, List<Triple> triples,
    List<String> inputVars, String node) {

    List<Triple> subTriples = getTriple(triples, node);
    for (Triple triple : subTriples) {
      String object = GraphLib.getObject(triple, node);
      if (!inputVars.contains(object)) {
        GraphPath subPath = new GraphPath(triple);
        subPath.input = node;
        path.subPaths.add(getGraphPath(subPath, triples, inputVars, object));
      } else {
        path.triples.add(triple);
      }
    }
    return path;
  }
  
  static List<Triple> getTriple(List<Triple> triples, String node) {
    List<Integer> nums = new ArrayList<Integer>();
    List<Triple> toReturn = new ArrayList<Triple>();
    Integer i = new Integer(0);
    for (Triple triple : triples) {
      if (triple.subject.varName.equals(node) || triple.object.varName.equals(node)) {
        if ((triple instanceof RestrictionTriple) || isTypeRestrictionTriple(triple)) {
          nums.add(i);
          toReturn.add(triple);
        } 
      }
      i++;
    }
    ArrayLib.remove(triples, nums);
    return toReturn;
  }
  
  static boolean isTypeRestrictionTriple(Triple triple){
  
  	if((triple.subject instanceof InputNode) && triple.predicate.equals("rdf:type")){
  		return true;
  	} else {
  		return false;
  	}
  }
}
