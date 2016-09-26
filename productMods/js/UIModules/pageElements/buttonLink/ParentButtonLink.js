

var ParentButtonLink = function(parent, configData, type){
	
	this.parent = parent
	this.configData = configData
	
	url = this.getButtonUrl()
	this.container = html.link(url)
	this.button = new LinkButton(type)
	this.container.append(this.button.container)	
}

ParentButtonLink.prototype = {
		
		getButtonUrl : function(){
			var paramMap = new Object()
			$.each(this.configData.linkDataInputs, (function(i, data){
				
				if(data.varName != undefined){
					paramMap[data.varName] = encodeURIComponent(getData(this, data))
				} else {
					paramMap[data.key] = encodeURIComponent(getData(this, data))
				}	
			}).bind(this))
			
			var href = baseUrl + this.configData.mapping + "?"
			$.each(paramMap, function(key, value){
				href += key + "=" + value + "&"
			})
			href = href.substring(0, href.length - 1)
			return href
		}
}