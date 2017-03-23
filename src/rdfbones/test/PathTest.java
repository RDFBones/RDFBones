package rdfbones.test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import rdfbones.graphData.GraphPath;
import rdfbones.lib.ArrayLib;
import rdfbones.lib.StringUtil;
import rdfbones.rdfdataset.RDFNode;
import rdfbones.rdfdataset.Triple;

public class PathTest {

	public static void test(RDFNode inputNode) {

		if (inputNode.triples.size() > 2) {
			System.out.println("Error");
		} else {
			for (Triple triple : inputNode.triples) {
				List<RDFNode> list = new ArrayList<RDFNode>();
				list.add(inputNode);
				//System.out.println("InputNode : " + inputNode.varName
				//		+ " ----------  object : " + triple.getObject(inputNode).varName);
				path(inputNode, triple.getObject(inputNode), list);
				System.out.println(ArrayLib.logNodes(list));
			}
		}
	}

	public static void path(RDFNode previous, RDFNode inputNode,
			List<RDFNode> path) {
		path.add(inputNode);
		RDFNode next = inputNode.getNext(previous);
		if(next != null){
			path(inputNode, next, path);
		} 
	}
	
	public static void testMap(Map<String, RDFNode> map) {

		for(String key : map.keySet()){
			System.out.println( map.get(key).varName);
		}
	}
	
	public static void debugPaths(List<GraphPath> paths){
		
		for(GraphPath path : paths){
			if(path.valid){
				System.out.println("debugPath");
				log(StringUtil.debugTriples(path.triples));
				log("FinalNode : " + path.finalNode.varName);
			}
		}
	}
	
	public static void log(String msg){
		System.out.println(msg);
	}	
}
