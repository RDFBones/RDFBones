

var TextButton = function(text, returnFunction){
	
	this.enabled = true
	this.returnFunction = returnFunction
	this.container = UI.getTextButton(text).click((this.clickEvent).bind(this))
}

TextButton.prototype = {
		
	clickEvent : function(){
		if(this.enabled){
			this.returnFunction()
		}
	},
		
	disable : function(){
		this.enabled = false
		this.container.removeClass("enabledButton").addClass("disabledButton")
		return this
	},
	
	enable : function(){
		this.enabled = true
		console.log("enable")
		this.container.removeClass("disabledButton").addClass("enabledButton")
		return this
	},
		
	hide : function(){
		this.container.css("display", "none")
		return this
	},
	
	show : function(){
		this.container.css("display", "inline-block")
		return this
	}
}