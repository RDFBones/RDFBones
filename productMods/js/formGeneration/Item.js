
class NavigationItem {
	
	constructor(table, data, cells){
		this.table = table
		this.data = data
		this.cells = cells	
		var buttonId = util.getNewButtonId()
		this.container = html.div("itemContainer").attr("id", buttonId)
		$(document).on("click", "#" + buttonId, (this.select).bind(this))
		this.init()
	}

	init (){
		
		if(this.cells.length == 1){
			var label = this.data[this.cells[0].dataKey]
			this.container.append(html.div("singleCell").text(label))
		} else {
			var cells = []
			$.each(this.cells, (function(i, cell) {
				cells.push(new ElementMap[cell.type](this.data, cell).container)
			}).bind(this))
			this.container.append(cells)
		}
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

class SelectedDataItem extends DataItem {

	constructor(table, data, cells){
		
		super(table, data, cells)
	}
	
	select (){
		this.table.remove(this)
		this.container.remove()
	}
	
}




