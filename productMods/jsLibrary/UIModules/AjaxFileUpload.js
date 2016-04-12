$("#subm").click(function(){
	var fd = new FormData(document.getElementById("myForm"));
	$.ajax({
	  url : baseUrl + "skeletalInventoryFile",
	  type: "POST",
	  data: fd,
	  processData: false,  // tell jQuery not to process the data
	  contentType: false   // tell jQuery not to set contentType
	}).done(function(msg){
		var result = $.parseJSON(msg)
		result["boneUri"] = "someUri"
		result["dataOperation"] = "saveImage"
		console.log(result)
		$.ajax({
		  url : baseUrl + "skeletalInventoryData",
		  data: result
		}).done(function(msg){
			alert("done")
		})	
	})
})
