
var ClassField = function(varName, classUri) {

	this.varname = varName
	this.classuri = classUri
	this.container = html.div()
	this.fieldContainer = html.div()
	this.classContainer = UI.getFieldWithAddButton(
			//ontology.classes[classUri].label, this.add())
			ontology.classes[classUri].label, (this.add).bind(this))
	this.container.append(this.classContainer)
				.append(this.fieldContainer)
}

ClassField.prototype = {

	add : function() {
		this.fieldContainer.append(dataProcessor.getFields(this.varname,
				this.classuri))
	}
}