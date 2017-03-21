package rdfbones.graphData;

import java.util.ArrayList;
import java.util.List;

import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.Triple;

public class Path {

	public List<Triple> path = new ArrayList<Triple>();
	public RDFNode finalNode;
	public boolean valid = false;
	
	public Path(RDFNode inputNode, Triple triple){
		
		RDFNode previous = inputNode;
		RDFNode next = null;
		Triple nextTriple = triple;
		while(true){
			path.add(nextTriple);
			next = nextTriple.getObject(previous);
			nextTriple = next.nextTriple(previous);
			if(nextTriple == null){
				finalNode = next;
				break;
			}
			previous = next;
		}
	}
}
