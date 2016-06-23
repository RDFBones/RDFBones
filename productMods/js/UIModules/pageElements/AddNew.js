


var AddNew = function(text, entryFormUri){
	
	this.container = html.div("addNewContainer")
	var pageUri = baseUrl + "/entryFormUri?uri=" + entryFormUri

	this.pageLink = new PageLink("add", pageUri)
	this.container.append(html.div("addFieldText").text(text))
				.append(this.pageLink.container)
}