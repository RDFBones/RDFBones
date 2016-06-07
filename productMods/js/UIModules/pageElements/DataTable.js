

var DataTable = function(configData){
	
	this.configData = configData
	this.container = html.div("dataTable")
	if(configData.title != undefined){
		this.title = html.div("title").text(configData.title)
	} else {
		this.title = html.div()
	}
	this.header = html.div("tableHeader")
	this.content = html.div("contentContainer")
	this.loadTableHeader()
	this.loadTableData()
	this.container
				.append(this.title)
				.append(this.header)
				.append(this.content)
}

DataTable.prototype = {

	loadTableHeader : function(){
		$.each(this.configData.dataFields, (function(j, field){
			if(field.type != sw.editButton){
					this.header.append(html.div("tableTitle").text(field.title))
			}
		}).bind(this))
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
		this.content.append(column)
	}
}