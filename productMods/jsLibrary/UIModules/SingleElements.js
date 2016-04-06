var WaitingGif = function(){
	return html.getNewDiv("waitGifContainer")
			.append(html.getImgClass(imgSrc + "loading.gif", "waitGifClass"))
}


var Close = function(container){
	this.container = html.getImgClass(imgSrc + "close.png", "floatRight")
			.click(function(){
				console.log("exit")
				console.log(container)
				container.hide()
				pageLoader.refreshTables()
			})
}

Close.prototype.show = function(){
	console.log("closeShow")
	this.container.show()
}

var BackToParent = function(parent){
	console.log(parent)
	var a = null
	if(parent != null){
		console.log("if")
		a = html.getDivId("backToParent").
			append(html.getImg(imgSrc + "backToParent.png")).
			append(html.getNewDiv("inline").text("Back to Parent"))
			.click(function(){
				console.log(parent)
				UIController.modules["boneEditor"].show1(parent)
			})
	} else {
		console.log("else")
	}
	return a
}



