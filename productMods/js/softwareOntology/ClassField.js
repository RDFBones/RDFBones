
var ClassField = function(varName, classUri, cachedDef) {
	
	console.log(varName + "   " + classUri)
	console.log(cachedDef)

	DataField.call(this)
	this.cachedDef = cachedDef
	this.varname = varName
	this.classuri = classUri
	this.container = html.div()
	this.fieldContainer = html.div()
	this.subSessions = []
	this.classContainer = UI.getFieldWithAddButton(
			//ontology.classes[classUri].label, this.add())
			ontology.classes[classUri].label, (this.add).bind(this))
	this.container.append(this.classContainer)
				.append(this.fieldContainer)
}

ClassField.prototype = Object.create(DataField.prototype)

var classFieldFunctions = {
	
	

} 

$.extend(ClassField.prototype, classFieldFunctions)