class SelectorTable {
	
	constructor(instanceBrowser, array, descriptor){
		this.array = array
		this.instanceBrowser = instanceBrowser
		this.instanceSelector = instanceBrowser.instanceSelector
		this.dataKey = instanceBrowser.instanceSelector.descriptor.dataKey
		this.descriptor = descriptor
		if(this.instanceSelector instanceof EditInstanceSelector){
			this.check = true
		}
		this.initElements()
	}

	initElements (){
		
		this.container = html.div("selectorTableContainer")
		var arr = []
		if(this.descriptor.type == "navigator"){
			this.addNavigationItems(arr)
		} else {
			if(this.check == true){
				this.addDataItemsCheck(arr)
			} else {
				this.addDataItems(arr)
			}
		}
		this.container.append(arr)
	}
	
	addNavigationItems(arr){
		$.each(this.array, (function(index, value){
			arr.push(new NavigationItem(this, value, this.descriptor.table.cells).container)
		}).bind(this))
	}
	
	addDataItemsCheck(arr){
		arr.push(new TableTitle(this.descriptor.table.cells).container)
		$.each(this.array, (function(index, value){
			var dataItem = new DataItem(this, value, this.descriptor.table.cells)
			if(this.instanceSelector.notSelected(dataItem)){
				arr.push(dataItem.container)	
			}
		}).bind(this))
	}
	
	addDataItems(){
		arr.push(new TableTitle(this.descriptor.table.cells).container)
		$.each(this.array, (function(index, value){
			arr.push(new DataItem(this, value, this.descriptor.table.cells).container)	
		}).bind(this))
	}
	
	
	//This is called by the NavigationItem
	navigate (dataObject){
		this.instanceBrowser.navigate(dataObject, this.descriptor)
	}
	
	//This is called by the DataItem 
	select (dataItem){
		this.instanceSelector.select(dataItem)
	}
	
	remove (dataItem){
		this.instanceSelector.remove(dataItem)
		this.container.append(dataItem.container)
	}
}

class EditSelectorTable extends SelectorTable { 

	getContainer (){
		
	}
	
	remove (dataItem){
		this.instanceSelector.remove(dataItem)
	} 

	initElements (){
		
		arr = []
		$.each(this.array, (function(index, value){
			arr.push(new this.itemToAdd(this, value, this.descriptor.table.cells).container)
		}).bind(this))
		this.container.append(arr)
	}
}

class SelectedTable { 
	
	constructor(instanceSelector, array, descriptor){
		
		this.array = array
		this.instanceSelector = instanceSelector
		this.dataKey = descriptor.dataKey
		this.descriptor = descriptor
		this.initElements()
	}
	
	remove(dataItem){
		this.instanceSelector.remove(dataItem)
	}
	
	initElements(){
		this.container = html.div("selectorTableContainer")
		arr = []
		$.each(this.array, (function(index, value){
			arr.push(new SelectedDataItem(this, value, this.descriptor.table.cells).container)
		}).bind(this))
		this.container.append(arr)
	}
	
}

