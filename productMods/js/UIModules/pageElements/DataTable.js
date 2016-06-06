

var DataTable = function(configData){
	
	this.configData = configData
	
	this.container = html.div()
	this.loadTableHeader()
	this.loadTableData()
}

DataTable.prototype = {

		
	loadTableHeader : function(){
		$.each(this.configData.dataFields, function(j, field){
			
		})	
	},
		
	loadTableData : function(){
		var column = []
		$.each(pageData[this.configData.dataKey], (function(i, data){
			//Iterate on each field now
			var row = html.div("tableRow")
			$.each(this.configData.dataFields, function(j, field){
				row.append(new RowElementMap[field.type](data, field).container)
			})
			column.push(row)
		}).bind(this))
		this.container.append(column)
	}
}