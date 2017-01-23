

class TextButton {
	
	constructor(text, returnFunction, parameter, style){
		this.enabled = true
		this.returnFunction = returnFunction
		this.container = this.getContainer(text, style)
		this.parameter = util.setUndefined(parameter, null)
	}
	
	getContainer (text, style){
		return UI.getButtonText(text, this.getStyle() + " " + style, (this.clickEvent).bind(this))
	}
	
	getStyle (){
		return "generalButton hoverClass"
	}
	
	clickEvent (){
		if(this.enabled){
			this.returnFunction(this.parameter)
		}
	}

	disable (){
		this.enabled = false
		this.container.removeClass("hoverClass").addClass("disabledButton")
		return this
	}
	
	enable (){
		this.enabled = true
		this.container.removeClass("disabledButton").addClass("hoverClass")
		return this
	}
		
	hide (){
		this.container.css("display", "none")
		return this
	}
	
	setColor (color){
		this.container.css("background-color", color)
		return this
	}
	
	resetColor (color){
		this.container.removeAttr("style")
		return this
	}
	
	disableHover (){
		this.container.removeClass("hover")
		return this
	}
	
	enableHover (){
		this.container.removeClass("hover")
		return this
	}
	
	show (){
		this.container.css("display", "inline-block")
		return this
	}
}

class TextButtonSmall extends TextButton {
	
	getStyle (){
		return "smallButton"
	}
}

class HomeButton extends TextButton{
	
	constructor(returnFunction, parameter){
		super(null, returnFunction, parameter)
	}
	
	getContainer (){
		return UI.getButtonImage("home", this.getStyle(), (this.clickEvent).bind(this))
	}
}
