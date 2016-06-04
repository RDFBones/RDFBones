


var NewLiteralEditor = function(parentField, customClass, varName, dataReference){
	
	
	this.parentField = parentField
	this.customClass = customClass
	this.dataReference = dataReference
	this.varName = varName

	this.container = html.div("dataForm")
	
	this.classContainer = html.div("title").text(classConfiguration[customClass].fieldMsg)
	this.fieldContainer = html.getTextBox()
	this.saveButton = new TextButton("Save", (this.saveValue).bind(this))
	
	this.container
		.append(this.classContainer)
		.append(this.fieldContainer)
		.append(this.saveButton.container)
}


NewLiteralEditor.prototype = {
		
	saveValue : function(){
		this.parentField.setData(this.varName)
	}
	
}
