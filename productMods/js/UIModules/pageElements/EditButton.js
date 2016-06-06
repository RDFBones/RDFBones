


var EditButton = function(data, configData){
	
	this.localData = data
	this.configData = configData
	this.container = new PageLink("edit", this.getButtonUrl()).container
}

EditButton.prototype = {
	
	getButtonUrl : function(){
		var paramMap = new Object()
		$.each(this.configData.linkDataInputs, function(i, data){
			switch(data.type){
			case sw.global :
				paramMap[data.dataKey] = pageData[data.dataKey]
				break;
			case sw.local :
				paramMap[data.dataKey] = this.localData[data.dataKey]
				break;
			default : break;
			}
		})
		
		var href = baseUrl + "/profilePage?"
		$.each(paramMap, function(key, value){
			href += key + "=" + value
		})
		return href
	}
}