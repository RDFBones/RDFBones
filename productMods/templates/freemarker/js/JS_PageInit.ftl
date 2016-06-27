<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
	var pageData = new Object()

	<#if params?has_content>
		<#list params?keys as key>
		   pageData["${key}"]  = "${params[key]}"
		</#list>
	</#if>
	
	$(document).ready(function(){
		if(typeof beforePageInit != 'undefined'){
			beforePageInit()
		}
		new PageInit()
	})
</script>