<%-- $This file is distributed under the terms of the license in /doc/license.txt$ --%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="edu.cornell.mannlib.vitro.webapp.controller.Controllers" %>
<%@ page import="edu.cornell.mannlib.vitro.webapp.modelaccess.ModelAccess"%>
<%@ page import="edu.cornell.mannlib.vitro.webapp.modelaccess.ModelNames"%>

<%@taglib prefix="vitro" uri="/WEB-INF/tlds/VitroUtils.tld" %>
<%@page import="edu.cornell.mannlib.vitro.webapp.auth.permissions.SimplePermission" %>
<% request.setAttribute("requestedActions", SimplePermission.USE_MISCELLANEOUS_CURATOR_PAGES.ACTION); %>
<vitro:confirmAuthorization />


<%
    String conceptIdStr = request.getParameter("conceptId");
    if (conceptIdStr != null) {
    	
    	String describeQueryStr = 
    		"PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> \n\n" +
    		"DESCRIBE ?bnode \n" +
    	    "WHERE { \n" +
    		"    FILTER(afn:bnode(?bnode) = \"" + conceptIdStr + "\")\n" +
    	    "}";
    	    
    	OntModel ontModel = ModelAccess.on(getServletContext()).getOntModel(ModelNames.FULL_ASSERTIONS);
    	Model conceptDescription = ModelFactory.createDefaultModel();
    	try {
    		ontModel.enterCriticalSection(Lock.READ);
    		Query describeQuery = QueryFactory.create(describeQueryStr, Syntax.syntaxARQ);
    		QueryExecution qe = QueryExecutionFactory.create(describeQuery, ontModel);
    		qe.execDescribe(conceptDescription);
    		
    		conceptDescription.add(ontModel.listStatements((Resource) null, (Property) null, ontModel.createResource(new AnonId(conceptIdStr))));
    		
    	} finally {
    		ontModel.leaveCriticalSection();
    	}
    	
    	
    	
    	List<String> actionStrList = (request.getParameterValues("action") != null)
    	   ? Arrays.asList(request.getParameterValues("action"))
    	   : new ArrayList<String>();
    	if (actionStrList.contains("remove")) {
    		try {
    			ontModel.enterCriticalSection(Lock.WRITE);
    			ontModel.remove(conceptDescription);
    		} finally {
    			ontModel.leaveCriticalSection();
    		}
    	}
    	if (actionStrList.contains("describe")) {
    		conceptDescription.write(response.getOutputStream(), "TTL");
    		return;
    	}
    	
    }

%>


<%@page import="com.hp.hpl.jena.ontology.OntModel"%>
<%@page import="com.hp.hpl.jena.shared.Lock"%>
<%@page import="com.hp.hpl.jena.query.Syntax"%>
<%@page import="com.hp.hpl.jena.query.Query"%>
<%@page import="com.hp.hpl.jena.query.QueryFactory"%>
<%@page import="com.hp.hpl.jena.query.QueryExecutionFactory"%>
<%@page import="com.hp.hpl.jena.rdf.model.ModelFactory"%>
<%@page import="com.hp.hpl.jena.rdf.model.Model"%>
<%@page import="com.hp.hpl.jena.query.QueryExecution"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hp.hpl.jena.rdf.model.Resource"%>
<%@page import="com.hp.hpl.jena.rdf.model.Property"%>
<%@page import="com.hp.hpl.jena.rdf.model.AnonId"%><html>
<head>
    <title>Anonymous Concept Repair Tools</title>
</head>
<body>
    <h1>Concept Repair</h1>
    <form action="" method="post">
        <p>Concept bnode id: <input name="conceptId"/></p>
        <p><input type="checkbox" name="action" value="describe"/> describe concept</p>
        <p><input type="checkbox" name="action" value="remove"/> remove concept</p> 
        <p><input type="submit" value="Perform action"/></p>
    </form>
</body></html>    
