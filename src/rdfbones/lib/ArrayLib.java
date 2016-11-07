package rdfbones.lib;

import java.util.List;

import rdfbones.rdfdataset.Triple;

public class ArrayLib {

  public static void addDistinct(List<String> list, String object) {
    if(!list.contains(object)){
      list.add(object);
    }
  }
  
  public static void remove(List<Triple> triples, List<Integer> integers){
    
    for(int j = integers.size(); j > 0; j--){
      triples.remove(integers.get(j-1).intValue());
    }
  }
  
  public static void set(List<Triple> triplesToSet, List<Triple> triples, List<Integer> integers){
    
    for(Integer i : integers){
      triplesToSet.add(triples.get(i));
    }
  }
  
  public static String debugList(List<String> list){
    
    String arr = new String("");
    for(String str : list){
      arr += str + " \t ";
    }
    return arr;
  }
}
