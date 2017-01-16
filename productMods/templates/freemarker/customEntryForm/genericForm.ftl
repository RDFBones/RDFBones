<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
</script>

<#include "formCSS.ftl">
<#include "cssImport.ftl">
<#include "UIscriptImport.ftl">

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
	var Global = new Object()
	var	buttonID = 0
	var debug = false
	<#if editConfiguration.objectUri?has_content>
    var	objectUri = '${editConfiguration.objectUri}'
    <#else>
    var	objectUri = null
    </#if>
    <#if editConfiguration.rangeUri?has_content>
    var	rangeUri = '${editConfiguration.rangeUri}'
    <#else>
    var	rangeUri = null
    </#if>
	$(document).ready(function(){
		new FormLoader()
	})
	
</script>
