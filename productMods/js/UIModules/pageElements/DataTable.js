
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
console.log(DataTable.prototype)

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
	var column = []
	$.each(data, (function(i, fieldData) {
		// Iterate on each field now
		var row = html.div("tableRow")
		$.each(this.configData.dataFields, function(j, configData) {
			row.append(new RowElementMap[configData.type](fieldData, configData).container)
		})
		column.push(row)
	}).bind(this))
	this.content.append(column)
}

// console.log(DataTable.prototype)
