<#include "cssImport.ftl">
<#include "JS_PageInit.ftl">			
<#include "containers.ftl">			

<script>
	pageData.pageUri = "http://softwareOntology.com/skeletalInventoryPage"
	$(document).ready(function(){
		new PageInit()
	})
</script>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/skeletalInventoryPageDataOperation.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/skeletalInventoryPageQueries.js"></script>')}

	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71339">
		Tarsal Bones <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	<br>
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71340">
		Metetarsal Bones <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>	
	<br>
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71199">
		Skeleton of forearm <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	<br>
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71335">
		Carpal bones <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	<br>
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71336">
		Metacarpal bones <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	<br>
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71337">
		Phalanges of hand <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>

<#include "scriptImport.ftl">