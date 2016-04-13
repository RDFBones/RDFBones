var WaitingGif = function(){
	return html.getNewDiv("waitGifContainer")
			.append(html.getImgClass(imgSrc + "loading.gif", "waitGif"))
}

var SmallWaitingGif = function(){
	return html.getNewDiv("smallWaitGifContainer")
			.append(html.getImgClass(imgSrc + "loading.gif", "smallWaitGif"))
}

var Done = function(container){
	 this.container = html.getNewDiv("done").text("Done")
			.click(function(){
				container.hide()
				pageLoader.refreshTables()
			})
}

Done.prototype.show = function(){
	this.container.show()
}

var BackToParent = function(parent){
	this.container = html.getNewDiv("backToParent").
			append(html.getNewDiv("inline").text("Back to Parent"))
}

BackToParent.prototype.show = function(boneData){
	if(boneData.parent == null){
		this.container.hide()
	} else {
		this.container.show()
		.click(function(){
			UIController.modules["boneEditor"].show1(boneData.parent)
		})
	}
}

var TableTitle = function(){
	this.container = html.getNewDiv("titleContainer");
}

TableTitle.prototype.show = function(classUri){
	this.container.text(DataController.getClassObject(classUri).label).show()
}



