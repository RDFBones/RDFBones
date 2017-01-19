

class Form { 
	
	constructor(parentForm, descriptor, data){

		this.parentForm = parentForm
		this.dataObject = data
		this.descriptor = descriptor
		this.title = util.getUndefinedObject(descriptor, "title")
		this.titleStyle = this.getTitleStyle()
	}	

	// This is called by the DataController
	loadSubformData (){
		// This calls an AJAX
		DataController.loadSubformData(this)
	}
	
	getTitleStyle (){
		
		return this.descriptor.style == "inline" ? 
			this.titleStyle = "formTitleInline" : "formTitle"
	}
	
	init (formOptions) {
	
		this.formElements = new Object()
		$.each(this.descriptor.formElements, (function(key, value){
			this.formElements[key] = new ElementMap[value.type](this, value, formOptions, key)
		}).bind(this))
		this.loadUI()
	}
	
	loadUI (){
		
		// Pre UI
		this.container = html.div("fade")
		this.titleCont = html.div(this.titleStyle).text(this.title)
		this.formContainer = html.div("inline")
		UI.appendToDiv(this.formContainer, this.formElements)
		this.setButtons()
		this.container.append([this.titleCont, this.formContainer, this.buttonCont])
		this.ready()
	}
	
	setButtons (){
		this.buttonCont = html.div("inline")
	}
	
	ready (){
		console.log("Ready")
		this.parentForm.ready(this.container)
	}
}

class SubForm extends Form { 

	constructor(parentForm, descriptor, data){
	
		super(parentForm, descriptor, data)
		this.title = data[parentForm.dataKey + "Label"]
		this.loadSubformData()
	}
	
	setButtons (){
		this.buttonCont = html.div("inline")
		this.deleteButton = new Button("del", (this.deleteData).bind(this))
		this.buttonCont.append(this.deleteButton.container)
	}
	
	deleteData (){
		this.container.remove()
		this.parentForm.removeDataObject(this.descriptor.dataKey, this.dataObject)
	}
}

class SubFormAll  extends SubForm {
	
	ready (){
		this.parentForm.readyAll(this)
	}
}

class MainForm extends Form { 
	
	constructor(formLoader){
		super(null, Global.formDescriptor, Global.formData)
		this.formLoader = formLoader
		this.title = Global.formDescriptor.title
		this.titleStyle = "mainFormTitle"
		this.loadSubformData()
	}

	ready (){
		console.log("Ready")
		this.formLoader.ready(this.container)
	}
}

class ExistingMainForm extends MainForm {
	
	constructor(formLoader){
		super(formLoader)
	}
	
	loadSubformData (){
		this.init(Global.formData.formData)
		// this.formLoader.ready(this.container)
	}
}

class ExistingForm extends Form { 
	
	constructor(parentForm, descriptor, data){
		super(parentForm, descriptor, data)
		this.title = data[parentForm.dataKey + "Label"]
		this.init(data.formData)
	}
	
	setButtons (){
		this.buttonCont = html.div("inline")
		this.deleteButton = new Button("del", (this.deleteData).bind(this))
		this.buttonCont.append(this.deleteButton.container)
	}
	
	
	laodSubFormData (){
		// Do nothing
	}
	
	ready (){
		
	} 
	
	deleteData (){
	
		this.container.remove()
		PopUpController.init("Delete is in progress")
		AJAX.call("deleteFormData", (this.deleteSuccess).bind(this),
				[this.descriptor.dataKey, this.dataObject])
	}
	
	deleteSuccess (msg){
		if(msg.failed){
			alert("Deletion failed")
		}	
		this.container.remove()
		this.parentForm.removeDataObject(this.descriptor.dataKey, this.dataObject)
		PopUpController.done()
	}
}


class EditSubForm extends SubForm {
	
	init (formOptions) {
		
		this.formElements = new Object()
		$.each(this.descriptor.formElements, (function(key, value){
			this.formElements[key] = new ElementMap[value.type](this, value, formOptions, key)
		}).bind(this))
		this.loadUI()
	}
	
	loadUI (){
		
		// Pre UI
		this.container = html.div("fade")
		this.titleCont = html.div(this.titleStyle).text(this.title)
		this.formContainer = html.div("inline")
		UI.appendToDiv(this.formContainer, this.formElements)
		this.setButtons()
		this.container.append([this.titleCont, this.formContainer, this.buttonCont])
		
		// Here the ready is removed
		AJAX.call("addFormData", (function(msg){
			$.extend(this.dataObject, msg.graphData)
			this.ready()
		}).bind(this), [this.descriptor.dataKey, 
			dataUtil.getStrings(this.parentForm.dataObject), 
			dataUtil.getStrings(this.dataObject)])	
	}
}

