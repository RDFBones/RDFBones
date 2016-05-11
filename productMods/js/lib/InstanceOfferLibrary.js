

var LiteralColumn = function(value){
	console.log(value)
	return html.div("column inline").text(value)
}

var ImageColumn = function(src){
	console.log(src)
	return html.getImgClass(imgBaseUrl + src, "column columnImg")
}

var AddInstanceButton = function(containerToRemove, instanceURI){
	
	return html.div("button").text("Add").
		click(function(){
			$.ajax({
				url : baseUrl + "skeletalInventoryData",
				data : {
					subject : subjectUri,
					object : instanceURI,
					dataOperation : "addInstance",
				}
			}).done(function(){
				containerToRemove.remove()
			})
		})
}