

var LinkRow = function(parent, configData, localData){
	
	Row.call(this, parent, configData, localData)
}

LinkRow.prototype = Object.create(Row.prototype)

LinkRow.prototype.getContainer = function(){
	 return html.link((this.getLinkUri).bind(this), "linkTableRow") 
},
	
LinkRow.prototype.getLinkUri = function(){
		
	var paramMap = new Object()
	$.each(this.configData.linkDataInputs, (function(i, data){
		
		if(data.varName != undefined){
			paramMap[data.varName] = getData(this, data)
		} else {
			paramMap[data.key] = getData(this, data)
		}	
	}).bind(this))
	
	var href = baseUrl + this.configData.mapping + "?"
	$.each(paramMap, function(key, value){
		href += key + "=" + value + "&"
	})
	href = href.substring(0, href.length - 1)
	return href
}


