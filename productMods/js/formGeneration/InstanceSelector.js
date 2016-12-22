
var InstanceSelector = function(form, descriptor, selected, selectable){
	
	this.array = selected.concat(selectable);
	this.descriptor = descriptor.table
	this.dataKey = descriptor.dataKey
	this.selected = selected
	this.selectAble = selectable
	PopUpController.init("Loading data ");
	this.container = html.div()
	this.init()
}

InstanceSelector.prototype = {
	
	init : function(){
	
		this.orderCells(this.descriptor.cells)
		console.log(this.descriptor.cells)
		$.ajax(AJAX.formGraphData(this.array, this.dataKey))
			.done((function(msg){
				AJAX.errorhandling(msg)
				this.show(msg.tableData)
			}).bind(this))
	},
	
	show : function(data){
		
		this.prepare(data)
		this.selectedTable = new DataTable(this, "Selected instances", this.descriptor,
				this.selectedData, true)
		this.selectableTable = new DataTable(this, "Instances to select", this.descriptor,
				this.selectableData, false)
		this.container.append(this.selectedTable.container)
		this.container.append(this.selectableTable.container)
		
		this.doneButton = new TextButton("Done", (this.done).bind(this), "margin10");
		this.container.append(this.doneButton.container)
		PopUpController.set(this.container)
	},
	
	done : function(){
		PopUpController.done()
	},
	
	select : function(instanceRow){
		
		if(instanceRow.added){
			this.selectedTable.add(instanceRow)
			
		} else {
			this.selectableTable.add(instanceRow)
		}
	},
	
	prepare : function(data){
	
		this.selectedData = []
		this.selectableData = []
		$.each(data, (function(i, value){
			if(this.selected.indexOf(data[this.dataKey]) > -1){
				this.selectedData.add(value)
			} else {
				this.selectableData.push(value)
			}
		}).bind(this))
	},
	
	orderCells : function(cells){
		ordered = []
		$.each(cells, function(i, cell){
			ordered[cell.num - 1] = cell	
		})
		cells = ordered
	}
}