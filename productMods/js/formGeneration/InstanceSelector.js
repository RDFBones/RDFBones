
var InstanceSelector = function(formElement){
	
	this.formElement = formElement
	this.descriptor = formElement.descriptor.table
	this.dataKey = formElement.descriptor.dataKey
	this.dataArray = formElement.existingData
	this.selectedModule = new Module("Selected Instances")
	this.toSelectModule = new Module("Instances to select")
	this.doneButton = new TextButton("Done", (this.done).bind(this), "margin10")
	if(this.dataArray.length > 0){
		this.showExisting()
	} else {
		PopUpController.init("Loading data ")
		this.init()
	}
}

InstanceSelector.prototype = {
		
	loadExisting : function(){
	
		tableDescriptor = this.getObject(this.descriptor)
		selectedTable = SelectedTable(this, this.dataArray, tableDescriptor)
		this.toSelectModule.container.hide()
		this.selectedModule.add(selectedTable.container)
		this.initUI()
	},

	getTableDescriptor : function(descriptor){
		
		if(descriptor.type === "navigate"){
			return this.getTableDescriptor(descriptor.subForm)
		} else {
			return descriptor
		}
	},
	
	display : function(){
		PopUpController.set(this.container)
	},
		
	init : function(){
		
		AJAX.call("formGraphData", (function(msg){
			array = msg.tableData 
			this.instanceBrowser = new InstanceBrowser(this, array, this.descriptor)
			this.initUI()
		}).bind(this),  DataController.getGraphDataParams(this))
	},
	
	initUI : function(){
		UI.append(this, [this.selectedModule, this.toSelectModule, this.doneButton])
		PopUpController.set(this.container)
	},
	
	select : function(dataItem){
		
		this.selectedModule.add(dataItem.container)
		this.dataArray.push(dataItem.data)
	},
	
	removeData : function(key, dataObject){
		
		console.log(key)
		console.log(dataObject)
		console.log(this.dataArray)
		DataLib.removeObjectFromArray(this.dataArray, key,  dataObject)
	},
	
	deselect : function(){
		
	},
	
	done : function(){
		PopUpController.done()
	}
}