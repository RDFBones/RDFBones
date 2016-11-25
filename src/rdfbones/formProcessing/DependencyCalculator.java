package rdfbones.formProcessing;

import java.util.ArrayList;
import java.util.List;

import rdfbones.form.Form;
import rdfbones.form.FormElement;
import rdfbones.form.SubformAdder;
import rdfbones.graphData.GraphPath;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.GraphLib;
import rdfbones.lib.TripleLib;
import rdfbones.lib.VariableDependency;
import rdfbones.rdfdataset.ExistingRestrictionTriple;
import rdfbones.rdfdataset.Graph;
import rdfbones.rdfdataset.GreedyRestrictionTriple;
import rdfbones.rdfdataset.RestrictionTriple;
import rdfbones.rdfdataset.Triple;

public class DependencyCalculator {

  public static void calculate(Graph graph, List<Triple> triples, Form form){
    
    List<String> inputVariables = GraphLib.getMainInputVars(triples);
    calculate(graph, triples, form, inputVariables);
  }
  
  public static void calculate(Graph graph, List<Triple> triples, Form form,
    List<String> inputVariables) {

    if (form == null) {
      return;
    }
    for (FormElement element : form.formElements) {
      List<Triple> copy = new ArrayList<Triple>();
      copy.addAll(triples);
      System.out.println("\nNode name : " + element.node.varName + "\n");
      GraphPath graphPath =
          getGraphPath(new GraphPath(), copy, inputVariables, element.node.varName);
      graphPath.validate(inputVariables, TripleLib.sdeSchemeTriples());
      //System.out.println("Valid Debug" );
      //System.out.println(graphPath.debugValid());
      graph.variableDependencies.put(element.node.varName, new VariableDependency(graph,
          graphPath, element.node.varName)); 
      inputVariables.add(element.node.varName);
    }
    // Do the iteration for the subforms
    for (FormElement element : form.formElements) {
      if (element instanceof SubformAdder) {
        List<Triple> copy = new ArrayList<Triple>();
        copy.addAll(triples);
        System.out.println("SecondCalculate. Inputs : "
            + ArrayLib.debugList(inputVariables));
        calculate(graph, copy, ((SubformAdder) element).subForm, inputVariables);
      }
    }
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
        if ((triple instanceof RestrictionTriple) || (triple instanceof ExistingRestrictionTriple)) {
          nums.add(i);
          toReturn.add(triple);
        } 
      }
      i++;
    }
    ArrayLib.remove(triples, nums);
    return toReturn;
  }
}
