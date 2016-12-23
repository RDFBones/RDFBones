
var InstanceSelector = function(form, descriptor, selected, selectable){
	
	this.descriptor = descriptor.table
	this.dataKey = descriptor.dataKey
	this.selected = selected
	this.selectable = selectable
	this.form = form
	PopUpController.init("Loading data ");
	this.container = html.div()
	this.instanceRows = []
	this.dataObject = form.existingData
	this.init()
}

InstanceSelector.prototype = {
		
	init : function(){
		
		arrayutil.subtract(this.selectable, this.selected)
		this.array = this.selected.concat(this.selectable);
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
		if(this.selected.length == 0){
			this.container.append(this.selectableTable.container)
		}

		this.doneButton = new TextButton("Done", (this.done).bind(this), "margin10");
		this.container.append(this.doneButton.container)
		PopUpController.set(this.container)
	},
	
	display : function(){
		console.log("Display")
		PopUpController.set(this.container)
	},
	
	done : function(){
		
		console.log(this.instanceRows)
		$.each(this.instanceRows, (function(i, instanceRow){
			if(instanceRow.added){
				this.form.existingData.push(instanceRow.data)
			}
		}).bind(this))
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
			if(this.selected.indexOf(value[this.dataKey]) > -1){
				this.selectedData.push(value)
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