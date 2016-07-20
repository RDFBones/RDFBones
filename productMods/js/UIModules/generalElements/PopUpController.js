


var PopUpController = {
	
	init : function(){
		
		this.container = html.div("popUpOuter")
		this.innerContainer = html.div("popUpInner")
		this.innerContainer.append(ImgUI.libImg("loading", "loadingImg"))
		$("#popUpContainer").append(this.container.append(this.innerContainer))
	},
		
	initWaiting : function(){
		this.container = UI.getFullScreenContainer()
		this.innerContainer = UI.getFullScreenInnerMiddle(500)
		this.innerContainer.append(ImgUI.horizontalLibImg("loading", ""))
		this.container.append(this.innerContainer)
		$("#popUpContainer").append(this.container)
	},
	
	doneMsg : function(msg, time){
		
		if(time === undefined){
			time = 1000
		}
		this.container.empty()
		//This type of inner container will adapt to the image
		this.innerContainer = UI.getFullScreenInner()
		.append(html.div("verticalMiddleContainer")
			.append(html.div("msgText").text(msg))
			.append(ImgUI.libImg("done32", "inline margin10")))
		this.container.append(this.innerContainer)
		setTimeout((function(){
			this.container.remove()
		}).bind(this), time)
	},
	
	note : function(msg){
		
		this.container = html.div("popUpOuter")
		this.innerContainer = UI.getFullScreenInner()
				.append(html.div("verticalMiddleContainer")
				.append(html.div("msgText").text(msg))
				.append(ImgUI.libImg("done32", "inline margin10")))
		this.container.append(this.innerContainer)
		$("#popUpContainer").append(this.container)
		setTimeout((function(){
			this.container.remove()
		}).bind(this), 2000)
	}
}


