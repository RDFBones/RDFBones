
class InstanceBrowser{
	
	constructor(formElement){
		this.formElement = formElement
		this.descriptor = formElement.descriptor.table
		this.dataKey = formElement.descriptor.dataKey
		this.existingData = formElement.existingData
		this.formObject = dataUtil.getStrings(formElement.dataObject)
		
		this.elementCache = new Object()
	
		PopUpController.init("Loading data ")
		this.loadBrowserData()
	}

	loadBrowserData(){
		AJAX.call("formGraphData", (function(msg){
			this.tableData = msg.tableData
			this.init()
		}).bind(this),  DataController.getGraphDataParams(this))
	}

	init (){
		
		this.selectedModule = new Module("Selected Instances")
		this.toSelectModule = new Module("Instances to select")
		this.doneButton = new TextButton("Done", (this.done).bind(this), "margin10")
		this.selectorTable = new SelectorTable(this, this.tableData, this.descriptor)
		this.toSelectModule.add(this.selectorTable.container)
		this.initAdded()
		UI.append(this, [this.selectedModule, this.toSelectModule, this.doneButton])
		this.display()
	}
	
	initAdded(){
		this.foreign = array.substract(this.existingData, this.tableData, this.dataKey, 1)
		var selectedTable = new SelectedTable(this, this.foreign, this.descriptor)
		this.selectedModule.add(selectedTable.container)
		this.added = array.intersection(this.existingData, this.tableData, this.dataKey, 1)
		$.each(this.added, (function(i, value){
			var dataItem = this.elementCache[value[this.dataKey]]
			dataItem.selected = true
			this.selectedModule.add(dataItem.container)
		}).bind(this))
	}

	select (dataItem){
		this.selectedModule.add(dataItem.container)
		this.existingData.push(dataItem.data)
	}
	
	//Routines for selected instance from other skeletal inventories that is currently selected
	
	removeForeign(dataObject){
		DataLib.removeObjectFromArray(this.existingData, this.dataKey, dataObject)
	}
	
	remove(dataItem){
		var uri = dataItem.data[this.dataKey]
		DataLib.removeObjectFromArrayByKey(this.existingData, this.dataKey, uri)
	}

	done (){
		PopUpController.done()
	}

	display (){
		PopUpController.set(this.container)
	}
}

class EditInstanceBrowser extends InstanceBrowser {
	
	init (){
		this.dataItemCache = new Object()
		this.addedUris = new Object()
		this.addedKeys = []
		$.each(this.existingData, (function(key, value){
			this.addedUris[value[this.dataKey]] = true
			this.addedKeys.push(value[this.dataKey])
		}).bind(this))
		this.loadExisting()
		super.init()
	}
	
	loadExisting (){
		
		this.tableDescriptor = {table : this.descriptor}
		var selectedTable = new SelectedTable(this, this.getDataArray(), 
				this.tableDescriptor)
		this.selectedModule.addObject(selectedTable)
		this.initUI()
	}
	
	getDataArray(){
		
		arr = []
		$.each(this.tableData, (function(key, value){
			if(value[this.dataKey] in this.addedUris){
				arr.push(value)
			}
		}).bind(this))
		return arr
	}	
	
	select (dataItem){s
		
		PopUpController.init("Please wait")
		this.formObject[this.dataKey] = dataItem.data[this.dataKey]
		this.dataItem = dataItem
		AJAX.call("addTriple", (this.selectSucces).bind(this), 
				[this.dataKey, this.formObject])
	}
	
	remove (dataItem){
		var uri = dataItem.data[this.dataKey]
		this.addedKeys.removeElement(uri)
		if(this.dataItemCache[uri] !== undefined){
			this.dataItemCache[uri].addToTable()
		}
		PopUpController.init("Please wait")
		this.formObject[this.dataKey] = dataItem.data[this.dataKey]
		this.dataItem = dataItem
		AJAX.call("removeTriple", (this.display).bind(this), 
				[this.dataKey, this.formObject])
	}
	
	selectSucces (dataItem){
		super.select(this.dataItem)
		this.display()
	}
	
	notSelected(dataItem){
		
		var uri = dataItem.data[this.dataKey]
		if(this.addedKeys.indexOf(uri) > -1){
			this.dataItemCache[uri] = dataItem
			return false
		} else {
			return true
		}
	}
	
}

