var InterfaceLoader = function(containerDiv){
	
	this.container = containerDiv
	this.interfaceContainer = html.div()
	this.initInterface()
	this.container.append(this.interfaceContainer)
	
}

InterfaceLoader.prototype = {

	// The restrictions has to explored, and it is started with the individual
	initInterface : function(){

		$.each(nodes, (function(key, node){
			if(node.interfaceSelection != undefined){
				$.each(processedNodes[key].possibleClasses, (function(classKey, cachedDef){
					this.interfaceContainer.append(new ClassField(key, classKey).container)
				}).bind(this))
			}
		}).bind(this))
	},
}