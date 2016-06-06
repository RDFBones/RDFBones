<#include "cssImport.ftl">



<div id="pageContent">
</div>

<div id = "errorMsg">

</div>

<script>
		var imgSrc = "${urls.base}/images/general/"
		var baseUrl = "${urls.base}/"
		var pageData = new Object()
		$(document).ready(function(){
			//new PageElementLoader("${dataGetterUri}")
			new PageElementLoader("http://softwareOntology.com/skeletalInventoryPage")
		})
</script>

<#include "scriptImport.ftl">
