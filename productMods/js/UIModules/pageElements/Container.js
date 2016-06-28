

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
				this.localData[data.key] = DataOperationMap[data.type](this, data)
			}).bind(this))
		}
	},

	setElements : function(){
		if(this.configData.elements != undefined){
			$.each(this.configData.elements, (function(i, element){
				this.container.append(new PageElementMap[element.type](element,this).container)
			}).bind(this))			
		}
	},
}