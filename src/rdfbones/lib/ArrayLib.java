package rdfbones.lib;

import java.util.ArrayList;
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
      arr += "?" + str + " \t| ";
    }
    return arr;
  }
  
  public static String debugTriples(String tab, List<Triple> list){
    
    String arr = new String("\n");
    for(Triple triple : list){
      arr  += tab + "\t" +  triple.subject.varName + " \t " + triple.predicate + " \t " + triple.object.varName + "\n";
    }
    return arr;
  }
  
  public static List<String> getList(String str){
    List<String> strArray = new ArrayList<String>();
    strArray.add(str);
    return strArray;
  }
}
