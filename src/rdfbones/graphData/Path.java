package rdfbones.graphData;

import java.util.ArrayList;
import java.util.List;

import rdfbones.lib.StringUtil;
import rdfbones.rdfdataset.Constant;
import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.Triple;

public class Path{

	public List<String> inputNodes;
	public List<Triple> path = new ArrayList<Triple>();
	public RDFNode finalNode;
	public boolean valid = false;
	
	public Path(RDFNode inputNode, Triple triple, List<String> inputNodes) {

		this.inputNodes = inputNodes;
		process(inputNode, triple);
	}
	
	private void process(RDFNode inputNode, Triple triple){
		
		RDFNode previous = inputNode;
		RDFNode next = null;
		Triple nextTriple = triple;
		while(true){
			path.add(nextTriple);
			next = nextTriple.getObject(previous);
			nextTriple = next.nextTriple(previous);
			if(terminates(nextTriple, next)){
				finalNode = next;
				validate(finalNode);
				break;
			}
			previous = next;
		}
	}

	private boolean terminates(Triple nextTriple, RDFNode next){
		if(nextTriple == null || this.inputNodes.contains(next.varName)){
			return true;
		} else {
			return false;
		}
	}	
	
	public void validate(RDFNode next){
		
		if(this.inputNodes.contains(next.varName) || next instanceof Constant){
			System.out.println(StringUtil.debugList(inputNodes));
			System.out.println("Validate : " + next.varName);
			this.valid = true;
		}
	}
}
