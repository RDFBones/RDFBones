

var SelectorTable = function(instanceBrowser, array, descriptor){
	
	this.array = array
	this.instanceBrowser = instanceBrowser
	this.instanceSelector = instanceBrowser.instanceSelector
	this.dataKey = instanceBrowser.instanceSelector.descriptor.dataKey
	this.descriptor = descriptor
	if(this.instanceSelector instanceof EditInstanceSelector){
		this.check = true
	}
	
	this.container = html.div("selectorTableContainer")
	this.initElements()
}

SelectorTable.prototype = {
		
	initElements : function(){
		
		if(this.descriptor.type == "navigator"){
			arr = []
			$.each(this.array, (function(index, value){
				arr.push(new NavigationItem(this, value, this.descriptor.table.cells).container)
			}).bind(this))
			this.container.append(arr)
		} else {
			arr = []
			if(this.check == true){
				$.each(this.array, (function(index, value){
					var dataItem = new DataItem(this, value, this.descriptor.table.cells)
					if(this.instanceSelector.addedKeys.indexof(value[this.dataKey]) == -1){
						arr.push(dataItem.container)	
					}
				}).bind(this))
			} else {
				$.each(this.array, (function(index, value){
					arr.push(new DataItem(this, value, this.descriptor.table.cells).container)	
				}).bind(this))
			}
			this.container.append(arr)
		}
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

var EditSelectorTable = function(instanceBrowser, array, descriptor){
	
	SelectorTable.call(this, instanceBrowser, array, descriptor)
	this.instanceSelector = instanceBrowser.instanceSelector;
}

EditSelectorTable.prototype = $.extend(Object.create(SelectorTable.prototype), {
	
	getContainer : function(){
		
	},
	
	remove : function(dataItem){
		
		this.instanceSelector.removeExisting 
	},
	
	initElements : function(){
		
		arr = []
		$.each(this.array, (function(index, value){
			arr.push(new this.itemToAdd(this, value, this.descriptor.table.cells).container)
		}).bind(this))
		this.container.append(arr)
	},
	
})


