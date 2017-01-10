var DataTable = function(instanceSelector, title, descriptor, dataArray, add) {

	this.instanceSelector = instanceSelector
	this.title = title
	this.descriptor = descriptor
	this.dataArray = dataArray
	this.initUI()
	this.initData(add)
	this.entries = this.dataArray.length
}

DataTable.prototype = {

	initUI : function() {
		this.container = html.div();
		this.titleDiv = html.div("title").text(this.title)
		this.dataContainer = html.div("dataContainer")
		this.noEntry = html.div("columnContainer").text(
			"There is no entry to show")
		this.container.append(this.titleDiv)
			.append(this.dataContainer)
	},

	initData : function(added) {

		rows = []
		$.each(this.dataArray, (function(i, element) {
			instanceRow = new InstanceRow(this, element, added)
			this.instanceSelector.instanceRows.push(instanceRow)
			rows.push(instanceRow.container)
		}).bind(this))
		if (this.dataArray.length > 0) {
			this.dataContainer.append(rows)
		} else {
			this.dataContainer.append(this.noEntry)
		}
	},
	
	add : function(instanceRow){
		instanceRow.dataTable = this
		if(this.entries == 0){
			this.noEntry.remove()
		}
		this.entries++;
		this.dataContainer.append(instanceRow.container)
	},
	
	select : function(instanceRow){
		
		this.entries--
		if(this.entries == 0){
			this.dataContainer.append(this.noEntry)
		}
		this.instanceSelector.select(instanceRow)
	},
}

var InstanceRow = function(dataTable, data, added) {

	this.dataTable = dataTable
	this.descriptor = dataTable.descriptor.cells
	this.data = data
	this.added = added
	this.initUI()
}

InstanceRow.prototype = {

	initUI : function() {
		this.container = html.div("rowContainer")
		cells = []
		$.each(this.descriptor, (function(i, cell) {
			cells.push(new ElementMap[cell.type](this.data, cell).container)
		}).bind(this))
		this.selectButton = new Button("add", (this.select).bind(this));
		this.removeButton = new Button("del", (this.select).bind(this));
		this.added ? this.selectButton.hide() : this.removeButton.hide()
		cells.push(this.selectButton.container)
		cells.push(this.removeButton.container)
		this.container.append(cells)
	},

	select : function() {

		if (this.added) {
			this.added = false
			this.selectButton.show()
			this.removeButton.hide()
		} else {
			this.added = true
			this.selectButton.hide()
			this.removeButton.show()
		}
		this.container.remove()
		this.dataTable.select(this)
	}
}