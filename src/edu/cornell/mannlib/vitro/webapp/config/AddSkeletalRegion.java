package edu.cornell.mannlib.vitro.webapp.config;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.SPARQLQuery;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes.*;

public class AddSkeletalRegion {

  public static List<Triple> getTriples() {

    List<Triple> triples = new ArrayList<Triple>();

    triples.add(new Triple("boneDivision", "obo:systemic_part_of",
        "skeletalDivision", "object"));
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
  
  
  public static JSONObject createTestJSON() throws JSONException {

    JSONObject arrived = new JSONObject();

    JSONObject boneDivision = new JSONObject();
    JSONArray boneOrgan = new JSONArray();

    JSONObject boneOrgan1 = new JSONObject();
    JSONObject boneOrgan2 = new JSONObject();

    JSONObject completeness1 = new JSONObject();
    JSONObject completeness2 = new JSONObject();

    completeness1.put("type", "existing");
    completeness1.put("uri", "complete");

    boneOrgan1.put("uri", "second vertebra");
    boneOrgan1.put("type", "new");
    boneOrgan1.put("comp2State", completeness1);

    completeness2.put("type", "existing");
    completeness2.put("uri", "incomplete");

    boneOrgan2.put("uri", "first vertebra");
    boneOrgan2.put("type", "new");
    boneOrgan2.put("comp2State", completeness2);

    boneOrgan.put(boneOrgan1);
    boneOrgan.put(boneOrgan2);

    boneDivision.put("boneOrgan", boneOrgan);
    boneDivision.put("uri", "vertebral column");
    boneDivision.put("type", "new");

    arrived.put("boneDivision", boneDivision);
    arrived.put("individual", "individualUri#1");

    return arrived;
  }
  
  public static SPARQLQuery boneSegmentQuery() {

    SPARQLQuery query = new SPARQLQuery();
    query.queryText =
        "SELECT ?boneSegment"
            + "WHERE {"
            + " ?individualUri          vitro:mostSpecificType  ?skeletalInventoryType ."
            + " ?skeletalInventoryType  rdfs:subClassOf         ?restriction1  ."
            + " ?restriction1           owl:onProperty          obo:hasPart .  "
            + " ?restriction1           owl:someValuesFrom      ?completeness ."
            + " ?completeteness         rdfs:subClassOf         ?restriction2 . "
            + " ?restriction2           owl:onProperty          obo:isAbout . "
            + " ?restriction2           owl:someValuesFrom      ?boneSegment ."
            + " ?boneSegment            rdf:subClassOf          ?restriction3 ."
            + " ?restriction3           owl:onProperty          obo:regional_part_of ."
            + " ?restriction3           owl:someValuesFrom      ?boneOrgan ."
            + "";

    return query;
  }
  
}
