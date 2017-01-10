var ElementMap = {
	adder : Adder,
	selector : Selector,
	existingInstanceSelector : ExistingInstanceSelector,
	stringInput : StringInput,
	literalCell : LiteralCell,
	imagesCell : ImagesCell, 
}

var SubForm = function(parentForm, data, formData){
	
	this.mainForm = false
	this.parentForm = parentForm
	this.dataObject = data
	this.container = html.div()
	this.descriptor = parentForm.descriptor
	this.title = parentForm.title
	this.existingCounter = 0
	this.init(formData)
}

SubForm.prototype = {
		
	init : function(formData) {
		//Pre UI
		console.log(formData)
		titleStyle = (this.descriptor.style === undefined) ? "formTitle" : "formTitleInline"
		titleStyle = this.mainForm ? "mainFormTitle" : titleStyle
		this.container.append(html.div(titleStyle).text(this.title))
		this.formContainer = html.div("inline")
		this.subFormElements = new Object()
		$.each(this.descriptor.formElements, (function(key, value){
			this.subFormElements[key] = new ElementMap[value.type](this, value, formData, key)
		}).bind(this))
		UIelements = []
		$.each(this.subFormElements, (function(key, element){
			UIelements.push(element.container)
		}).bind(this))
		this.formContainer.append(UIelements)
		this.container.append(this.formContainer)
	},
}

var Form = function(parentForm, data, mainForm, title){
	
	this.mainForm = util.setUndefined(mainForm, false)
	this.parentForm = parentForm
	this.dataObject = data
	this.container = html.div()
	this.descriptor = parentForm.descriptor
	this.title = parentForm.title
	this.existingCounter = 0
	// The subform does not modify the dataObject. It just saves it
}

Form.prototype = {

	load : function(){
			DataController.loadSubformData(this)
	},
		
	//This is called by the DataController
	init : function(formOptions) {
		
		//Pre UI
		titleStyle = (this.descriptor.style === undefined) ? "formTitle" : "formTitleInline"
		titleStyle = this.mainForm ? "mainFormTitle" : titleStyle
		this.container.append(html.div(titleStyle).text(this.title))
		this.formContainer = html.div("inline")
		this.subFormElements = new Object()
		$.each(this.descriptor.formElements, (function(key, value){
			this.subFormElements[key] = new ElementMap[value.type](this, value, formOptions, key)
		}).bind(this))
		this.loadUI()
	},
	
	ready : function(){
		
		this.existingCounter--
		this.loadUI()
	},
	
	loadUI : function(elements){
		
		if(this.existingCounter == 0){
			UIelements = []
			$.each(this.subFormElements, (function(key, element){
				UIelements.push(element.container)
			}).bind(this))
			this.formContainer.append(UIelements)
			this.container.append(this.formContainer)
			this.parentForm.ready()			
		}
	},
}

var MainForm = function(){
	
	PopUpController.addWaitGif($("#form"))
	this.edit = false
	
	AJAX.call("formDescriptor", (function(msg){
		formDescriptor = msg.formDescriptor
		dataDependencies = msg.dataDependencies
		if (objectUri != null) {
			this.edit = true
			this.loadExistingData()
		} else {
			formData.existingData = new Object()
			formData.existingData.subjectUri = subjectUri;
			formData.existingData.rangeUri = rangeUri;
			this.init()
		}
	}).bind(this))
}

MainForm.prototype =  {

	ready : function(){
		this.container = html.div()
		this.submitButton = new TextButton("Submit", (this.submit).bind(this))
		this.cancelButton = new TextButton("Cancel", (this.cancel).bind(this))
		this.container.append(this.subForm.container)
		if(!this.edit)
			this.container.append(this.submitButton.container)
		this.container.append(this.cancelButton.container)	
		PopUpController.removeWaitGif($("#form"), this.container)
	},
	
	init : function(){
		
		//Data
		this.descriptor = formDescriptor
		this.dataObject = formData.existingData
		this.title = this.descriptor.title
		//UI
		this.subContainer = html.div("subContainer")
		this.subForm = new Form(this, formData.existingData, true)
		this.subForm.load()
	},	
	
	submit : function() {

		PopUpController.init("RDF data generation is in progress")
		var toSend = new Object();
		toSend.subject = {
			uri : subjectUri,
		}
		toSend.editKey = editKey
		//this.dataObject.subjectUri = subjectUri
		toSend.dataToStore = this.dataObject
		console.log(toSend)
		if(!debug){
			$.ajax({
				type : 'POST',
				context : this,
				dataType : 'json',
				url : baseUrl + "dataGenerator",
				data : "requestData=" + JSON.stringify(toSend)
			}).done((function(msg) {
				if(msg.failed !== undefined){
					PopUpController.defaultDoneMsg("Triple creation failed!");
					console.log(msg)
					var ajaxmsg = msg
				} else {
					PopUpController.doneMsg("Triples are successfully saved", 2000, null,
					function(){
					window.location = baseUrl + "display/" +
					 		subjectUri.split("/")[subjectUri.split("/").length-1]
					})
				}
			}).bind(this)) 			
		} else {
			PopUpController.done()
		}
	},

	loadExistingData : function() {
		
		AJAX.call("existingFormGraphData", (function(msg){
			formData.existingData = msg
			formData.existingData.subjectUri = subjectUri
			formData.existingData.rangeUri = rangeUri
			this.init()
		}).bind(this), [subjectUri, objectUri])
	},

	cancel : function(){
		window.location = baseUrl + "display/" +
				 		subjectUri.split("/")[subjectUri.split("/").length-1]
	}
}
