<script type="text/javascript" src="/vivo/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="/vivo/js/jquery.fileDownload.js"></script>
<script>
	
	 var selectedDocsUri = [];
	 var selectedDocsSrc = [];
	
	
	function selectDoc(chbox, uri, src){
	
	    if(chbox.checked){
		
			selectedDocsUri.push(uri);
			selectedDocsSrc.push(src);
	    
	    } else {
	    
	    	var pos = selectedDocsUri.indexOf(uri); 
		    selectedDocsUri.splice(pos,1);
	   		pos = selectedDocsSrc.indexOf(src); 
		    selectedDocsSrc.splice(pos,1);
	   }
	   
	   console.log(selectedDocsSrc);
	   console.log(selectedDocsUri);
	}
	
	
	function deleteSelected(){
	
		
		var k=0;
 		for( var i = 0; i < selectedDocsUri.length;  i++){
 		
 			//console.log('${individualUri}' + " " +  '${predicateUri}' + " "  + selectedImages[i]);
 			//PropertyDWR.deleteProp(updateN, '${individualUri}', '${predicateUri}', selectedDocs[i]);
 			//selectedDivs[i].remove();
 			k++;
 		}
		 		
 		if( k > 0 ){
 			alert("Successfully deleted " + k + " items ");
 			$.ajax({
                //url: "${urls.base}/" + selectedDocsSrc[0],
                url: selectedDocsSrc[0],
                success:function(data){
                
                    console.log("Success");
                }
            });
 			
 		} else {
 			alert("Please select at least one image");
 		}
	}
	
	function downloadFiles(){
	
		$.fileDownload(selectedDocsSrc[0])
			.done(function () { alert('File download a success!'); })
  			.fail(function () { alert('File download failed!'); });
	}
	
	
	
</script>

<div id="entityUriForDwr" style="visibility:hidden;">${individualUri}</div>
<section id="photoCroppingContainer" role="region">
    
	<div style = "padding: 10px; margin-left : 10px;">
	   	Select the images you want to delete
	</div>
    
   	<!-- This is the image we're attaching Jcrop to -->
	
	<div id="photoEditorContainer" role="region">
        <#list documents as doc>
	    	<div class="picsToEditContatiner" >
	    		<div class="classForWhiteGap">
	    			<input type="checkbox" onclick="selectDoc(this,'${doc.uri}', '${doc.src}')" name="toDelete">
	    			<a href="${doc.src}" download>${doc.fileName}</a>
				</div>
	    	</div>
	    </#list>
	</div>
	
	

	<!--  This is the new div container for the buttons -->	
	<div style = "clear:both; margin-left: 25px;">		
		<div onclick="deleteSelected()" class="submitBut"> Delete selected pics </div>        
    	<div onclick="downloadFiles()" class="submitBut"> Download </div>
   		<form id="cropImage" action="${formAction}"  method="post" role="form">
        	<input  class="submit" type="submit" value="Back to profile">
    	</form>
 	</div>
</section>

