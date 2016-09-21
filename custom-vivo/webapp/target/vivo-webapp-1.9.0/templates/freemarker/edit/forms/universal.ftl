<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
</script>

<#include "cssImport.ftl">
<#include "JS_PageInit.ftl">
<#include "scriptImport.ftl">
<#import "dynamicFormLib.ftl" as lib>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/formGeneration/Selector.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/formGeneration/FormGenerator.js"></script>')}
	

<div id = "form">
	<!-- Here will be the form loaded by the FormGenerator class -->
</div>

<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"


	
	<#assign fields = ["title", "type", "varName", "dataType"]>
	<#assign baseField = ["uri", "label"]>
	
	var formElements = [
	<#list form.formElements as formElement>
		{
			<@lib.createJSONObjectSub formElement fields />
			<@lib.createJSONListSub "dataSet" formElement.dataSet.data baseField />
		},
	</#list>
	]
	
	<#assign submitFields = ["type", "key", "varName", "value"]>
	<@lib.createJSONList "submitConfig" form.submitConfig submitFields />
	<@lib.createJSONList "redirectConfig" form.redirectConfig submitFields />

	<#if form.dataOperation?has_content>
		var dataOperation = "${form.dataOperation}"
	</#if>
	var globalVarsToSend = [
		<#if varsToSend?has_content>
			<#list varsToSend as varToSend>
				{ key : ${varToSend.key}, value : ${varToSend.value} } ,
			</#list>
		</#if>
	]
	
	<#if !form.error?has_content>
		$(document).ready(function(){
			new FormGenerator(); 
		})	
	</#if>	
	
</script>
<#include "formError.ftl">
<#include "formDebug.ftl">

