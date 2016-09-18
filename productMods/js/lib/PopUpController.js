


var PopUpController = {
	
	initWaiting : function(){
		this.container = UI.getFullScreenContainer()
		this.innerContainer = UI.getFullScreenInnerMiddle(500)
		//this.innerContainer.append(ImgUI.horizontalLibImg("loading", ""))
		this.innerContainer.append(UI.getWaitGif())
		this.container.append(this.innerContainer)
		$("#popUpContainer").append(this.container)
	},
	
	doneMsg : function(msg){
		this.container.empty()
		//This type of inner container will adapt to the image
		this.innerContainer = UI.getFullScreenInner()
		.append(html.div("verticalMiddleContainer")
			.append(html.div("msgText").text(msg))
			.append(ImgUI.libImg("done32", "inline margin10")))
		this.container.append(this.innerContainer)
		setTimeout((function(){
			this.container.remove()
		}).bind(this), 500)
	}
}
