var ImageEditor = function(boneEditor){
	this.boneEditor = boneEditor
	this.container = html.getNewDiv()
	this.container.append(this.getTitleDiv("Images"))
	this.outerContainer = this.getOuterContainer()
	this.innerContainer = this.getInnerContainer()
	
	this.waitGif = new SmallWaitingGif()
	this.noImageMsg = html.getNewDiv("margin10").text("There is no image loaded to this bone")
	
	this.imageUpload = html.getForm()
		.attr("id", "imageForm").attr("enctype","multipart/form-data")
		.append(html.getFileUploadId("datafile")
				.attr("name", "datafile")
				.addClass("uploadField"))
		
	this.submitButton = this.getSubmitButton()
	
	html.getNewDiv("button1")
		.text("Upload")
		.click(ImageEditor.submitImage)
		
	this.container
			.append(this.outerContainer
					.append(this.innerContainer))
					.append(html.getNewDiv("newLine"))
			.append(this.noImageMsg.hide())
			.append(this.imageUpload)
			.append(this.submitButton)
			.append(html.getNewDiv("newLine"))
}

ImageEditor.prototype.show = function(data){
	this.boneData = data
	this.container.show()
	this.showWaitGif();
	var _this = this
	if(data.image == null){
		//Query them
		$.ajax({
			url : baseUrl + "skeletalInventoryQuery",
			data : {
				dataOperation : "images",
				boneUri : _this.boneData.uri,
			}
		}).done(function(msg){
			var result = $.parseJSON(msg)
			console.log(result)
			_this.boneData.images = []
			console.log(_this)
			if(!("noResult" in result)){
			//if(result.noResult == null){
				$.each(result, function(index, value){
					//I have to cut the last / element
					console.log("Image " + value)
					_this.boneData.images.push(
							baseUrl.substring(0, baseUrl.length - 1) + value.downloadLocation)
				})
			}
			console.log(_this.boneData)
			_this.refreshImages()
		})
	} else {
		this.refreshImages()
	}
}

ImageEditor.prototype.showWaitGif = function(){
	this.innerContainer.append(this.waitGif)
}

ImageEditor.prototype.refreshImages = function(){
	this.innerContainer.empty()
	var _this = this
	if(this.boneData.images.length > 0){
		console.log("Existing images")
		this.outerContainer.show()
		this.noImageMsg.hide()
		$.each(this.boneData.images, function(index, img){
			console.log(img)
			_this.innerContainer.append(
					_this.getImg(img))
		})
	} else {
		this.outerContainer.hide()
		this.noImageMsg.show()
	}
}

ImageEditor.prototype.getSubmitButton = function(){
	var _this = this
	console.log(this.boneData)
	return html.getNewDiv("button1")
				.text("Upload")
				.click(function(){
	
		var fd = new FormData(document.getElementById("imageForm"));
		$.ajax({
		  url : baseUrl + "ajaxFile",
		  type: "POST",
		  data: fd,
		  processData: false,  // tell jQuery not to process the data
		  contentType: false   // tell jQuery not to set contentType
		}).done(function(msg){
			var result = $.parseJSON(msg)
			result["boneUri"] = _this.boneData.uri
			result["dataOperation"] = "saveImage"
			console.log(result)
			//I have to cut the last / element
			if(parent.images == null ){
				parent.images = []
			}
			_this.boneData.images.unshift(
					baseUrl.substring(0, baseUrl.length - 1) + result.downloadLocation)
			$.ajax({
			  url : baseUrl + "skeletalInventoryData",
			  data: result
			}).done(function(msg){
				_this.refreshImages()
			})
		})
	})		
}

ImageEditor.prototype.getTitleDiv = function(title) {
	this.titleDiv = html.getNewDiv("moduleTitle").text(title)
	return this.titleDiv
}

ImageEditor.prototype.getOuterContainer = function(){
	this.innerContainer = html.getNewDiv("imgEditOuterContainer")
	return this.innerContainer
}

ImageEditor.prototype.getInnerContainer = function(){
	return html.getNewDiv("imagesInnerContainer")
}

ImageEditor.prototype.getImg = function(src) {
	return html.getNewDiv("boneImageContainer").append(
			html.getPreviewImage(src, "boneImage","viewer"))
}

ImageEditor.prototype.getEditImg = function(src, index){
	return html.getNewDiv("imageContainer")
			.append(html.getPreviewImage(testImgSource + src, "previewImg", index))
			.append(html.getNewDiv("imgCheckBoxContainer")
					.append(html.getCheckBox()))
	/*	<div class = "imageContainer">
			<img src="" class = "image">
			<div class = "imgCheckBoxContainer">
				<input type = "checkbox"/>
			</div>	
		</div> 	*/
}
	
ImageEditor.prototype.getNewLine = function() {
		return html.getNewDiv("newLine")
}