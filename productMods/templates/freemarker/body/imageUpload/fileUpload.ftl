<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Upload a replacement main image for an Individual. -->

${scripts.add('<script type="text/javascript" src="${urls.base}/js/jquery.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/imageUpload/imageUploadUtils.js"></script>')}

${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/uploadImages.css" />')}


 <#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->
<#assign i18n = i18n() >
<#assign typesList = editConfiguration.offerTypesCreateNew />

<form class="editForm" action="/vivo/uploadFiles?action=${editConfiguration.pageData.fileAction}" enctype="multipart/form-data" method="post" role="form"/> 
	<label>Upload ${editConfiguration.pageData.fileType} <span>${editConfiguration.pageData.extensions}</span></label>
    <input id="datafile" type="file" name="datafile" size="30" multiple/>    
    <input type="hidden" value="${editConfiguration.subjectUri}" name="entityUri" role="input" />  
    <input type="hidden" value="${editConfiguration.predicateUri}" name="predicateUri" role="input" />  
    <input type="hidden" name="domainUri" value="${editConfiguration.domainUri!}"/>
    <input type="hidden" name="rangeUri" value="${editConfiguration.rangeUri!}"/>
    <input type="hidden" name="action" value="individualUpload"  role="input" />     
    <input class="submit" type="submit" value="Upload"/>
</form>          

