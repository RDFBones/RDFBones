<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
</script>

<#include "cssImport.ftl">
<#include "UIscriptImport.ftl">

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/studyDesignExecution/staticFormDescriptor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/studyDesignExecution/staticFormData.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/formGeneration/DataController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/formGeneration/FormElements.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/formGeneration/FormLoader.js"></script>')}
	
<div id = "form">
	<!-- Here will be the form loaded by the FormGenerator class -->
</div>
<div id = "popUpContainer">
</div>
<script>

	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
	var editKey = "${editConfiguration.editKey}"
	var subjectUri = "${editConfiguration.subjectUri}"
	var dataSaveUri = baseUrl + "dataGenerator"
	
	<#if editConfiguration.objectUri?has_content>
    var	objectUri = '${editConfiguration.objectUri}'
    <#else>
    var	objectUri = null
    </#if>
	$(document).ready(function(){
		new MainForm(); 
	})
	
</script>
