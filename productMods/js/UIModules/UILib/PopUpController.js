


var PopUpController = {
	
	init : function(text){
		
		if(text === undefined){
			text = "Please Wait"
		}
		this.container = html.div("popUpOuterNew")
		this.inner = html.div("popUpInnerNew")
		this.vertical = html.div("verticalMiddleContainer")
		this.pleaseWait = html.div("margin10 pleaseWait").text(text)
		this.imgCont = ImgUI.libImgWidth("loading2", "margin10", "80")
		UI.assemble(this.container,[
		        this.inner,
		        	this.vertical,
		        		this.pleaseWait,
		        		this.imgCont,
				], [0, 1, 2, 2])		
		$("#popUpContainer").append(this.container)
		this.disableScroll()
	},
	
	initWaiting : function(){
		this.container = UI.getFullScreenContainer()
		this.innerContainer = UI.getFullScreenInnerMiddle(500)
		this.innerContainer.append(ImgUI.horizontalLibImg("loading", ""))
		this.container.append(this.innerContainer)
		$("#popUpContainer").append(this.container)
	},
	
	doneMsg : function(msg, time, returnFunction, directReturnFunction){
		
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
			returnFunction()
			this.enableScroll()
		}).bind(this), time)
		directReturnFunction();
	},
	
	
	note : function(msg){
		
		this.container = html.div("popUpOuter")
		this.innerContainer = UI.getFullScreenInner()
				.append(html.div("verticalMiddleContainer")
				.append(html.div("msgText").text(msg))
				.append(ImgUI.libImg("done32", "inline margin10")))
		this.container.append(this.innerContainer)
		this.disableScroll()
		$("#popUpContainer").append(this.container)
		setTimeout((function(){
			this.enableScroll()
			this.container.remove()
		}).bind(this), 2000)
	},
	
	doneTime : function(startDate, diff, returnFunction){
		
		while(true){
			endDate = new Date()
			if((endDate - startDate) > diff){
				break
			}
		} 
		this.done()
		returnFunction()
	},
	
	done : function(){
		this.enableScroll()
		this.container.remove()
	},
	
	disableScroll : function(){
		$('body').addClass('stop-scrolling')
	},
	
	enableScroll : function(){
		$('body').removeClass('stop-scrolling')
	}
}


