var Close = function(container){
	this.container = html.getImgClass(imgSrc + "close.png", "floatRight")
			.click(function(){
				container.hide()
				Controller.refreshPage()
			})
}

var BackToParent = function(boneEditor, parent){
	this.boneEditor = boneEditor
	_this = this
	this.parent = parent
	this.container = html.getNewDiv().
		append(html.getImg(imgSrc + "backToParent.png")).
		append(html.getNewDiv("inline").text("Back to Parent"))
		.click(function(){
			UIController.modules["boneEditor"].show1(_this.parent)
		})
}

BackToParent.prototype.show1= function(parent){
	this.parent = parent
	if(parent != null){
		this.container.show()
	} else {
		this.container.hide()
	}
}


