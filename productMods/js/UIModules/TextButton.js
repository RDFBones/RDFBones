


var TextButton = function(text, returnFunction){
	
	this.enabled = true
	this.returnFunction = returnFunction
	this.container = UI.getTextButton(text).click(this.clickEvent)
}


TextButton.prototype = {
		
	clickEvent : function(){
		if(this.enabled){
			this.returnFunction()
		}
	},
		
	disable : function(){
		this.enabled = false
		this.container.addClass("disabled")
	},
	
	enable : function(){
		this.enabled = true
		this.container.addClass("generalButton")
	}
		
}