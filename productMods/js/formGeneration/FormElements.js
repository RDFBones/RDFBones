var Selector = function(dataKey, descriptor, formData, parentForm) {

	// Data
	this.dataKey = descriptor.dataKey
	this.options = formData[this.dataKey]
	
	this.descriptor = descriptor
	this.parentForm = parentForm
	this.parentData = parentForm.dataObject
	this.container =  parentForm.container

	
	
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

var Adder = function(predicate, descriptor, formData, parentForm) {
	
	this.descriptor = descriptor
	this.dataKey = descriptor.dataKey
	this.options = formData[this.dataKey]
	this.parentForm = parentForm
	this.parentData = parentForm.dataObject
	this.container =  html.div("adderContainer")
	this.cnt = 0
	this.addingAll = false
	this.subForms = []
	if(this.parentData[predicate] !== undefined){
		this.localData = this.parentData[predicate]
		if(this.localData.length > 0){
			parentForm.existingCounter++
		}
		this.existingLoad = true
	} else {
		this.existingLoad = false
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
		this.addAllButton = new TextButton("Add all", (this.addAll).bind(this))
		this.subContainer = html.div("subContainer")
		this.container.append(this.title).append(this.selector).append(
				this.addButton.container).append(this.addAllButton.container)
				.append(this.subContainer)
		//Loading existing data if it is some
		$.each(this.localData, (function(i, object){
			this.title = DataController.getLabel(this.options, object[this.dataKey]) 
			if(this.descriptor.formElements !== undefined) {
				this.cnt++
				this.subForms.push(new Form(this, object))
			} else {
				this.subContainer.append(html.div("subElement").text(object[this.dataKey + "Label"]))
			}
		}).bind(this))
		if(this.localData.length > 0 && this.descriptor.formElements === undefined){
			this.parentForm.ready()
		}
	},
	
	add : function(){
		if(this.addAllFlag){
			PopUpController.note("All types have been already added!")
		} else if(this.localData.getObjectByKey(this.dataKey, this.selector.val()) != null){
			var text = this.selector.find("option[value='" + this.selector.val() + "']").text()
			PopUpController.note(text + " have already been added!");
		} else {
			var object = new Object()
			object[this.dataKey] = this.selector.val()
			object[this.dataKey + "Label"] = this.selector.find("option[value='" + this.selector.val() + "']").text()
			this.title = object[this.dataKey + "Label"] 
			this.localData.push(object)
			this.addSubForm(object)			
		}
	},
	
	addAll : function(){
		
		var arr = []
		this.addAllFlag = true
		PopUpController.addSubWaitGif(this.subContainer)
		$.each(this.options, (function(key, value){
			if(this.localData.getObjectByKey(this.dataKey, key) == null){
				var object = new Object()
				object[this.dataKey] = key
				object[this.dataKey + "Label"] = value.label
				this.localData.push(object)
				this.title = value.label
				this.subForms.push(new Form(this, object))
				this.cnt++
			}
		}).bind(this))
		if(this.cnt == 0){
			PopUpController.remove()
			PopUpController.note("All types have been already added!")
		}
	},
	
	addSubForm : function(object){

		if(this.descriptor.formElements !== undefined) {
			this.cnt++
			PopUpController.addSubWaitGif(this.subContainer)
			this.subForms.push(new Form(this, object))
		} else {
			this.subContainer.append(html.div("subElement").text(object[this.dataKey + "Label"]))
		}
	},
	
	ready : function(){
		
		this.cnt--
		if(this.cnt == 0){
			if(this.existingLoad){
				this.addSubForms()
				this.parentForm.ready()
				this.existingLoad = false
			} else if(this.addAllFlag){
				this.addSubForms()
				PopUpController.remove()
			} else {
				PopUpController.removeWaitGif(this.subContainer, this.subForms[this.subForms.length - 1].container)
			}
		}
	},
	
	addSubForms : function(){
		
		$.each(this.subForms, (function(i, subForm){
			this.subContainer.append(subForm.container)
		}).bind(this))
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
