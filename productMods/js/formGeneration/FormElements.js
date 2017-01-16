var FormElement = function(form, descriptor, formOptions, predicate) {

	this.parentForm = form
	this.descriptor = descriptor
	this.dataKey = descriptor.dataKey
	if(formOptions !== undefined && formOptions[this.dataKey] !== undefined){
		this.options = DataController.prepareOptions(formOptions[this.dataKey])
	} else {
		this.options = new Object()
	}
	this.predicate = predicate
	this.dataObject = form.dataObject
	this.initUI()
	this.initData()
}

FormElement.prototype = {}

var Selector = function(form, descriptor, formOptions, predicate) {

	FormElement.call(this, form, descriptor, formOptions, predicate)
}

Selector.prototype = $.extend(Object.create(FormElement.prototype), {

	initUI : function() {
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

	initData : function() {
		if (this.dataObject[this.dataKey] !== undefined) {
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

Adder.prototype = $.extend(Object.create(FormElement.prototype), {

	initUI : function() {
		this.container = html.div("adderContainer")
		this.title = html.div("inline").text(this.descriptor.title)
		this.selector = UI.classSelectorMap(this.options)
		this.addButton = new TextButton("Add", (this.add).bind(this))
		this.addAllButton = new TextButton("Add all", (this.addAll).bind(this))
		this.subContainer = html.div("subContainer")
		this.container.append(this.title).append(this.selector).append(
				this.addButton.container)
		if (Object.keys(this.options).length > 1)
			this.container.append(this.addAllButton.container)
		this.container.append(this.subContainer)
	},

	initData : function() {

		this.subForms = []
		if (this.dataObject[this.predicate] !== undefined) {
			this.dataArray = this.dataObject[this.predicate]
			this.showExistingData()
		} else {
			this.dataArray = []
			this.dataObject[this.predicate] = this.dataArray
		}
	},

	showExistingData : function() {
		
		$.each(this.dataArray, (function(i, object) {
			var option = this.options[object[this.dataKey]]
			object[this.dataKey + "Label"] = option.label
			this.subForms.push(new ExistingForm(this, this.descriptor, object))
		}).bind(this))
		UI.appendToDiv(this.subContainer, this.subForms)
	},

	add : function() {

		if (this.addAllFlag) {
			PopUpController.note("All types have been already added!")
		} else if (this.dataArray.getObjectByKey(this.dataKey, this.selector
				.val()) != null) {
			var text = this.selector.find(
					"option[value='" + this.selector.val() + "']").text()
			PopUpController.note(text + " have already been added!");
		} else {
			var object = new Object()
			object[this.dataKey] = this.selector.val()
			object[this.dataKey + "Label"] = this.options[this.selector.val()].label
			this.dataArray.push(object)
			PopUpController.addSubWaitGif(this.subContainer)
			this.subForms.push(new SubForm(this, this.descriptor, object))
		}
	},
	
	ready : function(container){
		this.subContainer.append(container)
	},
	
	addAll : function() {

		PopUpController.addSubWaitGif(this.subContainer)
		DataController.loadSubFormDataAll(this, Object.keys(this.options))
	},

	initAll : function(data) {

		this.cnt = 0
		this.addedForms = []
		$.each(data, (function(key, value) {
			// The key is the uri
			this.cnt++
			var object = new Object()
			object[this.dataKey] = key
			object[this.dataKey + "Label"] = this.options[key].label
			this.dataArray.push(object)
			this.subForms.push(new SubFormAll(this, this.descriptor, object))
		}).bind(this))
	},

	readyAll : function(form){
		
		this.addedForms.push(form.container)
		if(--this.cnt == 0){
			this.subContainer.append(this.addedForms)
			PopUpController.remove()
			this.addedForms = []
		}
	},
	
	ready : function() {

		this.subContainer.append(this.subForms[this.subForms.length - 1].container)
		PopUpController.remove()
	},

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

StringInput.prototype = {}

var ExistingInstanceSelector = function(form, descriptor, formOptions,
		predicate) {

	FormElement.call(this, form, descriptor, formOptions, predicate)
}

ExistingInstanceSelector.prototype = $.extend(Object.create(FormElement.prototype), {

	initUI : function() {

		this.title = this.descriptor.title
		this.container = new TextButton(this.title, (this.loadTableData).bind(this), "inline").container
	},

	initData : function() {

		if(this.dataObject[this.predicate] !== undefined){
			this.existingData = this.dataObject[this.predicate]
		} else {
			this.existingData = []
			this.dataObject[this.predicate] = this.existingData
		}
	},

	loadTableData : function() {

		if(this.instanceSelector != undefined){
			 this.instanceSelector.display()
		} else {
			if (this.descriptor.table != undefined) {
				this.instanceSelector = new InstanceSelector(this)
			} else {
				alert("Table is not defined")
			}	
		}
	}
	
})
