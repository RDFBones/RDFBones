<#include "cssImport.ftl">
<#include "JS_PageInit.ftl">			
<#include "containers.ftl">	

<script>
		$(document).ready(function(){
				new PageInit()
		})	
</script>
${scripts.add(
		'<script type="text/javascript" src="${urls.base}/js/customConfigData/skeletalInvMenuPageConfig.js"></script>')}

<#include "scriptImport.ftl">


