<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
</script>
<#include "cssImport.ftl">
<#include "scriptImport.ftl">


${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/formGeneration/Selector.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/formGeneration/FormGenerator.js"></script>')}
	

<div id = "form">
	<!-- Here will be the form loaded by the FormGenerator class -->
</div>

<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"

	var formElements = [
	<#list form.formElements as formElement>
		{
			type : "${formElement.type}",
			<#if formElement.title?has_content>
				title : "${formElement.title}",
			</#if>
			<#if formElement.varName?has_content>
				varName : "${formElement.varName}",
			</#if>
			
			dataSet : [
			
			<#if formElement.dataSet.data?has_content>
				<#list formElement.dataSet.data as data>
				{	uri : "${data.uri}",
					label : "${data.label}" },
				</#list>
			</#if>
			]
		},
	</#list>
	]
	
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

