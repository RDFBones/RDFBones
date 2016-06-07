

var Button = function(type, returnFunction){

	this.returnFunction = returnFunction
	this.enabled = true
	this.container = ImgUI.libImg(type, "addFieldImg enabledImg").click((this.clickEvent).bind(this))
}

Button.prototype = {
		
	clickEvent : function(){
		if(this.enabled){
			this.returnFunction()
		}
	},	
	
	hide : function(){
		this.container.hide()
	},
	
	disable : function(){
		this.enabled = false
		this.container.addClass("disabledImg").removeClass("enabledImg")
	},
	
	enable : function(){
		this.enabled = true
		this.container.removeClass("disabledImg").addClass("enabledImg")
	}
}

var LinkButton = function(type){
	Button.call(this, type, null)
}

LinkButton.prototype = Object.create(Button.prototype)