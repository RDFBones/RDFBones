<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Upload a replacement main image for an Individual. -->

<#import "lib-vitro-form.ftl" as lvf>

${scripts.add('<script type="text/javascript" src="${urls.base}/js/imageUpload/imageUploadUtils.js"></script>',
        	  '<script type="text/javascript" src="${urls.base}/js/lib/AJAXController.js"></script>',
        	  '<script type="text/javascript" src="${urls.base}/js/lib/DataLibrary.js"></script>',
        	  '<script type="text/javascript" src="${urls.base}/js/lib/html.js"></script>',
        	  '<script type="text/javascript" src="${urls.base}/js/lib/InstanceOffer.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/lib/ImageInstanceOffer.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/lib/InstanceOfferLibrary.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/lib/jquery.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/lib/library.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/lib/PopUpController.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/lib/TableUI.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/UI/UI.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/UI/ImgUI.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/previewJS/js/lightbox.js"></script>')}

${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/lib.css" />')}
${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/table.css" />')}
${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/font.css" />')}
${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/image.css" />')}
${stylesheets.add('<link rel="stylesheet" href="${urls.base}/js/previewJS/css/lightbox.css" />')}


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

	<h3> Please upload an image </h3>
	<form id="form"	action="${submitUrl}" enctype="multipart/form-data" method="post" >
		<input id="datafile" type="file" name="datafile" size="30" />    
		<input type="hidden" name = "editKey" value="${editKey}"/>
		<input type="hidden" name = "dataUpload" value />
		<div>
			<input type="submit" value="submit" class="submit">
			<span class="or"> ${i18n.or} <a class="cancel"  href="${cancelUrl}" title="${i18n.cancel_title}">${i18n.cancel_link}</a></span>
		</div>	
	</form>
<script>
	var imgSrc = "${urls.base}/images/general/"
	var testImgSource = "${urls.base}/"
	var baseUrl = "${urls.base}/"
	var imgBaseUrl = "${urls.base}"
	var subjectUri = '${editConfiguration.subjectUri}'
    var predicateUri = '${editConfiguration.predicateUri}'
    
</script>

<div id = "dataOfferContainer">
</div>
<div id = "popUpContainer">
</div>
<script>
	$(document).ready(function(){
		new ImageInstanceOffer();
	})
</script>

	
	