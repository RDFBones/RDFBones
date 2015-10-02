<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Upload a replacement main image for an Individual. -->

${scripts.add('<script type="text/javascript" src="${urls.base}/js/jquery.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/imageUpload/imageUploadUtils.js"></script>')}

${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/uploadImages.css" />')}


<#assign i18n = i18n() >
<#assign typesList = editConfiguration.offerTypesCreateNew />

	<h3> Please upload a file </h3>
	<form 	action="${submitUrl}" enctype="multipart/form-data" method="post">
	
		
		<input id="datafile" type="file" name="datafile" size="30" />    
		
		<input type="hidden" name = "editKey" value="${editKey}"/>
		<input type="submit" value="submit">
	</form>