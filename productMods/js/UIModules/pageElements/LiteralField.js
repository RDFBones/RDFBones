


var LiteralField = function(fieldData, configData){
	
	//this.value = data[configData.dataKey]
	this.container = html.div("literalField").text(fieldData[configData.key])
}


var LiteralFieldMiddle = function(fieldData, configData){
	
	this.container = html.div("literalFieldMiddle").text(fieldData[configData.key])
}


