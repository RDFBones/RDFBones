

var SelectorAddField = function(configData){
	
	this.container = html.div()
	this.title = html.div("title").text(configData.title)
	
	this.select = html.div("addFieldContainer").css("margin-left", "15px")
	
	this.selector = new SelectorField(configData.listElements, null).container.addClass("inline")
	this.addButton = new Button("add", null).container.addClass("inline")
	
	this.select.append(this.selector).append(this.addButton)
	this.container.append(this.title).append(this.select)
}


