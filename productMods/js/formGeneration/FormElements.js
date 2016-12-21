
var FormElement = function(form, descriptor, formOptions, predicate){
	
	this.form = form
	this.descriptor = descriptor
	this.dataKey = descriptor.dataKey
	this.options = DataController.prepareOptions(formOptions[this.dataKey])
	this.predicate = predicate
	this.dataObject = form.dataObject
	this.initUI()
	this.initData()
}

FormElement.prototype = {}

var Selector = function(form, descriptor, formOptions, predicate) {

	FormElement.call(this, form, descriptor, formOptions, predicate)
}

Selector.prototype = $.extend(Object.create(FormElement.prototype),{

	initUI : function(){
		this.selector = new DataSetterSelectorFieldMap(this.options,
				this.parentData, this.dataKey)
		if (this.descriptor.arrangement !== undefined) {
			this.container = html.div("margin10H inline");
		} else {
			this.container = html.div("margin10H");
		}
		this.title = html.div("inline").text(this.descriptor.name)
		this.container.append(this.title).append(this.selector.container)
	},

	initData : function(){
		if(this.dataObject[this.dataKey] !== undefined){
			this.selector.set(this.dataObject[this.dataKey])
		} else {
			this.dataObject[this.dataKey] = Object.keys(this.options)[0]
		}
	},

	changeData : function(selectedValue, text) {
		this.dataObject[this.dataKey] = selectedValue
	},
 })

var Adder = function(form, descriptor, formOptions, predicate) {
	
	FormElement.call(this, form, descriptor, formOptions, predicate)
}

Adder.prototype = $.extend(Object.create(FormElement.prototype),{

	initUI : function(){
		this.container =  html.div("adderContainer")
		this.title = html.div("inline").text(this.descriptor.title)
		this.selector = UI.classSelectorMap(this.options)
		this.addButton = new TextButton("Add", (this.add).bind(this))
		this.addAllButton = new TextButton("Add all", (this.addAll).bind(this))
		this.subContainer = html.div("subContainer")
		this.container.append(this.title).append(this.selector).append(
				this.addButton.container)
		if(Object.keys(this.options).length > 1)
				this.container.append(this.addAllButton.container)
		this.container.append(this.subContainer)
	},
	
	initData : function() {

		this.addedValues = []
		this.subForms = []
		this.cnt = 0
		this.addingAll = false
		
		if(this.dataObject[this.predicate] !== undefined){
			this.existingData = this.parentData[this.predicate]
			if(this.existingData.length > 0){
				parentForm.existingCounter++
			}
			this.existingLoad = true
			this.showExistingData()
		} else {
			this.existingLoad = false
			this.existingData = []
			this.dataObject[this.predicate] = this.existingData
		}
	},
	
	showExistingData : function(){
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
		} else if(this.existingData.getObjectByKey(this.dataKey, this.selector.val()) != null){
			var text = this.selector.find("option[value='" + this.selector.val() + "']").text()
			PopUpController.note(text + " have already been added!");
		} else {
			var object = new Object()
			object[this.dataKey] = this.selector.val()
			object[this.dataKey + "Label"] = this.selector.find("option[value='" + this.selector.val() + "']").text()
			this.title = object[this.dataKey + "Label"] 
			this.existingData.push(object)
			this.addSubForm(object)			
		}
	},
	
	addAll : function(){
		
		PopUpController.addSubWaitGif(this.subContainer)
		DataController.loadSubFormDataAll(this, Object.keys(this.options))
	},
	
	initAll : function(data){
		
		$.each(data, (function(key, value){
			//The key is the uri
			label = this.options[key].label;
			var object = new Object()
			object[this.dataKey] = key
			object[this.dataKey + "Label"] = this.options[key].label
			this.localData.push(object)
			this.title = this.options[key].label
			console.log("AllValue")
			console.log(value)
			this.subForms.push(new SubForm(this, object, value))
		}).bind(this)) 
		this.addSubForms()	
		PopUpController.remove()
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
})

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

var ExistingInstanceSelector = function(form, descriptor, formOptions, predicate){
	
	FormElement.call(this, form, descriptor, formOptions, predicate)
}

ExistingInstanceSelector.prototype = {
		
	initUI : function(){
		this.container = new TextButton(this.title, (this.loadTableData).bind(this)).container
	},
		
	initData : function(){
		
	},
	
	loadTableData : function(){
		
		if(this.descriptor.table != undefined){
			new InstanceSelector(this, this.descriptor.table, this.existingData)
		} else {
			alert("Table is not defined")
		}
	},
}

