
class NavigationItem {
	
	constructor(table, data, cells){
		this.table = table
		this.data = data
		this.cells = cells	
		var buttonId = util.getNewButtonId()
		this.container = UI.getButton("itemContainer", (this.select).bind(this))
		this.init()
	}

	getContainerStyle (){
		return itemContainer
	}
	
	init (){
		
		if(this.cells.length == 1){
			var label = this.data[this.cells[0].dataKey]
			this.container.append(this.getSingleCell(label))
		} else {
			var cells = []
			$.each(this.cells, (function(i, cell) {
				cells.push(new ElementMap[cell.type](this.data, cell).container)
			}).bind(this))
			this.container.append(cells)
		}
	}
	
	getSingleCell(label){
		return html.div("singleCell").text(label)
	}
	
	select (){
		this.table.navigate(this.data)
	}
}

class DataItem extends NavigationItem {
	
	constructor(table, data, cells){

		super(table, data, cells)
		this.selected = false
	}

	init (){
		
		var cells = []
		$.each(this.cells, (function(i, cell) {
			cells.push(html.div("dataItem").text(this.data[cell.dataKey]))
			cells.push(html.div(""))
		}).bind(this))
		this.container.append(cells)
	}
	
	select (){
		
		if(!this.selected){
			this.table.select(this)
			this.selected = true
		} else {
			this.table.remove(this)
			this.selected = false
		}
	}

	addToTable (){
		this.table.container.append(this.container)
	}
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

class SelectedDataItem extends DataItem {

	constructor(table, data, cells){
		super(table, data, cells)
	}
	
	select (){
		this.table.remove(this)
		this.container.remove()
	}
}




