
class InputSelectorTable {
	
	constructor(inputSelector, options){

		this.container = html.div()
		this.inputSelector = inputSelector
		this.rowMap = new Object()
		this.rows = []
		$.each(options, (function(i, value){
			var tableRow = new DTTableRow(this, value)
			this.rowMap[value.measurementDatum] = tableRow
			this.rows.push(tableRow.container)
		}).bind(this))
		this.container.append(this.rows)
	}
}

class DTTableRow {
	
	constructor(inputSelectorTable, dataSet, descritor){
		
		this.selected = false
		this.inputSelectorTable = inputSelectorTable
		this.measurementDatum = dataSet.measurementDatum

		//?measurementDatum ?measurementDatumLabel ?typeLabel ?cardinality ?catLabel ?literalValue
		this.label = html.div("dataItem").text(dataSet.measurementDatumLabel)

		var rows = []
		
		if(dataSet.catLabel != undefined ){
			this.measurementValue = html.div("dataItem").text(dataSet.catLabel)
		} else if(dataSet.measurementValue != undefined) {
			this.measurementValue = html.div("dataItem").text(dataSet.measurementValue)
		} else {
			this.measurementValue = html.div("dataItem").text("undefined")
		}
		
		this.container = UI.getButton("itemContainer", (this.select).bind(this))
		this.container.append([this.label, this.measurementValue])
	}
	
	select(existing){
		if(this.selected){
			this.inputSelectorTable.inputSelector.remove(this, this.measurementDatum, existing)
			this.selected = false
		} else {
			this.inputSelectorTable.inputSelector.add(this, this.measurementDatum, existing)
			this.selected = true
		}
	}
}