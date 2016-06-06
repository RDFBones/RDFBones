


var LiteralField = function(data, configData){
	
	this.value = data[configData.dataKey]
	this.container = html.div("literalField").text(data[configData.dataKey])
}


