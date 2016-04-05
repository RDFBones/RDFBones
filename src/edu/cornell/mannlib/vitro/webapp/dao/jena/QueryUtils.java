/* $This file is distributed under the terms of the license in /doc/license.txt$ */

package edu.cornell.mannlib.vitro.webapp.dao.jena;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.query.ResultSetFactory;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.Resource;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.rdfservice.RDFService;
import edu.cornell.mannlib.vitro.webapp.rdfservice.RDFServiceException;

/** 
 * Utilities for executing queries and working with query results. 
 * 
 */

public class QueryUtils {
    
    private static final Log log = LogFactory.getLog(QueryUtils.class);
    
    private QueryUtils() { }
    
    public static List<Map<String, String>> getQueryVars(ResultSet results, String[] uris, String[] literals){
      
      List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();
      while(results.hasNext()){
        QuerySolution sol = results.next();
        //Map for the row of the result
        Map<String, String> resultMap  = new HashMap<String, String>();
        if(literals != null){
          for(String literal : literals){
            resultMap.put(literal, sol.getLiteral(literal).getString());
          }
        }
        if(uris != null){
          for(String uri : uris){
            resultMap.put(uri, sol.get(uri).asResource().getURI());
          }
        }
        resultList.add(resultMap);
      }
      return resultList;
    }
    
    
    public static Map<String,Object> querySolutionToObjectValueMap( QuerySolution soln){
        Map<String,Object> map = new HashMap<String,Object>();
        Iterator<String> varNames = soln.varNames();
        while(varNames.hasNext()){
            String varName = varNames.next();
            Object value = nodeToObject( soln.get(varName));
            log.debug("Adding " + varName + " : " + value + " to query solution data.");            
            map.put(varName, value);
        }
        return map;
    }
 
    public static Map<String,String> querySolutionToStringValueMap( QuerySolution soln ){
        Map<String,String> map = new HashMap<String,String>();
        Iterator<String> varNames = soln.varNames();
        while(varNames.hasNext()){
            String varName = varNames.next();
            String value = nodeToString( soln.get(varName));
            log.debug("Adding " + varName + " : " + value + " to query solution data.");
            map.put(varName, value);           
        }
        return map;
    }
    
	/**
	 * If any pair of maps in the list has the same (non-null) value for any of
	 * these keys, call the maps duplicates and keep only the first of them.
	 */
	public static List<Map<String, String>> removeDuplicatesMapsFromList(
			List<Map<String, String>> rawList, String... keys) {
		List<Map<String, String>> filteredList = new ArrayList<>();
		outerLoop: for (Map<String, String> rawMap : rawList) {
			for (Map<String, String> filteredMap : filteredList) {
				for (String key : keys) {
					String rawValue = rawMap.get(key);
					if (rawValue != null) {
						if (rawValue.equals(filteredMap.get(key))) {
							if (log.isDebugEnabled()) {
								logDuplicateRows(rawMap, filteredMap, keys);
							}
							continue outerLoop;
						}
					}
				}
			}
			filteredList.add(rawMap);
		}
		return filteredList;
	}

	private static void logDuplicateRows(Map<String, String> rawMap,
			Map<String, String> filteredMap, String... keys) {
		log.debug("Found duplicate rows, by at least one of these keys: "
				+ Arrays.toString(keys) + ". Keeping " + filteredMap
				+ ". Discarding " + rawMap + ".");
	}
    
    public static Object nodeToObject( RDFNode node ){
        if( node == null ){
            return "";
        }else if( node.isLiteral() ){
            Literal literal = node.asLiteral();
            return literal.getValue();
        }else if( node.isURIResource() ){
            Resource resource = node.asResource();
            return resource.getURI();
        }else if( node.isAnon() ){  
            Resource resource = node.asResource();
            return resource.getId().getLabelString(); //get b-node id
        }else{
            return "";
        }
    }

    public static String nodeToString( RDFNode node ){
        if( node == null ){
            return "";
        }else if( node.isLiteral() ){
            Literal literal = node.asLiteral();
            return literal.getLexicalForm();
        }else if( node.isURIResource() ){
            Resource resource = node.asResource();
            return resource.getURI();
        }else if( node.isAnon() ){  
            Resource resource = node.asResource();
            return resource.getId().getLabelString(); //get b-node id
        }else{
            return "";
        }
    }
    
    /** Manually replace query variables with uris when prebinding causes the query to fail, probably
     * due to a Jena bug.
     */
    public static String subUrisForQueryVars(String queryString, Map<String, String> varsToUris) {
        
        for (String var : varsToUris.keySet()) {
           queryString = subUriForQueryVar(queryString, var, varsToUris.get(var));
        }
        return queryString;
    }

    /** Manually replace a query variable with a uri when prebinding causes the query to fail, probably
     * due to a Jena bug.
     */
    public static String subUriForQueryVar(String queryString, String varName, String uri) {
        return queryString.replaceAll("\\?" + varName + "\\b", "<" + uri + ">");
    }
    
    /**Replace one variable name with another**/
    public static String replaceQueryVar(String queryString, String varName, String newVarName) {
        return queryString.replaceAll("\\?" + varName + "\\b", "?" + newVarName);
    }
    
    public static ResultSet getQueryResults(String queryStr, VitroRequest vreq) {
        return getQueryResults(queryStr, vreq.getRDFService());
    }

    public static ResultSet getQueryResults(String queryStr, QuerySolution initialBindings, RDFService rdfService) {
    	return getQueryResults(bindVariables(queryStr, initialBindings), rdfService);
    }
    
	public static ResultSet getLanguageNeutralQueryResults(String queryStr, VitroRequest vreq) {
    	return getQueryResults(queryStr, vreq.getUnfilteredRDFService());
    }

    /** Already have the dataset, so process the query and return the results. */
	private static ResultSet getQueryResults(String queryStr, RDFService rdfService) {
	    try {
            return ResultSetFactory.fromJSON(
                    rdfService.sparqlSelectQuery(queryStr, RDFService.ResultFormat.JSON));
	    } catch (RDFServiceException e) {
	        throw new RuntimeException(e);
	    }
	}

	/**
	 * The RDFService interface doesn't support initial bindings, so do text
	 * substitutions instead.
	 */
	public static String bindVariables(String queryStr,
			QuerySolution initialBindings) {
		String bound = queryStr;
		for (Iterator<String> it = initialBindings.varNames(); it.hasNext();) {
			String name = it.next();
			RDFNode node = initialBindings.get(name);
			if (node.isLiteral()) {
				bound = bound.replace('?' + name, literalToString(node.asLiteral()));
			} else if (node.isURIResource()) {
				bound = bound.replace('?' + name,  '<'+node.asResource().getURI()+ '>');
			}else {
				log.warn("Failed to bind anonymous resource variable '" + name
						+ "' to query '" + bound + "'");
			}
		}
		return bound;
	}

	private static String literalToString(Literal l) {
		StringBuilder buffer = new StringBuilder();
		buffer.append('"').append(l.getLexicalForm()).append('"');
		if (l.getDatatypeURI() != null) {
			buffer.append("^^<").append(l.getDatatypeURI()).append(">");
		} else if (StringUtils.isNotEmpty(l.getLanguage())) {
			buffer.append("@").append(l.getLanguage());
		}
		return buffer.toString();
	}


}
