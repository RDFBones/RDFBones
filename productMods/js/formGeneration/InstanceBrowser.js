
var InstanceBrowser = function(instanceSelector, dataArray, descriptor){
	
	this.instanceSelector = instanceSelector
	this.container = instanceSelector.toSelectModule.table
	this.dataArray = dataArray
	this.descriptor = descriptor
	this.tableCache = new Object()
	//UI
	this.navigator = new NavigatorView((this.showTable).bind(this)) 
	this.titleField = new TextField(descriptor.table.title, "browserTitle")
	this.tableContainer = html.div()
	
	this.mainTable = new SelectorTable(this, dataArray, descriptor)
	homeParam = [this.mainTable, descriptor.table.title]
	this.navigator.home(homeParam)
	this.showTable(homeParam, (dataArray.length > 0))
	this.initUI()
}

InstanceBrowser.prototype = {
	
	initUI : function(){
		
		UI.append(this, [this.navigator, this.titleField])
		this.container.append(this.tableContainer)
	},
	
	navigate : function(dataObject, descriptor){

		var subForm = descriptor.subForm
		var array = dataObject[descriptor.predicate]
		var key = dataObject[descriptor.dataKey]
		var navigatorLabel = dataObject[descriptor.table.cells[0].dataKey]
		var table = null
		if(this.tableCache[key] !== undefined){
			table = this.tableCache[key]
		} else {
			table = new SelectorTable(this, array, subForm)
			this.tableCache[key] = table
		}
		this.navigator.newElement(navigatorLabel, [table, subForm.table.title])
		this.showTable([table, subForm.table.title], array.length > 0)
	},
	
	showTable : function(param, notEmpty){
	
		this.tableContainer.empty()
		this.tableContainer.append(param[0].container)
		if(notEmpty || notEmpty === undefined){
			this.titleField.set("Select " + param[1])
		} else {
			this.titleField.set("There is no " + param[1] + " to select")
		}
	},
	
	select : function(dataItem){
		this.instanceSelector.select(dataItem)
	}
	
}