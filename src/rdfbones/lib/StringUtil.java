package rdfbones.lib;

import java.util.List;
import java.util.UUID;

import rdfbones.rdfdataset.Triple;

public class StringUtil {

  
  public static String rand(int n){
    
    return new String(UUID.randomUUID().toString().substring(0, n));
  }
  
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
  
  public static String cutFromEnd(String str, String toCut){
    return str.substring(0, str.indexOf(toCut));
  }
  
  public static String cutFromEnd(String str, int n){
  	
    return str.substring(0, str.length() - (n + 1));
  }
  
  public static String getClassLabel(String uri){
  
  	if(uri.contains("#")){
  		return getLast(uri, "#");
  	} else if(uri.contains("\\.")){
  		return getLast(uri, "\\.");
  	} else {
  		return getLast(uri, "/");
  	}
  }
  
  public static String getLast(String word, String regex){
  	String[] list = word.split(regex);
		return list[list.length - 1];
  }
}
