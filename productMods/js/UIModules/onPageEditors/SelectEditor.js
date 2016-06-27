


var SelectEditor = function(configData){

	this.type = "Object"
	this.options = getData1(configData.options)
	OnPageEditor.call(this, configData)
}

SelectEditor.prototype = Object.create(OnPageEditor.prototype)


SelectEditor.prototype.setContainers = function(){
	
	this.valueField = html.div("inline")
	this.editField = UI.classSelector(this.options)
}

SelectEditor.prototype.getValue = function(){
	return this.editField.val()
}


SelectEditor.prototype.setEditField = function(){
	this.editField.val(this.value)
}

SelectEditor.prototype.setValueField = function(){
	this.valueField.text(this.options.getObjectByKey("uri", this.value).label)
}




