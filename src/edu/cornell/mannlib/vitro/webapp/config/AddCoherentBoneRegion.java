package edu.cornell.mannlib.vitro.webapp.config;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.SPARQLQuery;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes.*;

public class AddCoherentBoneRegion {

  public static List<Triple> getTriples() {

    List<Triple> triples = new ArrayList<Triple>();

    //triples.add(new Triple("boneDivision", "obo:constitutional_part_of",
    //  "skeletalDivision", "object"));
    triples.add(new Triple("boneOrgan", "obo:systemic_part_of",
        "boneDivision", "object"));
    triples.add(new ConstantNewInstance("boneSegment", "obo:regional_part_of",
        "boneOrgan", "http://w3id.org/rdfbones/core#EntireBone", "object"));
    triples.add(new ConstantNewInstance("completeness",
        "http://purl.obolibrary.org/obo/IAO_0000136", "boneSegment",
        "http://w3id.org/rdfbones/core#Completeness2State", "object"));
    triples.add(new Triple("completeness",
        "http://purl.obolibrary.org/obo/OBI_0000999", "comp2State", "subject"));
    triples.add(new Triple("individual",
        "http://purl.obolibrary.org/obo/BFO_0000051", "completeness", "object"));
    return triples;
  }
}
