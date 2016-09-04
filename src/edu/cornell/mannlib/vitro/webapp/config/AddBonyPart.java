
package edu.cornell.mannlib.vitro.webapp.config;

import java.util.ArrayList;
import java.util.List;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes.*;

public class AddBonyPart {

  public static List<Triple> getTriples() {

    List<Triple> triples = new ArrayList<Triple>();
    triples.add(new Triple1("boneOrgan", "rdfbones:singleBoneOf", "skeletalDivisionClass", "subject"));
    triples.add(new ConstantNewInstance1("boneSegment", "obo:regional_part_of",
        "boneOrgan", "http://w3id.org/rdfbones/core#EntireBone", "object"));
    triples.add(new ConstantNewInstance1("completeness",
        "http://purl.obolibrary.org/obo/IAO_0000136", "boneSegment",
        "http://w3id.org/rdfbones/core#Completeness2State", "object"));
    triples.add(new Triple1("completeness",
        "http://purl.obolibrary.org/obo/OBI_0000999", "comp2State", "subject"));
    triples.add(new Triple1("individual",
        "http://purl.obolibrary.org/obo/BFO_0000051", "completeness", "object"));
    return triples;
  }
  
}
