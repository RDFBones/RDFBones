

var TextButton = function(text, returnFunction, style, parameter){
	
	this.enabled = true
	this.returnFunction = returnFunction
	var buttonId = util.getNewButtonId()
	this.container = UI.getTextButton(text, buttonId).addClass(this.getStyle() + " " + style)
	$(document).on("click", "#" + buttonId, (this.clickEvent).bind(this))
	this.parameter = util.setUndefined(parameter, null)
}

TextButton.prototype = {
		
	getStyle : function(){
		return "generalButton hover"
	},
		
	clickEvent : function(){
		if(this.enabled){
			this.returnFunction(this.parameter)
		}
	},

	disable : function(){
		this.enabled = false
		this.container.removeClass("hover").addClass("disabledButton")
		return this
	},
	
	enable : function(){
		this.enabled = true
		this.container.removeClass("disabledButton").addClass("hover")
		return this
	},
		
	hide : function(){
		this.container.css("display", "none")
		return this
	},
	
	setColor : function(color){
		this.container.css("background-color", color)
		return this
	},
	
	disableHover : function(){
		this.container.removeClass("hover")
		return this
	},
	
	enableHover : function(){
		this.container.removeClass("hover")
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

