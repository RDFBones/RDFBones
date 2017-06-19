

var Button = function(type, returnFunction){

	this.returnFunction = returnFunction
	this.enabled = true
	var buttonId = util.getNewButtonId()
	this.container = ImgUI.libImg(type, "addFieldImg enabledImg")
	this.container.attr("id", buttonId)
	$(document).on("click", "#" + buttonId, (this.clickEvent).bind(this))
}

Button.prototype = {
		
	clickEvent : function(){
		if(this.enabled){
			this.returnFunction()
		}
	},	
	
	show : function(){
		this.container.css("display","inline-block")
		return this
	},
	
	hide : function(){
		this.container.css("display","none")
		return this
	},
	
	disable : function(){
		this.enabled = false
		this.container.addClass("disabledImg").removeClass("enabledImg")
		return this
	},
	
	enable : function(){
		this.enabled = true
		this.container.removeClass("disabledImg").addClass("enabledImg")
		return this
	}
}

var LinkButton = function(type){
	Button.call(this, type, null)
}

LinkButton.prototype = Object.create(Button.prototype)


var CustomButton = function(type, returnFunction, customClass){

	Button.call(this, type, returnFunction)
	this.container.addClass(customClass)
}

CustomButton.prototype = Object.create(Button.prototype)

var CheckBoxText = function(text, parent, selectFunction, deselectFunction){
	
	this.container = html.div("margin15H")
	this.container.append(html.div("inline").text(text))
	
	this.checkBox = html.checkBox().change(function(){
		if(this.checked){
			console.log(parent)
			parent[selectFunction](parent)
		} else {
			parent[deSelectFunction](parent)
		}
	}).addClass("inline")
	this.container.append(this.checkBox)
}

CheckBoxText.prototype = {
		
	hide : function(){
		this.container.hide()
		return this
	},
	
	show : function(){
		this.container.show()
		return this
	},
	
	set : function(){
		this.checkBox.prop('checked', true)
		this.checkBox.attr("disabled", true)
	},
	
	reset : function(){
		this.checkBox.prop('checked', false)
		this.checkBox.attr("disabled", false)
	}
}
