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
    	
        $.getJSON(url, function(results) {
        	
        	console.log(JSON.stringify(results));
        	browseByVClass.Files.append(individualList);
           
        });
    }   
}

$(document).ready(function() {
    browseByVClass.onLoad();
});