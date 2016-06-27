


var LiteralEditor = function(configData){
	
	this.type = "Literal"
	OnPageEditor.call(this, configData)
}

LiteralEditor.prototype = Object.create(OnPageEditor.prototype)

LiteralEditor.prototype.setContainers = function(){
	
	this.valueField = html.div("inline")
	this.editField = html.textArea()
}


var TextEditor = function(parent, configData){

	this.type = "literal"
	OnPageEditor.call(this, parent, configData)
}

TextEditor.prototype = Object.create(OnPageEditor.prototype)

TextEditor.prototype.setContainers = function(){
	
	this.valueField = html.div("valueField")
	this.editField = html.textArea()
}

