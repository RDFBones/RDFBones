<#include "cssImport.ftl">
<#include "JS_PageInit.ftl">			
<#include "containers.ftl">	

<script>
		$(document).ready(function(){
				new PageInit()
		})	
</script>
<#include "scriptImport.ftl">

${scripts.add(
		'<script type="text/javascript" src="${urls.base}/js/customConfigData/skeletalInventoryMenuPage/pageConfig.js"></script>')}


