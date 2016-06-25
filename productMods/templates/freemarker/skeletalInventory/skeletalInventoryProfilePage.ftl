<#include "cssImport.ftl">
<#include "JS_PageInit.ftl">			
<#include "containers.ftl">			

<script>
	/*
	pageData.pageUri = "http://softwareOntology.com/skeletalInventoryPage"
	*/
	pageData.boneDivisionPageUri = "1234567"
	$(document).ready(function(){
		new PageInit()
	})
</script>


<#include "scriptImport.ftl">

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/skeletalInventoryProfilePage/query.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/skeletalInventoryProfilePage/data.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/skeletalInventoryProfilePage/pageConfig.js"></script>')}