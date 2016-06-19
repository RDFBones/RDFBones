
<div id = "pageContent">
</div>
<div id = "debugContainer">
</div>
	
<#include "cssImport.ftl">

<script>
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
	var pageData = new Object()
	$(document).ready(function(){
	
		pageData.classUri = "${classUri}"
		pageData.individual = "${individual}"
		pageData.initiator = new Object()
		pageData.initiator.object = ClassSelector
		pageData.dataToSend = new Object()
		pageData.initiator.inputs = ["dataToSend", "boneDivisions"]
		new PageDataLoader()
	})
</script>
 
 
<#include "scriptImport.ftl">