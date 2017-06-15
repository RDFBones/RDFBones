
class TableRow {
	
	constructor(inputSelector, dataObject, descriptor){
		
		this.selected = false
		this.inputSelectorTable = inputSelectorTable
		this.measurementDatum = dataSet.measurementDatum

		var rows = []
		$.each(descriptor.columns, function(index, column){
			var text
			if(column.type == "classLabel"){
				if(dataObject[column.key] === undefined){
					text = this.process(dataObject[column.secondary])
				} else {
					text = dataObject[column.key]
				}
			} else if(column.type == "multiple"){
				$.each(column.keys, function(index, key){
					if(dataObject[key] != null){
						text = dataObject[key]
						return false
					}
				})
			}
			rows.append(html.div("dataItem").text(text))
		})
		this.container = UI.getButton("itemContainer", (this.select).bind(this))
		this.container.append([this.label, this.measurementValue])
	}
	
	select(){
		
		if(this.selected){
			this.inputSelector.remove(this, this.dataObject)
			this.selected = false
		} else {
			this.inputSelectorTable.inputSelector.add(this, this.measurementDatum)
			this.selected = true
		}
	}
	
	process(input){
			
		if(input === undefined){
			return "undefined"
		} else{
			var str = input.split("#")[1]
			if(str == undefined) str = "undefined"
			str = str.replace(".", " ")
			return str.replace("_", " ")
		}
	}
}