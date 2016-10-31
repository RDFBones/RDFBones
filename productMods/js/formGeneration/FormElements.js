
var Selector = function(descriptor, parentForm){

	this.descriptor = descriptor
	this.options = DataController.getData(this)
	if(descriptor.arrangement !== undefined){
		this.container = html.div("margin10 inline");
	} else {
		this.container = html.div("margin10");
	}	this.title = html.div("inline").text(descriptor.name)	
	this.selector = UI.classSelector(this.options)
	this.container
		.append(this.title)
		.append(this.selector)
}

Selector.prototype = {

	initSelector : function(){
		
	}
}

var Adder = function(descriptor, parentForm){

	this.descriptor = descriptor
	this.parentForm = parentForm
	this.parentDataObject = parentForm.dataObject
	
	this.dataObject = new Object()
	this.parentDataObject[this.descriptor.dataKey] = []
	this.dataArray = this.parentDataObject[this.descriptor.dataKey]	

	//Before this point the data is already loaded by AJAX
	this.options = DataController.getData(this)
	this.init()
}

Adder.prototype = {

	init : function(){
		
		//Later implemented the handling of the
		// if(this.descriptor.style === "offerAll"){
		
		this.addedValues = []
		if(this.descriptor.arrangement !== undefined){
			this.container = html.div("margin10 inline");
		} else {
			this.container = html.div("margin10");
		}
	   	this.title = html.div("inline").text(this.descriptor.name)	
		this.selector = UI.classSelectorMap(this.options)
		this.addButton = new TextButton("Add", (this.addSubForm).bind(this))
		this.subContainer = html.div("subContainer")	
		this.container
			.append(this.title)
			.append(this.selector)
			.append(this.addButton.container)
			.append(this.subContainer)
	},
		
	addSubForm : function(){
		
		//Setting Data
		var object = {
				dataKey : this.descriptor.dataKey,
				uri : this.selector.val(),
				label : this.selector.find("option[value='" + this.selector.val() + "']").text()
			}
		this.dataArray.push(object)
		
		if(this.descriptor.subform !== undefined){
			new SubForm(this, object)
		} else {
			//Simple added div
			this.subContainer.append(html.div("subElement").text(object.label))
		}	
	}
}

var StringInput = function(descriptor){
	
	if(descriptor.arrangement !== undefined){
		this.container = html.div("inlineContainer inline");
	} else {
		this.container = html.div("inlineContainer");
	}
	this.title = html.div("margin10").text(descriptor.name)
	this.textBoxDiv = html.div().append(html.textBox())
	//this.textBox = html.textBox()
	this.container
		.append(this.title)
		.append(this.textBoxDiv)
}

StringInput.prototype = {
		

}
