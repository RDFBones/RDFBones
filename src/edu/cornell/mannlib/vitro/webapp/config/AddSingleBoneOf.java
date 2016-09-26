
package edu.cornell.mannlib.vitro.webapp.config;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.cornell.mannlib.vitro.webapp.edit.n3editing.dataOperation.SPARQLQuery;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.tripleTypes.*;

public class AddSingleBoneOf {

  public static List<Triple> getTriples() {

    List<Triple> triples = new ArrayList<Triple>();
    triples.add(new Triple("boneOrgan", "rdfbones:singleBoneOf", "skeletalDivisionClass", "subject"));
    return triples;
  }
}
