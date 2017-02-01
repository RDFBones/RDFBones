

var PopUpController = {
	
	initialized : false,
	startDate : null,
	waitGif : null,
	cont : $("#popUpContainer"),
	
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
	
	set : function(element){
		
		this.container.empty()
		this.container.append( 
				UI.getFullScreenInner().append(element))
		$("#popUpContainer").append(this.container)
		this.disableScroll()
		this.initialized = true
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
	
	doneMsg : function(msg){
		
		this.customDoneMsg(msg, 800, function(){}, function(){})
	},
	
	customDoneMsg : function(msg, time, returnFunction, directReturnFunction){
		
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
			}).bind(this), 1200)
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
		
		this.waitGif = html.div("loaderMsgContainer")
		msgDiv = html.div("loaderMsg").text("Loading form")	
		img = ImgUI.waitGif()
		this.waitGif.append([img, msgDiv])
		div.append(this.waitGif)
	},
	
	addSubWaitGif : function(div){

		this.addSubWaitGifText(div, "Loading subform")	
	},
	
	addSubWaitGifText : function(div, text){

		this.waitGif = html.div("loaderMsgContainer")
		msgDiv = html.div("loaderMsgSubForm").text(text)	
		img = ImgUI.subWaitGif()
		this.waitGif.append([img, msgDiv])
		div.prepend(this.waitGif)
	},
	
	removeWaitGif : function(div, input){

		//diff = 200 - ((new Date()) - this.startDate)
		//diff = (diff > 0) ? diff : 0
		//setTimeout((function(){
			if(util.isArray(input)) {
				UI.hideArray(input)
			} else {
				input.hide()
			}	
			this.waitGif.remove()
			div.append(input)
			input.fadeIn(1000)
			//input.show('slow')
		//}).bind(this), diff)	
	},
	
	remove : function(){
		this.waitGif.remove()
	}
}


