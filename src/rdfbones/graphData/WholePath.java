package rdfbones.graphData;

import java.util.ArrayList;
import java.util.List;

import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.Triple;

public class WholePath extends Path{

	public WholePath(RDFNode inputNode, Triple triple){
		super(inputNode, triple, null);
	}

	private boolean terminates(Triple nextTriple, RDFNode next){
		if(nextTriple == null){
			return true;
		} else {
			return false;
		}
	}
	
}
