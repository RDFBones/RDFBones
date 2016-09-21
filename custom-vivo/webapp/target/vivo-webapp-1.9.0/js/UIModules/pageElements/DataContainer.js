

var DataContainer = function(tableConfig){
	
	this.tableConfig = tableConfig
	this.addNew = new AddNew(tableConfig.addText, tableConfig.customEntryForm)
	this.dataTable = new DataTable(tableConfig)

	this.container = html.div("dataField")
	this.container.append(this.addNew.container)
				.append(this.dataTable.container)		
}
