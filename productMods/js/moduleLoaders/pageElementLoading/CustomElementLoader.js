
var TabContainerLoader = function(root, dataObject){
	
	this.dataObject = dataObject
	this.root = root
	this.varName = "tab"
	this.setVars()
}

TabContainerLoader.prototype = Object.create(PageElementLoader.prototype)


var TabLoader = function(root, dataObject){
	
	this.dataObject = dataObject
	this.root = root
	this.varName = "element"
	this.setVars()
}

TabLoader.prototype = Object.create(PageElementLoader.prototype)

var DataTableLoader = function(root, dataObject){
	
	this.dataObject = dataObject
	this.root = root
	this.varName = "dataField"
	this.setVars()
}

TabContainerLoader.prototype = Object.create(PageElementLoader.prototype)


var LiteralLoader = function(root, elementArray, pageElement){
	
	this.root = root
	this.dataObject = dataObject	
	this.varName = "literal"
	this.setVars()
}

LiteralLoader.prototype = Object.create(PageElementLoader.prototype)

//This is a final element
LiteralLoader.prototype.getElements = function(){
	//We do nothing
	this.root.removeFromQueue()
}
