
<#include "cssImport.ftl">
	
	<div id = "pageContent">
	</div>
	<script>
	
		var imgSrc = "${urls.base}/images/general/"
		var baseUrl = "${urls.base}/"
		$(document).ready(function(){
			pageData.pageUri = "http://softwareOntology.com/skeletalInventoryPage"
			new PageDataLoader()
		})
	</script>


	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71339">
		Tarsal Bones <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71340">
		Metetarsal Bones <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>	
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71340">
		Lower Limb <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71199">
		Skeleton of forearm <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71335">
		Carpal bones <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71336">
		Metacarpal bones <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
	<a href = "/vivo/entryFormLoad?individual=12345567&classUri=http://purl.obolibrary.org/obo/FMA_71337">
		Phalanges of hand <img src="/vivo/images/general/add.png" class = "addFieldImg enabledImg">
	</a>
<#include "scriptImport.ftl">