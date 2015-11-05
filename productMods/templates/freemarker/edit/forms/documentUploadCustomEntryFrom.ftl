<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Upload a replacement main image for an Individual. -->

<#import "lib-vitro-form.ftl" as lvf>

${scripts.add('<script type="text/javascript" src="${urls.base}/js/jquery.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/imageUpload/imageUploadUtils.js"></script>')}

${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/uploadImages.css" />')}

<#assign requiredHint = "<span class='requiredHint'> *</span>" />

<#if editSubmission?has_content && editSubmission.submissionExists = true && editSubmission.validationErrors?has_content>
    <#assign submissionErrors = editSubmission.validationErrors/>
</#if>




	<h2>Choose an existing document</h2>
   
    <div id="filterContainer" class="containerClass" style="padding-bottom:5px;">
		<div class="labelDiv"> 
			<input id="textFilter" style="border: 1px solid #e0dfdf; border-radius:5px; font-size:13px; color:#555; " onfocus='inputFocus(this)' type="text" value="Filter For label">
		</div>
		<div class="classDiv">
	        <#assign docTypeOpts = editConfiguration.pageData.documentClasses />
	        <select id="typeSelector" name="documentType" acGroupName="document">
	             <option value="http://purl.org/ontology/bibo/Document" selected="selected">Any Document</option>                
	            <#list docTypeOpts?keys as key>             
	            	<option value="${key}">${docTypeOpts[key]}</option>
	            </#list>
	        </select>
		</div>
	</div>
	<div class="auxContainer">
		<div id="resultContainer" class="resultContainer">
		</div>
	</div>
	<div id="selectedDiv">
	</div>

	<form class="customForm" action = "${submitUrl}">
        
        <input type="hidden" name="editKey" id="editKey" value="${editKey}" role="input" />
        <input class="acUriReceiver" type="hidden" id="document" name="document" value />
        <p>
            <input type="submit" id="submit" value="Add entry" role="button" disabled class="disabledSubmit"/>
            <span class="or"> or </span>
            <a title="${i18n().cancel_title}" class="cancel" href="${cancelUrl}">${i18n().cancel_link}</a>
        </p>
    </form>


<#assign fileDescription = lvf.getFormFieldValue(editSubmission, editConfiguration, "fileDescription") />
<#assign documentLabel = lvf.getFormFieldValue(editSubmission, editConfiguration, "documentLabel") />

<#assign i18n = i18n() >
<#assign typesList = editConfiguration.offerTypesCreateNew />

<#--Display error messages if any-->
<#if submissionErrors?has_content>
    <section id="error-alert" role="alert">
        <img src="${urls.images}/iconAlert.png" width="24" height="24" />
        <p>
        
        <#list submissionErrors?keys as errorFieldName>
            ${submissionErrors[errorFieldName]}
        </#list>
                        
        </p>
    </section>
</#if>

<h2> Add a new Document </h2>

	<form id="form"	action="${submitUrl}" enctype="multipart/form-data" method="post" >
		<h3>Select type</h3>
		<select id="typeSelector" name="type" acGroupName="document">
            <option value="http://purl.org/ontology/bibo/Document" selected="selected">Document</option>                
            <#list docTypeOpts?keys as key>             
            	<option value="${key}">${docTypeOpts[key]}</option>
            </#list>
        </select>
		<h3> Add label </h3>
		<input id="labelInput" type="text" name="documentLabel" required/>
				<span style="color:red; font-size: 11px; display:none" id="infoMsg">The label is automatically added. If you want a custom label, just modify the field</span>
		
		<br>
		<h3> Upload a file </h3>
		<input id="datafile" type="file" name="datafile" size="30" />    
		<div id="fileDescriptionDiv" style="display:none;">
			<h3> Add description </h3>
			<textarea id="fileDescription" id="form" rows="4" cols="50" name="fileDescription" />${fileDescription}</textarea>
		</div>
		<input type="hidden" name = "editKey" value="${editKey}"/>
		<input type="hidden" name = "dataUpload" value />
		<div>
			<input type="submit" value="submit" class="submit">
			<span class="or"> ${i18n.or} <a class="cancel"  href="${cancelUrl}" title="${i18n.cancel_title}">${i18n.cancel_link}</a></span>
		</div>	
	</form>
	
   <script type="text/javascript">	
    var customFormData  = {
    	newUrl: '${urls.base}/instanceToOffer?tokenize=true',
    	subjectUri : '${editConfiguration.subjectUri}',
        predicateUri : '${editConfiguration.predicateUri}',
        rangeUri: 'http://purl.org/ontology/bibo/Document',
        gifPath : '${urls.base}/images/gif/loading.gif',
     
        baseHref: '${urls.base}/individual?uri='
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
              '<script type="text/javascript" src="${urls.base}/templates/freemarker/edit/forms/js/customFormWithInstanceOffer.js"></script>',
              '<script type="text/javascript" src="${urls.base}/templates/freemarker/edit/forms/js/fileUploadHelper.js"></script>')}
	
	
	