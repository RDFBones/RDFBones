

var Row = function(parent, configData, localData){
	
	this.parent = parent
	this.configData = configData
	this.localData = localData
	this.container = this.getContainer()
	this.initFields()
}

Row.prototype = {
		
	getContainer : function(){
		return html.div("rowContainer")
	},

	initFields : function(){
		buf = []
		$.each(this.configData.dataFields, (function(j, configData) {
			buf.push(new RowElementMap[configData.type](this, configData).container)
		}).bind(this))
		this.container.append(buf)
	}
}