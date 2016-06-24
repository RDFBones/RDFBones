
var AddNew = function(configData, parent) {

	
	Container.call(this, configData, parent)

	this.parent = parent
	this.container = html.div("addNewContainer")
	
	this.addButton = new AddButtonLink(this, configData)
	this.container.append(
			html.div("addFieldText").text(
					DataOperationMap[configData.textValue.type](
							this, configData.textValue))).append(
			this.addButton.container)

}

AddNew.prototype = Object.create(Container.prototype)

AddNew.prototype.setElements = function(){
	
}