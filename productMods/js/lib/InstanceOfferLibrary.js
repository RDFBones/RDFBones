

var LiteralColumn = function(value){
	console.log(value)
	return html.div("column inline").text(value)
}

var ImageColumn = function(src){
	if(src != undefined){
		return html.getImgClass(imgBaseUrl + src, "column columnImg")
	} else {
		return html.div("column columnImg")
	}
}

var AddInstanceButton = function(containerToRemove, instanceURI){
	
	return UI.getInlineActionImg("addInstance").
		click(function(){
			$.ajax({
				url : baseUrl + "ajaxData",
				data : {
					subject : subjectUri,
					predicate : predicateUri,
					object : instanceURI,
					dataOperation : "addInstance",
				}
			}).done(function(){
				containerToRemove.remove()
			})
		})
}