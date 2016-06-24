

var ParentButtonLink = function(parent, configData, type){
	
	this.parent = parent
	this.configData = configData
	
	this.container = html.link(this.getButtonUrl())
	this.button = new LinkButton(type)
	this.container.append(this.button.container)	
}

ParentButtonLink.prototype = {
		
		getButtonUrl : function(){
			var paramMap = new Object()
			$.each(this.configData.linkDataInputs, (function(i, data){
				
				if(data.varName != undefined){
					paramMap[data.varName] = DataOperationMap[data.type](this, data)
				} else {
					paramMap[data.varName] = DataOperationMap[data.type](this, data)
				}	
			}).bind(this))
			
			var href = baseUrl + this.configData.mapping + "?"
			$.each(paramMap, function(key, value){
				href += key + "=" + value
			})
			return href
		}
}