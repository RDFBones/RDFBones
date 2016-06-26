<#include "pageInit.ftl">

<script>
	
	var beforePageInit = function(){
		console.log("Here")
		pageData.initiator = new Object()
		pageData.initiator.object = ClassSelector
		pageData.dataToSend = new Object()
		pageData.initiator.inputs = ["dataToSend", "boneDivisions"]	
	}
</script>


<div>
	KutyaMutya
</div>
${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/CEF/coherentBones/coherentCEFQueries.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/CEF/coherentBones/coherentCEF.js"></script>')}

