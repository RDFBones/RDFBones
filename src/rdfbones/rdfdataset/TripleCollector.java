package rdfbones.rdfdataset;

import java.util.ArrayList;
import java.util.List;

public class TripleCollector {

	public List<Triple> dataTriples = new ArrayList<Triple>();
	public List<Triple> schemeTriples = new ArrayList<Triple>();
	public List<Triple> instanceRestTriples = new ArrayList<Triple>();

	public TripleCollector(List<Triple> triples) {

		for (Triple triple : triples) {
			if (triple instanceof InstanceRestrictionTriple){
				this.instanceRestTriples.add(triple);
			} else if ((triple instanceof RestrictionTriple && !(triple instanceof InstanceRestrictionTriple))
					|| triple.predicate.equals("rdfs:subClassOf")) {
				this.schemeTriples.add(triple);
			} else if (triple.predicate.equals("rdf:type")) {
				this.schemeTriples.add(triple);
			} else {
				this.dataTriples.add(triple);
			}
		}
	}
}
