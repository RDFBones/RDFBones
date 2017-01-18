
class InstanceSelector{
	
	constructor(formElement){
		this.formElement = formElement
		this.descriptor = formElement.descriptor.table
		this.dataKey = formElement.descriptor.dataKey
		this.dataArray = formElement.existingData
		this.selectedModule = new Module("Selected Instances")
		this.toSelectModule = new Module("Instances to select")
		this.doneButton = new TextButton("Done", (this.done).bind(this), "margin10")
		PopUpController.init("Loading data ")
		this.init()
	}

	init (){
		
		AJAX.call("formGraphData", (function(msg){
			this.instanceBrowser = new InstanceBrowser(this, msg.tableData)
			this.initUI()
		}).bind(this),  DataController.getGraphDataParams(this))
	}
		
	loadExisting (){
	
		tableDescriptor = this.getTableDescriptor()
		selectedTable = SelectedTable(this, this.dataArray, tableDescriptor)
		this.toSelectModule.container.hide()
		this.selectedModule.add(selectedTable.container)
		this.initUI()
	}

	getTableDescriptor (){
		
		var desc = this.descriptor
		while(true){
			if(desc.type == "selector" || desc.subForm === undefined){
				break
			} else {
				desc = desc.subForm	
			}
		}
		return desc
	}
	
	display (){
		PopUpController.set(this.container)
	}
		
	showExisting (){
		
		//this.instanceBrowser = new InstanceBrowser(this, array, this.descriptor)
		//this.initUI()
		// Getting the descriptor	
		this.getTableDescriptor()
	}
	
	initUI (){
		UI.append(this, [this.selectedModule, this.toSelectModule, this.doneButton])
		PopUpController.set(this.container)
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
	
	deselect (){
	
	}
	
	done (){
		PopUpController.done()
	}
}

class EditInstanceSelector extends InstanceSelector {
	
	init (){
		this.dataItemCache = new Object()
		this.addedKeys = []
		$.each(this.dataArray, function(key, value){
			this.addedKeys.push(value[this.dataKey])
		})
		super.init()
	}	
	
	remove (dataObject){

		var uri = dataObject[this.dataKey]
		this.addedKeys.removeElement(uri)
		if(this.dataItemCache[uri] !== undefined){
			this.dataItemCache[uri].addToTable()
		}
	}
}

