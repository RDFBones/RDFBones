
var NavigationItem = function(table, data, cells){
	
	this.table = table
	this.data = data
	this.cells = cells	
	var buttonId = util.getNewButtonId()
	this.container = html.div("itemContainer").attr("id", buttonId)
	$(document).on("click", "#" + buttonId, (this.select).bind(this))
	this.init()
}

NavigationItem.prototype = {
		
	init : function(){
		
		if(this.cells.length == 1){
			label = this.data[this.cells[0].dataKey]
			this.container.append(html.div("singleCell").text(label))
		} else {
			cells = []
			$.each(this.cells, (function(i, cell) {
				cells.push(new ElementMap[cell.type](this.data, cell).container)
			}).bind(this))
			this.container.append(cells)
		}
	},
	
	select : function(){
		this.table.navigate(this.data)
	}
}

var DataItem = function(table, data, cells){

	NavigationItem.call(this, table, data, cells)	
	this.selected = false
}

DataItem.prototype = $.extend(Object.create(NavigationItem.prototype),
{
	select : function(){
		
		if(!this.selected){
			this.table.select(this)
			this.selected = true
		} else {
			this.table.remove(this)
			this.selected = false
		}
	}	
})
