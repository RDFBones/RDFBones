<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->
<#--Assign variables from editConfig-->
<#assign rangeOptions = editConfiguration.pageData.objectVar />
<#-- 
<#assign rangeOptionsExist = false /> 
<#if (rangeOptions?keys?size > 0)>
	<#assign rangeOptionsExist = true/>
</#if>
 -->
 
<#assign rangeOptionsExist = true /> 
<#assign rangeVClassURI = editConfiguration.objectPredicateProperty.rangeVClassURI!"" />
<#assign objectTypes = editConfiguration.pageData.objectTypes />
<#assign objectTypesSize = objectTypes?length />
<#assign objectTypesExist = false />
<#assign multipleTypes = false />
<#if (objectTypesSize > 1)>
	<#assign objectTypesExist = true />
</#if>
<#if objectTypes?contains(",")>
	<#assign multipleTypes = true/>
</#if>
<#assign sparqlForAcFilter = editConfiguration.pageData.sparqlForAcFilter />
<#assign editMode = editConfiguration.pageData.editMode />
<#assign propertyNameForDisplay = "" />
<#if editConfiguration.objectPropertyNameForDisplay?has_content>
	<#assign propertyNameForDisplay = editConfiguration.objectPropertyNameForDisplay />
</#if>
<#if editMode = "edit" >
	<#assign titleVerb = "${i18n().edit_capitalized}" />
	<#assign objectLabel = editConfiguration.pageData.objectLabel />
	<#assign selectedObjectUri = editConfiguration.objectUri />
	<#assign submitButtonText = "${i18n().save_button}" />
<#else>
	<#assign titleVerb = "${i18n().add_capitalized}" >
	<#assign objectLabel = "" />
	<#assign selectedObjectUri = ""/>
	<#assign submitButtonText = "${i18n().create_entry}" />
</#if>
<#assign formTitle = editConfiguration.formTitle />
<#if editConfiguration.formTitle?contains("collaborator") >
    <#assign formTitle = "${i18n().select_existing_collaborator(editConfiguration.subjectName)}" />
<#elseif rangeVClassURI?contains("IAO_0000030")>
    <#assign formTitle = "${i18n().select_an_existing_document}" + " ${i18n().for} " + editConfiguration.subjectName/>
</#if>
<#--In order to fill out the subject-->
<#assign acFilterForIndividuals =  "['" + editConfiguration.subjectUri + "']" />

<h2>Choose an existing document</h2>
   
    <div id="filterContainer" class="containerClass" style="padding-bottom:5px;">
		<div class="labelDiv"> 
			<input id="textFilter" style="border: 1px solid #e0dfdf; border-radius:5px; font-size:13px; color:#555; " onfocus='inputFocus(this)' type="text" value="Filter For label">
		</div>
		<div class="classDiv">
	        <#assign docTypeOpts = editConfiguration.pageData.rangeClasses />
	        <select id="typeSelector" name="documentType" acGroupName="document">
	             <option value="${editConfiguration.rangeUri}" selected="selected">Any information content entity</option>                
	            <#list docTypeOpts?keys as key>             
	            	<option value="${key}">${docTypeOpts[key]}</option>
	            </#list>
	        </select>
		</div>
	</div>
	<div id="resultContainer" class="resultContainer">
	</div>
	<div id="selectedDiv">
	</div>


	<form class="customForm" action = "${submitUrl}">
        
        <input type="hidden" name="editKey" id="editKey" value="${editKey}" role="input" />
        <input class="acUriReceiver" type="hidden" id="objectVar" name="objectVar" value="${selectedObjectUri}" />
        <p>
            <input type="submit" id="submit" value="${submitButtonText}" role="button" disabled class="disabledSubmit"/>
            <span class="or"> or </span>
            <a title="${i18n().cancel_title}" class="cancel" href="${cancelUrl}">${i18n().cancel_link}</a>
        </p>
    </form>
    
<p>&nbsp;</p>
<#if editConfiguration.propertyOfferCreateNewOption = true>
<#include "defaultOfferCreateNewOptionForm.ftl">

</#if>

<#if editConfiguration.propertySelectFromExisting = false && editConfiguration.propertyOfferCreateNewOption = false>
<p>${i18n().editing_prohibited} </p>
</#if>


<#if editConfiguration.includeDeletionForm = true>
<#include "defaultDeletePropertyForm.ftl">
</#if>

<#assign sparqlQueryUrl = "${urls.base}/ajax/sparqlQuery" >
<#--Passing in object types only if there are any types returned, otherwise
the parameter should not be passed at all to the search.
Also multiple types parameter set to true only if more than one type returned-->
    <script type="text/javascript">	
    var customFormData  = {
    	newUrl: '${urls.base}/instanceToOffer?tokenize=true',
    	subjectUri : '${editConfiguration.subjectUri}',
        predicateUri : '${editConfiguration.predicateUri}',
        rangeUri: '${editConfiguration.rangeUri}',
        gifPath : '${urls.base}/images/gif/loading.gif',
        acUrl: '${urls.base}/autocomplete?tokenize=true',
        <#if objectTypesExist = true>
            acTypes: {object: '${objectTypes}'},
        </#if>
        <#if multipleTypes = true>
            acMultipleTypes: 'true',
        </#if>
        editMode: '${editMode}',
        typeName:'${propertyNameForDisplay}',
        acSelectOnly: 'true',
        sparqlForAcFilter: '${sparqlForAcFilter}',
        sparqlQueryUrl: '${sparqlQueryUrl}',
        acFilterForIndividuals: ${acFilterForIndividuals},
        defaultTypeName: '${propertyNameForDisplay}', // used in repair mode to generate button text
        baseHref: '${urls.base}/individual?uri='
    };
    var i18nStrings = {
        selectAnExisting: '${i18n().select_an_existing}',
        orCreateNewOne: '${i18n().or_create_new_one}',
        selectedString: '${i18n().selected}'
    };
    </script>
<#--
	 edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators.AutocompleteObjectPropertyFormGenerator
	 edu.cornell.mannlib.vitro.webapp.edit.n3editing.configuration.generators.AddAttendeeRoleToPersonGenerator
-->

${stylesheets.add('<link rel="stylesheet" href="${urls.base}/js/jquery-ui/css/smoothness/jquery-ui-1.8.9.custom.css" />')}
 ${stylesheets.add('<link rel="stylesheet" href="${urls.base}/templates/freemarker/edit/forms/css/customForm.css" />')}
 ${stylesheets.add('<link rel="stylesheet" href="${urls.base}/templates/freemarker/edit/forms/css/customFormWithAutocomplete.css" />')}
${stylesheets.add('<link rel="stylesheet" href="${urls.base}/templates/freemarker/edit/forms/css/offerInstance.css" />')}

 ${scripts.add('<script type="text/javascript" src="${urls.base}/js/jquery-ui/js/jquery-ui-1.8.9.custom.min.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/customFormUtils.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/browserUtils.js"></script>',             
              '<script type="text/javascript" src="${urls.base}/templates/freemarker/edit/forms/js/customFormWithInstanceOffer.js"></script>')}
