var Selector = function(dataKey, descriptor, parentForm) {

	// Data
	this.dataKey = DataController.getDataKey(dataKey, descriptor)
	this.options = DataController.getData(this.dataKey)
	
	this.descriptor = descriptor
	this.parentForm = parentForm
	this.parentData = parentForm.dataObject
	this.container =  parentForm.container
	
	// UI
	this.selector = new DataSetterSelectorFieldMap(this.options,
			this.parentData, this.dataKey)
	if (descriptor.arrangement !== undefined) {
		this.container = html.div("margin10H inline");
	} else {
		this.container = html.div("margin10H");
	}
	this.title = html.div("inline").text(descriptor.name)
	this.container.append(this.title).append(this.selector.container)
	
	if(this.parentData[this.dataKey] !== undefined){
		this.selector.set(this.parentData[this.dataKey])
	} else {
		console.log(this.options)
		this.parentData[this.dataKey] = Object.keys(this.options)[0]
	}
}

Selector.prototype = {

	changeData : function(selectedValue, text) {
		this.parentDataObject[this.dataKey] = selectedValue
	},
 }

var Adder = function(predicate, descriptor, parentForm) {
	
	this.descriptor = descriptor
	this.dataKey = descriptor.dataKey
	this.options = DataController.getData(this.dataKey)

	 	
	this.parentForm = parentForm
	this.parentData = parentForm.dataObject
	this.container =  html.div("adderContainer")
	this.cnt = 0

	if(this.parentData[predicate] !== undefined){
		this.localData = this.parentData[formDataKey]
	} else {
		this.localData = []
		this.parentData[predicate] = this.localData
	}
	this.init()
}

Adder.prototype = {

	init : function() {

		this.addedValues = []
		this.title = html.div("inline").text(this.descriptor.title)
		DataController.prepareOptions(this.options)
		this.selector = UI.classSelectorMap(this.options)
		this.addButton = new TextButton("Add", (this.add).bind(this))
		this.subContainer = html.div("subContainer")
		this.container.append(this.title).append(this.selector).append(
				this.addButton.container).append(this.subContainer)
		this.loadExistingData()
	},
	
	loadExistingData : function(array) {
		$.each(this.localData, (function(i, data){
			this.title = DataController.getLabel(data[this.dataKey]) 
			this.addSubForm(data)
		}).bind(this))
	},

	add : function(){
		var object = new Object()
		object[this.dataKey] = this.selector.val()
		object[this.dataKey + "Label"] = this.selector.find("option[value='" + this.selector.val() + "']").text()
		this.title = object[this.dataKey + "Label"] 
		this.localData.push(object)
		this.addSubForm(object)
	},
	
	addSubForm : function(object){

		if(this.descriptor.formElements !== undefined) {
			PopUpController.addSubWaitGif(this.subContainer)
			this.subForm = new Form(this, object)
		} else {
			this.subContainer.append(html.div("subElement").text(object[this.dataKey + "Label"]))
		}
	},
	
	ready : function(){
		
		if(this.cnt != 0){
			cnt--
		} else {
			PopUpController.removeWaitGif(this.subContainer, this.subForm.container)
		}
	}
}

var StringInput = function(descriptor) {

	if (descriptor.arrangement !== undefined) {
		this.container = html.div("inlineContainer inline");
	} else {
		this.container = html.div("inlineContainer");
	}
	this.title = html.div("margin10").text(descriptor.name)
	this.textBoxDiv = html.div().append(html.textBox())
	// this.textBox = html.textBox()
	this.container.append(this.title).append(this.textBoxDiv)
}

StringInput.prototype = {

}
