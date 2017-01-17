

var Form = function(parentForm, descriptor, data){
	
	this.parentForm = parentForm
	this.dataObject = data
	this.descriptor = descriptor
	this.title = util.getUndefinedObject(descriptor, "title")
	this.titleStyle = this.getTitleStyle()
}	

Form.prototype = {

	//This is called by the DataController
	loadSubformData : function(){
		//This calls an AJAX 
		DataController.loadSubformData(this)
	},
	
	getTitleStyle : function(){
		
		return this.descriptor.style == "inline" ? 
			this.titleStyle = "formTitleInline" : "formTitle"
	},
	
	init : function(formOptions) {
	
		this.formElements = new Object()
		$.each(this.descriptor.formElements, (function(key, value){
			this.formElements[key] = new ElementMap[value.type](this, value, formOptions, key)
		}).bind(this))
		this.loadUI()
	},
	
	loadUI : function(){
		
		//Pre UI
		this.container = html.div("fade")
		this.titleCont = html.div(this.titleStyle).text(this.title)
		this.formContainer = html.div("inline")
		UI.appendToDiv(this.formContainer, this.formElements)
		this.setButtons()
		this.container.append([this.titleCont, this.formContainer, this.buttonCont])
		this.ready()
	},
	
	setButtons : function(){
		this.buttonCont = html.div("inline")
	},
	
	ready : function(){
		this.parentForm.ready(this.container)
	},
}

var SubForm = function(parentForm, descriptor, data){
	
	Form.call(this, parentForm, descriptor, data)
	this.title = data[parentForm.dataKey + "Label"]
	this.loadSubformData()
}

SubForm.prototype = $.extend(Object.create(Form.prototype), {
	
	setButtons : function(){
		this.buttonCont = html.div("inline")
		this.deleteButton = new Button("del", (this.deleteData).bind(this))
		this.buttonCont.append(this.deleteButton.container)
	},
	
	deleteData : function(){
		this.container.remove()
		this.parentForm.removeDataObject(this.descriptor.dataKey, this.dataObject)
	}
})

var SubFormAll = function(parentForm, descriptor, data){
	
	SubForm.call(this, parentForm, descriptor, data)
}

SubFormAll.prototype = $.extend(Object.create(SubForm.prototype), {
	
	ready : function(){
		this.parentForm.readyAll(this)
	}
})

var MainForm = function(formLoader){
	
	Form.call(this, null, Global.formDescriptor, Global.formData)
	this.formLoader = formLoader
	this.title = Global.formDescriptor.title
	this.titleStyle = "mainFormTitle"
	this.loadSubformData()
}

MainForm.prototype = $.extend(Object.create(Form.prototype), {
	
	ready : function(){
		this.formLoader.ready(this.container)
	}
})

var ExistingMainForm = function(formLoader){
	
	MainForm.call(this, formLoader)
}

ExistingMainForm.prototype = $.extend(Object.create(MainForm.prototype), {
	
	loadSubformData : function(){
		this.init(Global.formData.formData)
		//this.formLoader.ready(this.container)
	}
})

var ExistingForm = function(parentForm, descriptor, data){
	
	Form.call(this, parentForm, descriptor, data)
	this.title = data[parentForm.dataKey + "Label"]
	this.init(data.formData)
}

ExistingForm.prototype = $.extend(Object.create(Form.prototype),{
	
	ready : function(){
		//Do nothing
	},

	deleteData : function(){
		
		PopUpController("Delete is in progress")
		AJAX.deleteData("deleteFormData", (function(){
			this.container.remove()
			PopUpController.done()
		}).bind(this),[this.descriptor.dataKey, this.dataObject])
	},

	
})
