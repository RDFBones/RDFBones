<#include "formCSS.ftl">
<#include "cssImport.ftl">
<#include "UIscriptImport.ftl">

<#import "lib-import.ftl" as imp> 

<@imp.js url="drawingConclusion/TableRow" />
<@imp.js url="drawingConclusion/inputSelectorTable" />
<@imp.js url="drawingConclusion/input" />
<@imp.js url="drawingConclusion/ajaxController" />
<@imp.js url="drawingConclusion/main" />

<div class = "mainFormTitle margin10"  id = "drawingConclusionLabel">
	Drawing a conclusion
</div>

<div id = "validContainer">
	<div class="inlineTitle">Input</div>
	<div id="inputButtonCont" class = "inline"></div>
	<div class = "title">
		Conclusion
	</div>
	<div id = "text">
		<textarea class="margin10H" id = "conclusionValue" rows="7" cols="80"></textArea>
	</div>
</div>

<div class = "margin10" id = "errorMessage">
</div>

<div class = "margin10V" id = "buttonContainer">
	<div class = "generalButton hoverClass" id = "submit"> Submit </div>
	<div class = "generalButton hoverClass" id = "cancel"> Cancel </div>
	<div class = "generalButton hoverClass" id = "done" >	Done </div>
	<div class = "generalButton hoverClass" id = "delete" > Delete </div>
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
	Global.editMode = false
	var debug = false
	<#if editConfiguration.objectUri?has_content>
		Global.editMode = true
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
		new Main()	
	})
</script>