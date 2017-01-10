


var TextField = function(value, style){
	
	this.style = util.setUndefined(style, "")
	this.container = html.div(this.style).text(value)
}

TextField.prototype = {
	
	set : function(text){
		this.container.text(text)
	}
}