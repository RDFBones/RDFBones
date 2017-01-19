
class InstanceSelector{
	
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
	
	remove(key, dataObject){
		
		console.log(key)
		console.log(dataObject)
		console.log(this.dataArray)
		DataLib.removeObjectFromArray(this.dataArray, key,  dataObject)
	}

	done (){
		PopUpController.done()
	}

}

class EditInstanceSelector extends InstanceSelector {
	
	init (){
		this.dataItemCache = new Object()
		this.addedKeys = []
		$.each(this.dataArray, (function(key, value){
			this.addedKeys.push(value[this.dataKey])
		}).bind(this))
		this.loadExisting()
		super.init()
	}	
	
	loadExisting (){
		
		this.setTableDescriptor()
		var selectedTable = new SelectedTable(this, this.getDataArray(), 
				this.tableDescriptor)
		this.selectedModule.addObject(selectedTable)
		this.initUI()
	}

	setTableDescriptor (){
		
		this.predicates = []
		var desc = this.descriptor
		while(true){
			if(desc.type == "selector" || desc.subForm === undefined){
				break
			} else {
				this.predicates.push(desc.predicate)
				desc = desc.subForm	
			}
		}
		this.tableDescriptor = desc
	}
	
	getDataArray(){
		var leafData = []
		this.setLeafData(0, this.predicates, this.tableData, leafData)
		console.log(this.addedArray)
		console.log(DataLib.getType(leafData))
		return leafData.selectObjects(this.dataKey, this.addedKeys)
	}
	
	setLeafData(n, predicates, dataArray, arrayToSet){
		
		if(n < predicates.length){
			$.each(dataArray, (function(index, value){
				this.setLeafData(n + 1, predicates, value[predicates[n]], arrayToSet)
			}).bind(this))
		} else {
			arrayToSet.push(...dataArray)
		}
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

