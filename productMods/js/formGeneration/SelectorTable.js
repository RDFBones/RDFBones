class SelectorTable {
	
	constructor(instanceBrowser, array, descriptor){
		this.array = array
		this.instanceBrowser = instanceBrowser
		this.dataKey = instanceBrowser.dataKey
		this.descriptor = descriptor
		this.initUI()
	}

	initUI (){
		this.container = html.div("selectorTableContainer")
		this.arr = []
		this.initElements()
		this.container.append(this.arr)
	}
	
	initElements (){
		this.arr.push(new TableTitle(this.descriptor.cells).container)
		$.each(this.array, (function(index, value){
			var dataItem = new DataItem(this, value, this.descriptor.cells)
			var uri = value[this.dataKey]
			this.instanceBrowser.elementCache[uri] = dataItem
			this.arr.push(dataItem.container)	
		}).bind(this))
	}
}

class SelectedTable extends SelectorTable{  
	
	initElements(){

		$.each(this.array, (function(index, value){
			this.arr.push(new SelectedDataItem(this, value, this.descriptor.cells).container)
		}).bind(this))
	}
	
	remove (){
		this.instanceBrowser.removeForeing()
	}
	
}

