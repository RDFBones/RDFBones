package rdfbones.graphData;

import java.util.ArrayList;
import java.util.List;

import rdfbones.lib.ArrayLib;
import rdfbones.lib.GraphLib;
import rdfbones.rdfdataset.Constant;
import rdfbones.rdfdataset.Triple;

public class GraphPath {

  public List<Triple> triples = new ArrayList<Triple>();
  public List<String> inputs = new ArrayList<String>();
  public boolean valid = false;
  public String input;
  public List<GraphPath> subPaths = new ArrayList<GraphPath>();
  public GraphPath(){
   
  }
  
  public GraphPath(String input){
    this.input = input;
  }
  
  public GraphPath(Triple triple){
    triples.add(triple);
  }
  
  public List<Triple> getTriples(){
    for(GraphPath path : this.subPaths){
      this.triples.addAll(path.triples);
    }
    return triples;
  }
  
  public String debugValid(){
    
    String debug = new String("");
    debug += "Inputs : " + this.inputs + "\n";
    for(Triple triple : this.triples){
      debug += triple.subject.varName + "   " + triple.object.varName + " .  \n ";
    }
    return debug;
  }
  
  public String debug(){
  	
  	return this.debug(0);
  }
  
  public String debug(int n){
    
  	String tab = new String(new char[n]).replace("\0", "\t");
    String debug = new String("");
    debug += tab + "Input : " + this.inputs.toString() + "\n";
    for(Triple triple : this.triples){
      debug += tab + triple.subject.varName + "   " + triple.object.varName + " .  \n ";
    }
    n++;
    for(GraphPath path : this.subPaths){
        debug += tab + "Subpath { \n"  + path.debug(n) + "\n" + tab + "  }  \n";  
    }
    return debug;
  }
  
  public boolean validate(List<String> inputs, List<Triple> triples){
    
    //getInput(triples);
    List<String> nodes = GraphLib.getNodes(this.triples);
    //System.out.println("Nodes : " + ArrayLib.debugList(nodes));
    for(String node : nodes){
      if(inputs.contains(node)){
        //System.out.println("Contains!");
        this.valid = true;
        this.inputs.add(node);
      } else {
        //System.out.println("Not contains! : " + node);
        List<Triple> otherTriples = GraphLib.getNotRestrictionTriples(triples, node);
        //System.out.println("otherTriples.length : " + otherTriples.size());
        for(Triple triple : otherTriples){
          if(inputs.contains(GraphLib.getObject(triple, node))){
            //System.out.println("Found : " + GraphLib.getObject(triple, node));
            this.valid = true;
            this.inputs.add(GraphLib.getObject(triple, node));
            this.triples.add(triple);
          } else if(GraphLib.getObjectNode(triple, node) instanceof Constant){
            this.triples.add(triple);
          }
        }
      }
    }
    //Check if the subgraph is valid or not
    for(GraphPath path : this.subPaths){
      if(path.validate(inputs, triples)){
        this.inputs.addAll(path.inputs);
        this.triples.addAll(path.triples);
        this.valid = true;
      } 
    }
    return this.valid;
  }
  
  void getInput(List<Triple> triples){
    if(this.input != null){
      this.triples.addAll(GraphLib.getSubclassTriples(this.input, triples));
    }
  }
}


