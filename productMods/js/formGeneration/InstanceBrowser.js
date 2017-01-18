
class InstanceBrowser {
	
	constructor(instanceSelector, dataArray){
		
		this.instanceSelector = instanceSelector
		this.container = instanceSelector.toSelectModule.table
		this.descriptor = instanceSelector.descriptor
		this.dataArray = dataArray
		this.tableCache = new Object()
		//UI
		this.navigator = new NavigatorView((this.showTable).bind(this)) 
		this.titleField = new TextField(this.descriptor.table.title, "browserTitle")
		this.tableContainer = html.div()
		
		this.mainTable = this.getSelectorTable()
		var homeParam = [this.mainTable, this.descriptor.table.title]
		this.navigator.home(homeParam)
		this.showTable(homeParam, (this.dataArray.length > 0))
		this.initUI()
	}

	initUI (){
		
		UI.append(this, [this.navigator, this.titleField])
		this.container.append(this.tableContainer)
	}
	
	getSelectorTable (){
		return new SelectorTable(this, this.dataArray, this.descriptor)
	}
	
	navigate (dataObject, descriptor){

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
	}
	
	showTable (param, notEmpty){
	
		this.tableContainer.empty()
		this.tableContainer.append(param[0].container)
		if(notEmpty || notEmpty === undefined){
			this.titleField.set("Select " + param[1])
		} else {
			this.titleField.set("There is no " + param[1] + " to select")
		}
	}
	
	select (dataItem){
		this.instanceSelector.select(dataItem)
	}
} 

class EditInstanceBrowser extends InstanceBrowser{
	
	getSelectorTable(){
		return new EditSelectorTable(this, dataArray, this.descriptor)
	}
}
