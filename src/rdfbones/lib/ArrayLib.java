package rdfbones.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import rdfbones.graphData.VariableDependency;
import rdfbones.rdfdataset.Triple;

public class ArrayLib {

	public static List<Triple> copyList(List<Triple> source) {

		List<Triple> dest = new ArrayList<Triple>();
		for (Triple triple : source) {
			dest.add(triple);
		}
		return dest;
	}

	public static List<Triple> getTripleList(Triple triple) {

		List<Triple> dest = new ArrayList<Triple>();
		dest.add(triple);
		return dest;
	}

	public static List<String> copyStrList(List<String> source) {

		List<String> dest = new ArrayList<String>();
		for (String triple : source) {
			dest.add(triple);
		}
		return dest;
	}

	public static void addDistinct(List<String> list, String object) {
		if (!list.contains(object)) {
			list.add(object);
		}
	}

	public static void remove(List<Triple> triples, List<Integer> integers) {

		for (int j = integers.size(); j > 0; j--) {
			triples.remove(integers.get(j - 1).intValue());
		}
	}

	public static void set(List<Triple> triplesToSet, List<Triple> triples,
			List<Integer> integers) {

		for (Integer i : integers) {
			triplesToSet.add(triples.get(i));
		}
	}

	public static String debugList(List<String> list) {

		String arr = new String("");
		for (String str : list) {
			arr += "?" + str + " \t| ";
		}
		return arr;
	}

	public static String debugInteger(List<Integer> list) {

		String arr = new String("");
		for (Integer str : list) {
			arr += str.toString() + " \t| ";
		}
		return arr;
	}

	public static String debugTriples(String tab, List<Triple> list) {

		String arr = new String("\n");
		for (Triple triple : list) {
			arr += tab + "\t" + triple.subject.varName + " \t " + triple.predicate
					+ " \t " + triple.object.varName + "\n";
		}
		return arr;
	}

	public static List<String> getList(String str) {
		List<String> strArray = new ArrayList<String>();
		strArray.add(str);
		return strArray;
	}

	public static List<String> getList(String str1, String str2) {
		List<String> strArray = new ArrayList<String>();
		strArray.add(str1);
		strArray.add(str2);
		return strArray;
	}
	
	public static List<String> getList(String... strings) {
		List<String> strArray = new ArrayList<String>();
		
		for (int i = 0; i < strings.length; ++i) {
    	strArray.add(strings[i]);
    }
		return strArray;
	}

	public static String[] getArray(String str1) {

		String[] list = new String[1];
		list[0] = str1;
		return list;
	}

	public static String[] getArray(String str1, String str2) {

		String[] list = new String[2];
		list[0] = str1;
		list[1] = str2;
		return list;
	}

	public static List<String> concat(List<String> arr1, List<String> arr2) {

		List<String> arr = new ArrayList<String>();
		arr.addAll(arr1);
		arr.addAll(arr2);
		return arr;
	}
	
	public static void remove(List<String> list, String toRemove){
	
		int cnt = 0;
		int i = -1;
		for(String element : list){
			if(element.equals(toRemove)){
				i = cnt;
			}
			cnt++;
		}
		list.remove(i);
	}
	
	public static boolean isIntersect(List<String> arr1, List<String> arr2){
		
		boolean ret = false;
		if(arr2.size() > arr1.size()){
			for(String str : arr2){
				if(arr1.contains(str)){
					ret = true;
					return false;
				}
			}
		} else {
			for(String str : arr1){
				if(arr2.contains(str)){
					ret = true;
					return false;
				}
			}
		}
		return ret;
	}
	
	public static List<String> intersect(List<String> arr1, List<String> arr2){
		
		List<String> ret = new ArrayList<String>();
		if(arr2.size() > arr1.size()){
			for(String str : arr2){
				if(arr1.contains(str)){
					ret.add(str);
				}
			}
		} else {
			for(String str : arr1){
				if(arr2.contains(str)){
					ret.add(str);
				}
			}
		}
		return ret;
	}
	
	static public List<String> getKeySet(Map<String, VariableDependency> varDeps){
		
		List<String> ret = new ArrayList<String>();
		for(String key : varDeps.keySet()){
			ret.add(key);
		}
		return ret;
	}
}
