<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Template for property listing on individual profile page -->


<script>
/*
$.getJSON("http://localhost:8080/vivo/dataservice?getFilesForIndividual=jooo", function(results) {
	console.log("arrived");
});
*/
var browseByVClass = {
    // Initial page setup
    onLoad: function() {

    	this.initObjects();
    	this.getIndividuals();
    },
    
    // Create references to frequently used elements for convenience
    initObjects: function() {
        
        this.Files = $('#hasImage-picture-List');
    },
    
    getIndividuals: function() {
   
        console.log("getIndividuals - getJSON");
    	
        $.getJSON("http://localhost:8080/vivo/dataservice?getFilesForIndividual=jooo" + "&entityUri=" + "${individual.uri!}", function(results) {
        	
        	console.log(JSON.stringify(results));
        	
        	var imageHTML = "";
        	
        	
           	imageHTML = results.images.shortViewHtml;
                    
            browseByVClass.Files.append(imageHTML);
         	browseByVClass.Files.append(" \
         			<div style = \"clear : both; margin-left : 25px;\"> \
         			 	<form id=\"cropImage\" action=\"/vivo/uploadImages?entityUri=${individual.uri}&action=editUploadedImages\"  method=\"post\" role=\"form\"> \
				        	<input  class=\"submit\" type=\"submit\" value=\"Edit images\"> \
				    	</form>	\
				    </div>	");
		});
    }
}

$(document).ready(function() {
    browseByVClass.onLoad();
});


</script>