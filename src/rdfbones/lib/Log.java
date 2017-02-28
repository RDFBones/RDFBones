package rdfbones.lib;

import java.util.List;

import rdfbones.rdfdataset.Triple;

public class Log {

	public static String triples(List<Triple> triples){
		
    String arr = new String("\n");
    for(Triple triple : triples){
      arr  += "\t" +  triple.subject.varName + " \t " + triple.predicate + " \t " + triple.object.varName + "\n";
    }
    return arr;
	}
}
