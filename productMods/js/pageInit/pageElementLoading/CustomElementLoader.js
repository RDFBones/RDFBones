
var TabContainerLoader = function(root, dataObject){
	
	this.dataObject = dataObject
	this.root = root
	this.varName = "tab"
	this.setVars()
	console.log("tabContainerLoader")
}

TabContainerLoader.prototype = Object.create(PageElementLoader.prototype)

var TabLoader = function(root, dataObject){
	this.dataObject = dataObject
	this.root = root
	this.varName = "element"
	this.setVars()
	console.log("tabLoader")
}

TabLoader.prototype = Object.create(PageElementLoader.prototype)

var DataContainerLoader = function(root, dataObject){
	
	this.dataObject = dataObject
	this.root = root
	this.varName = "dataField"
	this.setVars()
	console.log("dataContainerLoader")
}

DataContainerLoader.prototype = Object.create(PageElementLoader.prototype)


var EditButtonLoader = function(root, dataObject){
	
	this.dataObject = dataObject
	this.root = root
	this.varName = "linkDataInput"
	this.setVars()
	console.log("editButtonLoader")
}

EditButtonLoader.prototype = Object.create(PageElementLoader.prototype)


var LiteralLoader = function(root, dataObject){
	
	this.root = root
	this.dataObject = dataObject	
	this.varName = "literal"
	this.setVars()
	console.log("literalLoader")
}

LiteralLoader.prototype = Object.create(PageElementLoader.prototype)

//This is a final element
LiteralLoader.prototype.getElements = function(){
	//We do nothing
}

var LinkDataInputLoader = function(root, dataObject){
	this.root = root
	this.dataObject = dataObject	
	this.varName = "buttonData"
	this.setVars()
	console.log("linkDataInputLoader")
}

LinkDataInputLoader.prototype = Object.create(PageElementLoader.prototype)

//This is a final element
LinkDataInputLoader.prototype.getElements = function(){
	//We do nothing
}

