<#include "formCSS.ftl">
<#include "cssImport.ftl">
<#include "UIscriptImport.ftl">

<#import "lib-import.ftl" as imp> 

<@imp.js url="dataTransformation/inputSelectorTable" />
<@imp.js url="dataTransformation/MeasurementDatum" />
<@imp.js url="dataTransformation/input" />
<@imp.js url="dataTransformation/ajaxController" />
<@imp.js url="dataTransformation/item" />
<@imp.js url="dataTransformation/main" />
<@imp.css url="dataTransformation/dataTransformation" />

<div class = "mainFormTitle margin10">
	Data transformations
</div>
<div id="form"  class="margin10H">
</div>
<div id = "popUpContainer">
</div>

<script>
 
	var imgSrc = "${urls.base}/images/general/"
	var baseUrl = "${urls.base}/"
	var editKey = "${editConfiguration.editKey}"
	var subjectUri = "${editConfiguration.subjectUri}"
	var dataSaveUri = baseUrl + "dataGenerator"
	var Global = new Object()
	Global.buttonID = 0
	var debug = false
	<#if editConfiguration.objectUri?has_content>
    	var	objectUri = '${editConfiguration.objectUri}'
    <#else>
   		 var objectUri = null
    </#if>
    <#if editConfiguration.rangeUri?has_content>
    	var	rangeUri = '${editConfiguration.rangeUri}'
    <#else>
    	var	rangeUri = null
    </#if>
    
	$(document).ready(function(){
		
		if(objectUri == null){
		}	
		new Main()	
	})
	
</script>