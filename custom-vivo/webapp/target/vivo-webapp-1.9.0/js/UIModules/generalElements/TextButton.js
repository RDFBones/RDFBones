

var TextButton = function(text, returnFunction, style){
	
	this.enabled = true
	this.returnFunction = returnFunction
	this.container = UI.getTextButton(text).addClass(this.getStyle())
		.click((this.clickEvent).bind(this))
}

TextButton.prototype = {
		
	
	getStyle : function(){
		return "generalButton"
	},
		
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

var TextButtonSmall = function(text, returnFunction, style){
	
	TextButton.call(this, text, returnFunction, style)
}

TextButtonSmall.prototype = Object.create(TextButton.prototype)


TextButtonSmall.prototype.getStyle = function(){
	return "smallButton"
}

