

class InputSelector {
	
	constructor(item, possibleInstances, selectedInstances){

		this.item = item
		this.saved = false
		this.container = html.div()
		this.selectedModule = new Module("Selected Instances")
		this.toSelectModule = new Module("Instances to select")
		
		this.doneButton = new TextButton("Done", (this.done).bind(this), "margin10")
		
		
		this.rows = new Object()
		//Adding possible instance
		$.each(possibleInstances, (function(index, value){
			var tableRow = new TableRow(this, value, dataDescriptor);
			this.rows[value[dataDescriptor.key]] = tableRow;
			this.selectedModule.add(tableRow)
		}).bind(this))

		//Adding added field
		$.each(selectedInstances, (function(index, value){
			this.rows[value[dataDescriptor.key]].select()
		}).bind(this))
		UI.append(this, [this.selectedModule, this.toSelectModule, this.doneButton])
		PopUpController.set(this.container)
	}
	
	add(tableRow, measurementDatum){
		this.selectedModule.add(tableRow.container)
		this.item.addInput(measurementDatum)
	}
	
	remove(tableRow, measurementDatum){
		this.toSelectModule.add(tableRow.container)
		this.item.removeInput(measurementDatum)
	}
	
	display (){
		//Can be called from outside
		PopUpController.set(this.container)
	}
	
	done (){
		PopUpController.done()
	}
}


var dataDescriptor = {
	
	key : "inputInstance",
	columns : [{
		type : "classLabel",
		key : "inputTypeLabel",
		secondary : "inputType",
	}, {
		type : "multiple",
		keys : ["inputValue", "inputLabel"],
	}]
}