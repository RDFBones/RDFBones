<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Upload a replacement main image for an Individual. -->

<#import "lib-vitro-form.ftl" as lvf>

${scripts.add('<script type="text/javascript" src="${urls.base}/js/jquery.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/imageUpload/imageUploadUtils.js"></script>')}

${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/uploadImages.css" />')}

<#if editSubmission?has_content && editSubmission.submissionExists = true && editSubmission.validationErrors?has_content>
    <#assign submissionErrors = editSubmission.validationErrors/>
</#if>


<h2>${editConfiguration.formTitle}</h2>

<#--Display error messages if any-->
<#if submissionErrors?has_content>
    <section id="error-alert" role="alert">
        <img src="${urls.images}/iconAlert.png" width="24" height="24" alt="${i18n().error_alert_icon}" />
        <p>
        
        <#list submissionErrors?keys as errorFieldName>
            ${submissionErrors[errorFieldName]}
        </#list>
                        
        </p>
    </section>
</#if>

<#assign fileDescription = lvf.getFormFieldValue(editSubmission, editConfiguration, "fileDescription") />

<#assign i18n = i18n() >
<#assign typesList = editConfiguration.offerTypesCreateNew />

	<h3> Please upload a file </h3>
	<form id="form"	action="${submitUrl}" enctype="multipart/form-data" method="post" >
	
		<input id="datafile" type="file" name="datafile" size="30" />    
		
		<h3> Add description </h3>
		<textarea id="form" rows="4" cols="50" name="fileDescription" />${fileDescription}</textarea>
		
		<input type="hidden" name = "editKey" value="${editKey}"/>
		<input type="hidden" name = "dataUpload" value />
		<div>
			<input type="submit" value="submit" class="submit">
			<span class="or"> ${i18n.or} <a class="cancel"  href="${cancelUrl}" title="${i18n.cancel_title}">${i18n.cancel_link}</a></span>
		</div>	
	</form>