<#include "cssImport.ftl">
<#include "JS_PageInit.ftl">			
<#include "containers.ftl">	

<script>

	$(document).ready(function(){
		pageData.classUri = "${classUri}"
		pageData.individual = "${individual}"
		pageData.initiator = new Object()
		pageData.initiator.object = ClassSelector
		pageData.dataToSend = new Object()
		pageData.initiator.inputs = ["dataToSend", "boneDivisions"]
		new PageInit()
	})
</script>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/CEF/coherentBones/coherentCEFQueries.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/CEF/coherentBones/coherentCEF.js"></script>')}

<#include "scriptImport.ftl">