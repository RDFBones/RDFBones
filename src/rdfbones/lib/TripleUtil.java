package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;

import rdfbones.rdfdataset.InstanceTypeRestrictionTriple;
import rdfbones.rdfdataset.Triple;

public class TripleUtil {

  public static List<Triple> instanceTypeRestrictionTriples(List<Triple> triples,
    boolean remove) {

    List<Triple> response = new ArrayList<Triple>();
    List<Integer> nums = new ArrayList<Integer>();
    Integer i = 0;
    for (Triple triple : triples) {
      if (triple instanceof InstanceTypeRestrictionTriple) {
        response.add(triple);
        nums.add(i);
      }
    }
    if (remove) {
      ArrayLib.remove(triples, nums);
    }
    return response;
  }
}
