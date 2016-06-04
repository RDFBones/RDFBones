

var PropertyContainer = function(text){
	
	this.container = html.div()
	this.titleContainer = html.div().text(text)
	this.fieldContainer = html.div("dataFieldContainer")
	
	this.container.append(this.titleContainer)
					.append(this.fieldContainer)
}