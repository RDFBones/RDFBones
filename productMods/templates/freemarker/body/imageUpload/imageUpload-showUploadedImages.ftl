<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Crop the replacement main image for an Individual, to produce a thumbnail. -->



${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/uploadImages.css" />',
                  '<link rel="stylesheet" href="${urls.base}/js/jquery_plugins/jcrop/jquery.Jcrop.css" />')}


<style>

	.submitBut{
	
		display: inline-block;
	    padding: 5px 18px 7px;
	    color: #fff;
	    text-decoration: none;
	    border-radius: 4px;
	    -moz-border-radius: 4px;
	    -webkit-border-radius: 4px;
	    position: relative;
	    border: 0;
	    margin: 0;
	    background-color: red;
	    color: #fff;
	    font-size: 14px;
	    font-weight: normal;
	    line-height: 1;
	    margin-right: .6em;
	    margin-top: .5em;
	    margin-bottom: .5em;
	}

	.selectedImage{
		background : black;
	}

	.picsToEditContatiner{
	
		position : relative;
		width : 172px;
		height : 172px;
		margin-left : 15px;
		margin-bottom : 15px;
		float: left;
	}

	.classForWhiteGap{
		
		width : 166px;
		height : 166px;
		position : relative;
		background : white;
		top : 3px;
		left : 3px;
	}
	.picsToEdit{
		position : relative;
		top : 3px;
		left : 3px;
		width : 160px;
		height : 160px;
		overflow: hidden;
    	background-size: cover;
    	background-position: center center;
	}
	
</style>
<#--Reduce original image to fit in the page layout  
	If the width of the image is bigger or equal to 500 pixels, 
	the script below will reduce the width to 500 pixels and 
	the height will be in proportion to the new height-->

<#--<#macro newImageSize>
<#if (imageWidth >= 500)>
		width="500" height="${(500*imageHeight)/imageWidth}" 
</#if>	   
</#macro>-->
        
<#assign i18n = i18n() >

<script type="text/javascript" src="/vivo/dwr/interface/PropertyDWR.js"></script>
<script type="text/javascript" src="/vivo/dwr/interface/EntityDWR.js"></script>
<script type="text/javascript" src="/vivo/dwr/interface/VClassDWR.js"></script>
<script type="text/javascript" src="/vivo/dwr/engine.js"></script>
<script type="text/javascript" src="/vivo/dwr/util.js"></script>
<script type="text/javascript" src="/vivo/js/vitro.js"></script>
<#--<script type="text/javascript" src="/vivo/js/ents_edit.js"></script> -->
<script type="text/javascript" src="/vivo/js/detect.js"></script>
<script type="text/javascript" src="/vivo/js/toggle.js"></script>


<script>
 var selectedImages = [];
 var selectedDivs= [];
 
 function clickFunction(div, param, src){
 	
 		console.log(param);
 		var pos = selectedImages.indexOf(param);
	 	
	 	
	 	
	 	if(pos > -1 ){
	 	
	 		$(div).parent().parent().removeClass("selectedImage");	
	 		selectedImages.splice(pos,1);
	 		selectedDivs.splice($(div).parent().parent(),1);
	 	
	 	} else {
	 	
			$(div).parent().parent().addClass("selectedImage");	
	 		selectedImages.push(param);
	 		selectedDivs.push($(div).parent().parent());
	 	}
 }
 

 function updateN(){
 
 	console.log("deleted");
 } 
 
 
 function deleteSelected(){
 

		console.log(selectedImages.length);
		var k=0;
 		for( var i = 0; i < selectedImages.length;  i++){
 		
 			console.log('${individualUri}' + " " +  '${predicateUri}' + " "  + selectedImages[i]);
 			PropertyDWR.deleteProp(updateN, '${individualUri}', '${predicateUri}', selectedImages[i]);
 			selectedDivs[i].remove();
 			k++;
 		}
		
		 		
 		if( k > 0 ){
 			alert("Successfully deleted " + k + " items ");
 		} else {
 			alert("Please select at least one image");
 		}
 }
 
 
</script>
<div id="entityUriForDwr" style="visibility:hidden;">${individualUri}</div>
<section id="photoCroppingContainer" role="region">
    
   <div style = "padding: 10px; margin-left : 10px;">
   		Select the images you want to delete
   </div>
    
   <!-- This is the image we're attaching Jcrop to -->
   <div id="photoEditorContainer" role="region">
        
        <#list images as img>
	    	<div class="picsToEditContatiner" >
	    		<div class="classForWhiteGap">
	    			<div onclick ="clickFunction(this, '${img.uri}', '${img.src}')" class = "picsToEdit" "role="region" style="background-image : url(${img.src})"></div>
	    		</div>
	    	</div>
	    </#list>
	</div>	
	
	<!--  This is the new div container for the buttons -->	
	<div style = "clear:both; margin-left: 25px;">		
		<div onclick="deleteSelected()" class="submitBut"> Delete selected pics </div>        
    
   		<form id="cropImage" action="${formAction}"  method="post" role="form">
        	<input  class="submit" type="submit" value="Back to profile">
    	</form>
 	</div>
</section>

