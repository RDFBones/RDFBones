var LinkDataTable = function(configData){
	
	DataTable.call(this, configData)
}

LinkDataTable.prototype = Object.create(DataTable.prototype)

LinkDataTable.prototype.loadTableData = function(){
		var column = []
		$.each(pageData[this.configData.dataKey], (function(i, data){
			//Iterate on each field now
			var row = html.div("linkTableRow")
			var link = this.getLink(data)
			row.append(link)
			$.each(this.configData.dataFields, function(j, field){
				link.append(new RowElementMap[field.type](data, field).container)
			})
			column.push(row)
		}).bind(this))
		this.content.append(column)
	}

LinkDataTable.prototype.getLink = function(localData){
	
	var paramMap = new Object()
	$.each(this.configData.linkDataInputs, (function(i, data){
		switch(data.type){
		case sw.global :
			paramMap[data.dataKey] = pageData[data.dataKey]
			break;
		case sw.local :
			paramMap[data.dataKey] = localData[data.dataKey]
			break;
		default : break;
		}
	}).bind(this))
	
	var href = baseUrl + "customPageLoad?"
	$.each(paramMap, function(key, value){
		href += key + "=" + value
	})
	return html.link(href)
	
}