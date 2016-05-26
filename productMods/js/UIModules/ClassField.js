
var ClassField = function(varName, classUri) {

	DataField.call(this)
	this.cachedDef = cachedNodes[varName].possibleClasses[classUri]
	this.varname = varName
	this.classuri = classUri
	this.container = html.div()
	this.fieldContainer = html.div("dataFieldContainer")
	this.subSessions = []
	this.classContainer = UI.getFieldWithAddButton(
			//ontology.classes[classUri].label, this.add())
			ontology.classes[classUri].label, (this.add).bind(this))
	
	this.buttonContainer = html.div("dataFieldContainer")

	this.saveButton = new TextButton("Save")
	this.saveButton.disable()
	this.cancelButton = new TextButton("Cancel")

	this.buttonContainer = html.div("dataFieldContainer")
				.append(this.saveButton.container.hide())
				.append(this.cancelButton.container.hide())
	this.container.append(this.classContainer)
				.append(this.fieldContainer)
				.append(this.buttonContainer)
			
}

ClassField.prototype = Object.create(DataField.prototype)

var classFieldFunctions = {
	
	

} 

$.extend(ClassField.prototype, classFieldFunctions)



