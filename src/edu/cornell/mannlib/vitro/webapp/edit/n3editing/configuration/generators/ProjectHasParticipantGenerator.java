/* $This file is distributed under the terms of the license in /doc/license.txt$ */
package edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.XSD;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.VitroVocabulary;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.FirstAndLastNameValidator;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.DateTimeIntervalValidationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.DateTimeWithPrecisionVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.EditConfigurationVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.fields.ChildVClassesOptions;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.fields.ChildVClassesWithParent;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.fields.FieldVTwo;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.VTwo.fields.IndividualsViaVClassOptions;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.validators.AntiXssValidation;
import edu.cornell.mannlib.vitro.webapp.edit.n3editing.controller.EditRequestDispatchController;
import edu.cornell.mannlib.vitro.webapp.utils.FrontEndEditingUtils.EditMode;
import edu.cornell.mannlib.vitro.webapp.utils.generators.EditModeUtils;

public class ProjectHasParticipantGenerator  extends VivoBaseGenerator implements EditConfigurationGenerator{            

    //TODO: can we get rid of the session and get it form the vreq?
    public static Log log = LogFactory.getLog(EditRequestDispatchController.class);

    
    private final String VIVO_NS="http://vivoweb.org/ontology/core#";
    
	private final String RoleToIntervalURI =  VIVO_NS + "dateTimeInterval";	
	private final String IntervalTypeURI =    VIVO_NS + "DateTimeInterval";		
	private final String IntervalToStartURI = VIVO_NS + "start";		
	private final String IntervalToEndURI =   VIVO_NS + "end";	
	private final String DateTimeValueTypeURI=VIVO_NS + "DateTimeValue";	
	private final String DateTimePrecisionURI=VIVO_NS + "dateTimePrecision";	
	private final String DateTimeValueURI =   VIVO_NS + "dateTime";	
	
	
    public EditConfigurationVTwo getEditConfiguration(VitroRequest vreq, HttpSession session) throws Exception {
 
        EditConfigurationVTwo conf = new EditConfigurationVTwo();
                
        initBasics(conf, vreq);
        initPropertyParameters(vreq, session, conf);
        initObjectPropForm(conf, vreq);               
        
        conf.setTemplate("projectHasParticipant.ftl");
        
        conf.setVarNameForSubject("project");
        conf.setVarNameForPredicate("predicate");
        conf.setVarNameForObject("projectRole");
                
        conf.setN3Required( Arrays.asList( n3ForNewProjectRole ) );
        conf.setN3Optional(Arrays.asList( n3ForNewPerson, n3ForExistingPerson, firstNameAssertion, lastNameAssertion , N3ForStart , N3ForEnd) );
        
        conf.addNewResource("projectRole", DEFAULT_NS_FOR_NEW_RESOURCE);
        conf.addNewResource("newPerson",DEFAULT_NS_FOR_NEW_RESOURCE);
        conf.addNewResource("vcardPerson", DEFAULT_NS_FOR_NEW_RESOURCE);
        conf.addNewResource("vcardName", DEFAULT_NS_FOR_NEW_RESOURCE);
        
        conf.addNewResource("startNode", DEFAULT_NS_FOR_NEW_RESOURCE);
        conf.addNewResource("endNode", DEFAULT_NS_FOR_NEW_RESOURCE);
        conf.addNewResource("intervalNode", DEFAULT_NS_FOR_NEW_RESOURCE);
        
        
        //uris in scope: none   
        //literals in scope: none
        
        conf.setUrisOnform( Arrays.asList( "existingPerson"));
        conf.setLiteralsOnForm( Arrays.asList("personLabel", "personLabelDisplay", "roleLabel", 
                                              "roleLabeldisplay", "firstName", "lastName"));

        conf.addSparqlForExistingLiteral("personLabel", personLabelQuery);
        conf.addSparqlForExistingLiteral("roleLabel", roleLabelQuery);
        					
        conf.addSparqlForExistingUris("existingPerson", existingPersonQuery);
                        
        //conf.addSparqlForExistingUris("startNode", startTimeQuery);
        //conf.addSparqlForExistingUris("endNode", endTimeQuery);
        
        conf.addField( new FieldVTwo().
                setName("existingPerson")
                //options will be added in browser by auto complete JS  
                );        
        
        conf.addField( new FieldVTwo().
                setName("personLabel").
                setRangeDatatypeUri(XSD.xstring.toString() ).
                setValidators( list("datatype:" + XSD.xstring.toString())));

        conf.addField( new FieldVTwo().
                setName("roleLabel").
                setRangeDatatypeUri(XSD.xstring.toString() ).
                setValidators( list("datatype:" + XSD.xstring.toString(),"nonempty")));
            
        conf.addField( new FieldVTwo().
                setName("personLabelDisplay").
                setRangeDatatypeUri(XSD.xstring.toString() ));

        conf.addField( new FieldVTwo().
                setName("roleLabelDisplay").
                setRangeDatatypeUri(XSD.xstring.toString() ));
                
        conf.addField( new FieldVTwo().
                setName("firstName").
                setRangeDatatypeUri(XSD.xstring.toString() ).
                setValidators( list("datatype:" + XSD.xstring.toString()) )
                );

        conf.addField( new FieldVTwo().
                setName("lastName").
                setRangeDatatypeUri(XSD.xstring.toString() ).
                setValidators( list("datatype:" + XSD.xstring.toString()) )
                );

        
        FieldVTwo field1 = new FieldVTwo();
        field1.setName("startField");    	        	
    	field1.setEditElement(
                new DateTimeWithPrecisionVTwo(field1, 
                		VitroVocabulary.Precision.DAY.uri(),
                        VitroVocabulary.Precision.NONE.uri()));   
    	conf.addField(field1);
    	
    	FieldVTwo field2 = new FieldVTwo();
        field2.setName("endField");    	        	
    	field2.setEditElement(
                new DateTimeWithPrecisionVTwo(field2, 
                		VitroVocabulary.Precision.DAY.uri(),
                        VitroVocabulary.Precision.NONE.uri()));   
    	conf.addField(field2);
    	
    	
    	
        
        
        //Add validator
        conf.addValidator(new AntiXssValidation());
        conf.addValidator(new FirstAndLastNameValidator("existingPerson"));
        
        //Adding additional data, specifically edit mode
        addFormSpecificData(conf, vreq);
        prepare(vreq, conf);
        
        log.info("ProjectHasParticipantGenerator : " + conf.toString());
        
        return conf;
    }
    
    /* N3 assertions for working with educational training */
    final static String startTimeQuery = "SELECT ?existingDateStart WHERE { "
    		+	"?role <http://vivoweb.org/ontology/core#dateTimeInterval> ?intervalNode . "
    		+	"?intervalNode <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vivoweb.org/ontology/core#DateTimeInterval> . "
    		+	"?intervalNode <http://vivoweb.org/ontology/core#start> ?startNode . "
    		+	"?startNode <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vivoweb.org/ontology/core#DateTimeValue> ."
    		+	"?startNode <http://vivoweb.org/ontology/core#dateTime> ?existingDateStart . } "	;
    
    final static String endTimeQuery = "SELECT ?existingEndDate WHERE { "
    		+	"?role <http://vivoweb.org/ontology/core#dateTimeInterval> ?intervalNode . "
    		+	"?intervalNode <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vivoweb.org/ontology/core#DateTimeInterval> . "
    		+	"?intervalNode <http://vivoweb.org/ontology/core#end> ?endNode . "
    		+	"?endNode <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vivoweb.org/ontology/core#DateTimeValue> ."
    		+	"?endNode <http://vivoweb.org/ontology/core#dateTime> ?existingEndDate . } "	;
    
    final static String n3ForNewProjectRole =       
        "@prefix core: <"+ vivoCore +"> .\n" +
		"@prefix rdfs: <"+ rdfs +">  . \n"+
        "?project <http://purl.obolibrary.org/obo/BFO_0000055>  ?projectRole .\n" +
        "?projectRole  a <http://vivoweb.org/ontology/core#ResearcherRole> .\n" +
        "?projectRole <http://purl.obolibrary.org/obo/BFO_0000054> ?project . \n" +
        "?projectRole <"+ label +"> ?roleLabel . \n" ;

    final static String n3ForInterval = " ?projectRole  <http://vivoweb.org/ontology/core#dateTimeInterval> ?intervalNode . \n "
    		+ "?intervalNode  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vivoweb.org/ontology/core#DateTimeInterval> . \n"
    		+ "?intervalNode <http://vivoweb.org/ontology/core#start> ?startNode .  \n"
    		+ "?startNode  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vivoweb.org/ontology/core#DateTimeValue> . \n"
    		+ "?startNode  <http://vivoweb.org/ontology/core#dateTime> ?startField-value .  \n "
    		+ "?startNode  <http://vivoweb.org/ontology/core#dateTimePrecision> ?startField-precision . "
    		+ "?intervalNode <http://vivoweb.org/ontology/core#end> ?endNode . \n"
    		+ "?endNode  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vivoweb.org/ontology/core#DateTimeValue> . \n"
    		+ "?endNode  <http://vivoweb.org/ontology/core#dateTime> ?endField-value . \n"
    		+ "?endNode  <http://vivoweb.org/ontology/core#dateTimePrecision> ?endField-precision . ";
    		
    		
    
    final static String n3ForNewPerson  =      
        "?projectRole <http://purl.obolibrary.org/obo/RO_0000052> ?newPerson . \n" +
        "?newPerson <http://purl.obolibrary.org/obo/RO_0000053> ?projectRole . \n" +
        "?newPerson a <http://xmlns.com/foaf/0.1/Person> . \n" +
        "?newPerson <"+ label +"> ?personLabel . ";

    final static String n3ForExistingPerson  =      
        "?projectRole <http://purl.obolibrary.org/obo/RO_0000052> ?existingPerson . \n" +
        "?existingPerson <http://purl.obolibrary.org/obo/RO_0000053> ?projectRole . \n" +
        " ";
    
    final static String firstNameAssertion  =      
        "@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .  \n" +
        "?newPerson <http://purl.obolibrary.org/obo/ARG_2000028>  ?vcardPerson . \n" +
        "?vcardPerson <http://purl.obolibrary.org/obo/ARG_2000029>  ?newPerson . \n" +
        "?vcardPerson a <http://www.w3.org/2006/vcard/ns#Individual> . \n" + 
        "?vcardPerson vcard:hasName  ?vcardName . \n" +
        "?vcardName a <http://www.w3.org/2006/vcard/ns#Name> . \n" +   
        "?vcardName vcard:givenName ?firstName .";
    
    final static String lastNameAssertion  =      
        "@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .  \n" +
        "?newPerson <http://purl.obolibrary.org/obo/ARG_2000028>  ?vcardPerson . \n" +
        "?vcardPerson <http://purl.obolibrary.org/obo/ARG_2000029>  ?newPerson . \n" +
        "?vcardPerson a <http://www.w3.org/2006/vcard/ns#Individual> . \n" + 
        "?vcardPerson vcard:hasName  ?vcardName . \n" +
        "?vcardName a <http://www.w3.org/2006/vcard/ns#Name> . \n" +   
        "?vcardName vcard:familyName ?lastName .";

    /* Queries for editing an existing educational training entry */

    final static String roleLabelQuery =      
        "SELECT ?roleLabel WHERE {\n"+
        "?projectRole <"+ label +"> ?roleLabel }\n";

    final static String existingPersonQuery  =      
        "PREFIX rdfs: <"+ rdfs +">   \n"+
        "SELECT ?existingPerson WHERE {\n"+
        "?projectRole <http://purl.obolibrary.org/obo/RO_0000052> ?existingPerson . \n" +
        "?existingPerson <http://purl.obolibrary.org/obo/RO_0000053> ?projectRole . \n" +
        "?existingPerson a <http://xmlns.com/foaf/0.1/Person> . \n " +
        " }";

    final static String personLabelQuery  =      
        "PREFIX rdfs: <"+ rdfs +">   \n"+
        "SELECT ?existingPersonLabel WHERE {\n"+
        "?projectRole <http://purl.obolibrary.org/obo/RO_0000052> ?existingPerson . \n" +
        "?existingPerson <http://purl.obolibrary.org/obo/RO_0000053> ?projectRole .\n"+
        "?existingPerson <"+ label +"> ?existingPersonLabel .\n"+
        "?existingPerson a <http://xmlns.com/foaf/0.1/Person> . \n " +
        " }";

    private String N3ForStart = "?projectRole  <" + RoleToIntervalURI + "> ?intervalNode ." +     
			    "?intervalNode  <" + RDF.type.getURI() + "> <" + IntervalTypeURI + "> ." + 
			    "?intervalNode <" + IntervalToStartURI + "> ?startNode ." +     
			    "?startNode  <" + RDF.type.getURI() + "> <" + DateTimeValueTypeURI + "> ." + 
			    "?startNode  <" + DateTimeValueURI + "> ?startField-value ." + 
			    "?startNode  <" + DateTimePrecisionURI + "> ?startField-precision .";
    
    private String N3ForEnd = "?projectRole      <" + RoleToIntervalURI + "> ?intervalNode .  " +   
			    "?intervalNode  <" + RDF.type.getURI() + "> <" + IntervalTypeURI + "> ." + 
			    "?intervalNode <" + IntervalToEndURI + "> ?endNode ." + 
			    "?endNode  <" + RDF.type.getURI() + "> <" + DateTimeValueTypeURI + "> ." + 
			    "?endNode  <" + DateTimeValueURI + "> ?endField-value ." + 
			    "?endNode  <" + DateTimePrecisionURI+ "> ?endField-precision .";
	
    
  //Adding form specific data such as edit mode
	public void addFormSpecificData(EditConfigurationVTwo editConfiguration, VitroRequest vreq) {
		HashMap<String, Object> formSpecificData = new HashMap<String, Object>();
		formSpecificData.put("editMode", getEditMode(vreq).name().toLowerCase());
		editConfiguration.setFormSpecificData(formSpecificData);
	}
	
	public EditMode getEditMode(VitroRequest vreq) {
		List<String> predicates = new ArrayList<String>();
		predicates.add("http://purl.obolibrary.org/obo/RO_0000053");
		return EditModeUtils.getEditMode(vreq, predicates);
	}
}
