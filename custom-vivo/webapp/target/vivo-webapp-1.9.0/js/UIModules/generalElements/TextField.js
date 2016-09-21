


var TextField = function(value){
	
	this.container = html.div().text(value)
}

TextField.prototype = {
	
	set : function(text){
		this.container.text(text)
	}
}