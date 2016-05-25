var InterfaceLoader = function(containerDiv){
	
	this.container = containerDiv
	this.interfaceContainer = html.div()
	this.initInterface()
	this.container.append(this.interfaceContainer)
}

InterfaceLoader.prototype = {

	// The restrictions has to explored, and it is started with the individual
	initInterface : function(){
		console.log(cachedNodes)
		$.each(nodes, (function(key, node){
			if(node.interfaceSelection != undefined){
				$.each(cachedNodes[key].possibleClasses, (function(classKey, cachedNode){
					this.interfaceContainer.append(new ClassField(key, classKey).container)
				}).bind(this))
			}
		}).bind(this))
	},
}