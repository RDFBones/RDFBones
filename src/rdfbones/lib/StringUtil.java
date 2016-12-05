package rdfbones.lib;

import java.util.List;

import rdfbones.rdfdataset.Triple;

public class StringUtil {

  
  public static String getQuery(String query, String tab){
    return tab + query.replace("\n", "\n" + tab);
  }
  
  public static String debugList(List<String> list){
    
    String arr = new String("");
    for(String str : list){
      arr += "  ?" + str + "  |";
    }
    return arr.substring(0, arr.length() - 2);
  }
  
  public static String debugTriples(String tab, List<Triple> list){
    
    String arr = new String("\n");
    for(Triple triple : list){
      arr  += tab + "\t" +  triple.subject.varName + " \t " + triple.predicate + " \t " + triple.object.varName + "\n";
    }
    return arr;
  }
  
}
