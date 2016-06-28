
var DataTable = function(configData, parent) {

	Container.call(this, configData, parent)
	
	this.container.addClass("dataTable")
	this.header = html.div("tableHeader")
	this.content = html.div("contentContainer")
	this.loadTableHeader()
	this.loadTableData()
	this.container.append(this.title).append(this.header).append(this.content)
}

DataTable.prototype = Object.create(Container.prototype)

DataTable.prototype.getRow = function(){
	
	return Row
}

DataTable.prototype.setElements = function() {
	
},

DataTable.prototype.loadTableHeader = function() {
	$.each(this.configData.dataFields, (function(j, field) {
		if (field.type != sw.editButton) {
			this.header.append(html.div("tableTitle").text(field.title))
		}
	}).bind(this))
},

DataTable.prototype.loadTableData = function() {
	this.displayData(DataOperationMap[this.configData.dataToDisplay.type](this,
			this.configData.dataToDisplay))
},

DataTable.prototype.displayData = function(data) {
	if(data.length > 0){
		var column = []
		$.each(data, (function(i, fieldData) {
			column.push(new Row(this, this.configData, fieldData).container)
		
		}).bind(this))
		this.content.append(column)
	} else {
		this.content.append(html.div("msg").text("There is no entry to show!"))
	}

}
