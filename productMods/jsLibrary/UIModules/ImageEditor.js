var ImageEditor = function(boneEditor){
	this.boneEditor = boneEditor
	this.container = html.getNewDiv()
	this.container.append(this.getTitleDiv("Images"))
	this.outerContainer = this.getOuterContainer()
	this.innerContainer = this.getInnerContainer()
	this.container
			.append(this.outerContainer
					.append(this.innerContainer))
					.append(html.getNewDiv("newLine"))
}	

ImageEditor.prototype.show1 = function(imageList, edit){
	this.container.show()
	this.imageList = imageList
	if(edit){
		var func = this.getEditImg
	} else{
		var func = this.getImg
	}
	this.innerContainer.empty()
	object = this
	$.each(imageList, function(index, img){
		object.innerContainer.append(
				func(img.src, img.uri))
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

ImageEditor.prototype.getImg = function(src, index) {
	return html.getNewDiv("imgContainer").append(
			html.getPreviewImage(testImgSource + src, "previewImg",index))
},

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
},
	
ImageEditor.prototype.getNewLine = function() {
		return html.getNewDiv("newLine")
}