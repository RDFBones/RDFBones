package rdfbones.graphData;

import java.util.ArrayList;
import rdfbones.rdfdataset.LabelTriple;
import rdfbones.rdfdataset.Triple;
import rdfbones.table.DefaultTable;

public class DefaultFormGraph extends FormGraph {

	public DefaultFormGraph(String dataKey){
		
		this.triples = new ArrayList<Triple>();
		this.triples.add(new LabelTriple(dataKey));
		this.table = new DefaultTable(dataKey);
	}
}
