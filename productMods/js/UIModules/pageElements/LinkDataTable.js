var LinkDataTable = function(configData){
	
	this.linkRow = LinkRow
	DataTable.call(this, configData)
}

LinkDataTable.prototype = Object.create(DataTable.prototype)

LinkDataTable.prototype.displayData = function(data) {
	var column = []
	$.each(data, (function(i, fieldData) {
		
		//column.push(new this.getRow()(this.configData, fieldData).container)
		column.push(new LinkRow(this.configData, fieldData).container)
	
	}).bind(this))
	this.content.append(column)
}
