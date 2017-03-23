
class DataItem {
	
	constructor(table, data, cells){
		this.table = table
		this.instanceBrowser = table.instanceBrowser
		this.data = data
		this.cells = cells	
		this.selected = false
		this.container = UI.getButton(this.style(), (this.select).bind(this))
		this.init()
	}
	
	style () { return "itemContainer" }
	
	init (){
		var cells = []
		$.each(this.cells, (function(i, cell) {
			cells.push(html.div("dataItem").text(this.data[cell.dataKey]))
		}).bind(this))
		this.container.append(cells)
	}

	addToTable(){
		this.table.container.append(this.container)
	}
	
	select (){
		
		if(this.selected){
			this.instanceBrowser.remove(this)
			this.table.container.append(this.container)
			this.selected = false
		} else {
			this.instanceBrowser.select(this)
			this.selected = true
		}
	}
}

class SelectedDataItem extends DataItem {

	select (){
		this.instanceBrowser.removeForeign(this.data)
		this.container.remove()
	}
	
	style () { return "itemContainer foreignItem" }

}

class TableTitle {

	constructor(cells){
		this.container = html.div("tableTitleContainer")
		arr = []
		$.each(cells, function(i, cell){
			arr.push(html.div("tableTitleItem").text(cell.title))
		})
		this.container.append(arr)
	}
}




