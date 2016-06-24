
var AddNew = function(configData, parent) {

	this.parent = parent
	this.container = html.div("addNewContainer")
	var pageUri = baseUrl + "/entryFormUri?uri=" // + entryFormUri

	this.pageLink = new PageLink("add", pageUri)
	this.container.append(
			html.div("addFieldText").text(
					DataOperationMap[configData.textValue.type](
							this, configData.textValue))).append(
			this.pageLink.container)
}