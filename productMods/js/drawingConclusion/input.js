

class InputSelector {
	
	constructor(item, inputOptions, existingData){
		
		this.item = item
		this.saved = false
		this.container = html.div()
		this.selectedModule = new Module("Selected Instances")
		this.toSelectModule = new Module("Instances to select")
		
		this.doneButton = new TextButton("Done", (this.done).bind(this), "margin10")
		this.selectorTable = new InputSelectorTable(this, inputOptions)
		this.toSelectModule.table.append(this.selectorTable.container)
		
		$.each(existingData, (function(i, value){
			this.selectorTable.rowMap[value.input].select(true)
		}).bind(this))
		
		UI.append(this, [this.selectedModule, this.toSelectModule, this.doneButton])
		PopUpController.set(this.container)
	}
	
	add(tableRow, measurementDatum, existing){
		this.selectedModule.table.append(tableRow.container)
		if(existing != true)	this.item.addInput(measurementDatum)
	}
	
	remove(tableRow, measurementDatum, existing){
		this.toSelectModule.table.append(tableRow.container)
		if(existing != true)	this.item.removeInput(measurementDatum)
	}
	
	display (){
		//Can be called from outside
		PopUpController.set(this.container)
	}
	
	done (){
		PopUpController.done()
	}
}
