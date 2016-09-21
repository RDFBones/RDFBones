
var DataField = function(configData, parent) {

	Container.call(this, configData, parent)

	this.parent = parent
	this.container = html.div("")
	this.fieldContainer = html.div("addNewContainer")
	this.buttonText = html.div("addFieldText").text(
					DataOperationMap[configData.textValue.type](
							this, configData.textValue))
	this.addButton = new AddButtonLink(this, configData).container
	this.tableContainer = new DataTable(configData, this).container	
	this.assemble()
}

DataField.prototype = Object.create(Container.prototype)

DataField.prototype.assemble = function(){
	
	UI.assemble(this.container, [
	     this.fieldContainer,
	     	this.buttonText,
	     	this.addButton,
	     this.tableContainer,
	    ], [0, 1, 1, 0])	
}