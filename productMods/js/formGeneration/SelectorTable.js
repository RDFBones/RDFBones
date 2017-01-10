

var SelectorTable = function(instanceBrowser, array, descriptor){
	
	this.array = array
	this.instanceBrowser = instanceBrowser
	this.descriptor = descriptor
	if(descriptor.type == "navigator"){
		this.itemToAdd = NavigationItem 
		this.check = false
	} else {
		this.itemToAdd = DataItem 
		this.check = true
	}
	this.container = html.div("selectorTableContainer")
	this.initElements()
}

SelectorTable.prototype = {
		
	initElements : function(){
		
		arr = []
		$.each(this.array, (function(index, value){
			arr.push(new this.itemToAdd(this, value, this.descriptor.table.cells).container)
		}).bind(this))
		this.container.append(arr)
	},
	
	//This is called by the NavigationItem
	navigate : function(dataObject){
		this.instanceBrowser.navigate(dataObject, this.descriptor)
	},
	
	//This is called by the DataItem 
	select : function(dataItem){
		this.instanceBrowser.select(dataItem)
	},
	
	remove : function(dataItem){
		this.instanceBrowser.instanceSelector.removeData(this.descriptor.dataKey, dataItem.data)
		this.container.append(dataItem.container)
	}
}



var SelectedTable = function(instanceBrowser, array, descriptor){
	
	SelectorTable.call(this, instanceBrowser, array, descriptor)
}

SelectedTable.prototype = Object.call(SelectorTable.prototype)

SelectedTable.prototype.select = function(){
	//Do nothing
}


