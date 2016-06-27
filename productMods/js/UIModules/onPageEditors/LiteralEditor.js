


var LiteralEditor = function(configData){
	
	this.type = "Literal"
	OnPageEditor.call(this, configData)
}

LiteralEditor.prototype = Object.create(OnPageEditor.prototype)

LiteralEditor.prototype.setContainers = function(){
	
	this.valueField = html.div("inline")
	this.editField = html.textBox()
}

LiteralEditor.prototype.setEditField = function(){
	if(!this.noData){
		this.editField.val(this.value)
	}
},

LiteralEditor.prototype.getValue = function(){
	
	return this.editField.val()
}

LiteralEditor.prototype.setValueField = function(){
	
	this.valueField.text(this.value)
}

LiteralEditor.prototype.validChange = function(){
	
	if(this.editField.val() != ""){
		return true
	} else {
		return false
	}
}

LiteralEditor.prototype.errorMsg = function(){
	
	alert("Please add a value")
}

var TextEditor = function(parent, configData){

	LiteralEditor.call(this, parent, configData)
}

TextEditor.prototype = Object.create(LiteralEditor.prototype)

TextEditor.prototype.setContainers = function(){
	
	this.valueField = html.div("inline")
	this.editField = html.textAreaC("margin5")
}

