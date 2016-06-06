
<#include "cssImport.ftl">

	<div id = "pageContent">
	</div>
	<script>
		var imgSrc = "${urls.base}/images/general/"
		var testImgSource = "${urls.base}/"
		var baseUrl = "${urls.base}/"
		var skeletalInventory = '${individual.uri!}'
		pageData["pageConfig"].uri = "http://softwareOntology.com/skeletalInventoryPage"
		new PageElementLoader()
	</script>

<#include "scriptImport.ftl">
