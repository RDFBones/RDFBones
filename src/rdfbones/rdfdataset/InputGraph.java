package rdfbones.rdfdataset;

import java.util.List;
import java.util.Map;

public class InputGraph {

  Map<String, List<InputGraph>> subGraphs;
  List<Triple> dataTriples;
  List<Triple> restrictionTriples;
  String startNode;
  InputGraph(List<Triple> saveTriples){
    
  }
}
