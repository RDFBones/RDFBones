
class InstanceSelectorWindow{
	
	constructor(formElement){
		this.formElement = formElement
		this.descriptor = formElement.descriptor.table
		this.dataKey = formElement.descriptor.dataKey
		this.dataArray = formElement.existingData
		this.formObject = dataUtil.getStrings(formElement.dataObject)
		this.selectedModule = new Module("Selected Instances")
		this.toSelectModule = new Module("Instances to select")
		this.doneButton = new TextButton("Done", (this.done).bind(this), "margin10")
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
		this.instanceBrowser = new InstanceBrowser(this, this.tableData)
		this.initUI()
	}
	
	display (){
		PopUpController.set(this.container)
	}
		
	showExisting (){
		
		this.getTableDescriptor()
	}
	
	initUI (){
		UI.append(this, [this.selectedModule, this.toSelectModule, this.doneButton])
		this.display()
	}
	
	select (dataItem){
		
		this.selectedModule.add(dataItem.container)
		this.dataArray.push(dataItem.data)
	}
	
	remove(dataItem){
		
		var uri = dataItem.data[this.dataKey]
		DataLib.removeObjectFromArrayByKey(this.dataArray, this.dataKey, uri)
	}

	done (){
		PopUpController.done()
	}

}

class EditInstanceSelectorWindow extends InstanceSelectorWindow {
	
	init (){
		this.dataItemCache = new Object()
		this.addedUris = new Object()
		this.addedKeys = []
		$.each(this.dataArray, (function(key, value){
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
	
	select (dataItem){
		
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

