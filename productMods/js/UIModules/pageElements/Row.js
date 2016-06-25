

var Row = function(configData, localData){
	
	this.container = html.div("rowContainer")
	this.configData = configData
	this.localData = localData
	this.initFields()
}

Row.prototype = {
		
	initFields : function(){
		buf = []
		$.each(this.configData.dataFields, (function(j, configData) {
			buf.push(new RowElementMap[configData.type](this, configData).container)
		}).bind(this))
		this.container.append(buf)
	}
}