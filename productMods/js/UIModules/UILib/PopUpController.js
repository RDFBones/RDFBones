

var PopUpController = {
	
	initialized : false,
	startDate : null,
	
	init : function(text){
		
		if(!this.initialized){
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
			this.initialized = true
		}

	},
	
	initWaiting : function(){
		if(!this.initialized){
			this.container = UI.getFullScreenContainer()
			this.innerContainer = UI.getFullScreenInnerMiddle(500)
			this.innerContainer.append(ImgUI.horizontalLibImg("loading", ""))
			this.container.append(this.innerContainer)
			$("#popUpContainer").append(this.container)			
		}
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
			returnFunction()
			this.done()
		}).bind(this), time)
		directReturnFunction();
	},
	
	
	note : function(msg){
		
		if(!this.initialized){
			this.container = html.div("popUpOuter")
			this.innerContainer = UI.getFullScreenInner()
					.append(html.div("verticalMiddleContainer")
					.append(html.div("msgText").text(msg))
					.append(ImgUI.libImg("done32", "inline margin10")))
			this.container.append(this.innerContainer)
			this.disableScroll()
			$("#popUpContainer").append(this.container)
			setTimeout((function(){
				this.done()
			}).bind(this), 2000)
		}
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
		this.initialized = false
	},

	disableScroll : function(){
		$('body').addClass('stop-scrolling')
	},
	
	enableScroll : function(){
		$('body').removeClass('stop-scrolling')
	},
	
	
	addWaitGif : function(div){
		this.startDate = new Date()
		waitGif = html.div("loadingContainer").append(UI.getLoadindGif()) 
		//waitGif.hide()
		div.append(waitGif)
		//waitGif.show('fast')
	},
	
	removeWaitGif : function(div, input){

		endDate = new Date()
		diff = 1500 - (endDate - this.startDate)
		if(diff > 0){
			setTimeout(function(){
				input.hide()
				div.empty()
				div.append(input)
				input.show('slow')
			}, diff)
		} else {
			input.hide()
			div.empty()
			div.append(input)
			input.show('slow')
		}
	}
}


