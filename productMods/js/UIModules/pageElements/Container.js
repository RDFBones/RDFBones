

var Container = function(configData, parent){
	
	this.container = html.div()
	this.configData = configData
	this.parent = parent
	this.setLocalData()
	this.setElements()
}

Container.prototype = {
		
	setLocalData : function(){
		
		if(this.configData.localData != undefined){
			this.localData = new Object()
			$.each(this.configData.localData, (function(i, data){
				this.localData[data.name] = DataOperationMap[data.type](this, data)
				console.log(this.localData[data.name])
			}).bind(this))
		}
	},

	setElements : function(){
		
		$.each(this.configData.elements, (function(i, element){
			this.container.append(new PageElementMap[element.type](element,this).container)
		}).bind(this))
	},
}