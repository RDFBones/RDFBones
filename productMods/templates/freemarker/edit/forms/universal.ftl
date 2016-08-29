<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
</script>

<#include "cssImport.ftl">
<#include "JS_PageInit.ftl">
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
	
	//Definition of the form submission
	var submitConfig = [
		<#list form.submitConfig as conf>
		{	
			type : "${conf.type}",
			<#if conf.key?has_content>
				key : "${conf.key}",
			</#if>
			<#if conf.varName?has_content>
				varName : "${conf.varName}",
			</#if>	
			<#if conf.value?has_content>
				value : "${conf.value}",
			</#if>
		},
		</#list>
	]
	
	//Definition of the form submission
	var redirectConfig = [
		<#list form.redirectConfig as conf>
		{	type : "${conf.type}",
			<#if conf.key?has_content>
				key : "${conf.key}",
			</#if>	
			<#if conf.varName?has_content>
				varName : "${conf.varName}",
			</#if>	
			<#if conf.value?has_content>
				value : "${conf.value}",
			</#if>
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

