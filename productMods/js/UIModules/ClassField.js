
var ClassField = function(varName, classUri, dataController) {

	DataField.call(this)
	this.dataController = dataController
	this.cachedDef = processedNodes[varName].possibleClasses[classUri]
	this.varName = varName
	this.classUri = classUri
	this.container = html.div()
	this.fieldContainer = html.div("dataFieldContainer")
	this.subSessions = []
	this.classContainer = UI.getFieldWithAddButton(
			//ontology.classes[classUri].label, this.add())
			ontology.classes[classUri].label, (this.add).bind(this))
	
	this.buttonContainer = html.div("dataFieldContainer")

	this.saveButton = new TextButton("Save")
	this.saveButton.hide().disable()
	this.cancelButton = new TextButton("Cancel")
	this.cancelButton.hide()

	this.buttonContainer = html.div("dataFieldContainer")
				.append(this.saveButton.container)
				.append(this.cancelButton.container)
	this.container.append(this.classContainer)
				.append(this.fieldContainer)
				.append(this.buttonContainer)

}

ClassField.prototype = Object.create(DataField.prototype)

var classFieldFunctions = {
	
	

} 

$.extend(ClassField.prototype, classFieldFunctions)



