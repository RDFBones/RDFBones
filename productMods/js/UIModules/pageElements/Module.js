
var Module = function(titleParameter){
	
	this.container = html.div("moduleContainer")
	this.titleCont = html.div()
	this.title = html.div("moduleTitleStyle").text(titleParameter)
	this.table = html.div("moduleTable")
	
	this.titleCont.append(this.title)
	this.container.append(this.titleCont)
	this.container.append(this.table)
}


Module.prototype = {

	add : function(container){
		this.table.append(container)
	}

}

