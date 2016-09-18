

var LiteralColumn = function(value){
	console.log(value)
	if(value == null){
		value = "There is no label"
	}
	return html.div("column").
			append(html.div("textColumn").text(value))
}

var ImageColumn = function(src){
	console.log(src)
	if(src != undefined){
		return html.div("column").
					append(ImgUI.previewImage(imgBaseUrl + src, "normalImg"))
	} else {
		return LiteralColumn("There is no file")
	}
}

var AddInstanceButton = function(instanceOffer, container, instanceURI){
	
	return ImgUI.libImgCont("addInstance", "middle")
			.click(function(){
			PopUpController.init()
			$.ajax({
				url : baseUrl + "ajaxData",
				data : {
					subject : subjectUri,
					predicate : predicateUri,
					object : instanceURI,
					dataOperation : "addInstance",
				}
			}).done(function(){
				PopUpController.doneMsg("The image was saved")
				instanceOffer.removeContainer(container)
			})
		})
}