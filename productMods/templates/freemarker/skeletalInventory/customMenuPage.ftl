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
				pageData["pageConfig"] = new Object()
				pageData["pageConfig"]["pageElements"] = skInventoryMenuElements
				pageLoader.loadPage()
		})
</script>

<#include "scriptImport.ftl">
