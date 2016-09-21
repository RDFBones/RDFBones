


var LiteralField = function(parent, configData){
	
	this.parent =  parent
	//this.value = data[configData.dataKey]
	this.container = html.div("literalField").text(getData(this, configData.value))
}


var LiteralFieldMiddle = function(parent, configData){
	
	this.parent =  parent
	//this.value = data[configData.dataKey]
	this.container = html.div("literalFieldMiddle").text(getData(this, configData.value))
}

var LiteralLinkField = function(parent, configData){
	this.parent = parent
	this.container = html.link(DataLib.assembleUrl(configData, this))
			.append(html.div("literalLinkField").text(getData(this, configData.value)))
	console.log(getData(this, configData.value))
}