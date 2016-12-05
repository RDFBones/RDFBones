var elementMap = {
	adder : Adder,
	selector : Selector,
	stringInput : StringInput,
}

var Form = function(parentForm, data, mainForm){
	
	this.mainForm = util.setUndefined(mainForm, false)
	this.parentForm = parentForm
	this.dataObject = data
	//this.container = parentForm.subContainer
	this.container = html.div()
	this.descriptor = parentForm.descriptor

	// The subform does not modify the dataObject. It just saves it
	DataController.loadSubformData(this)
}

Form.prototype = {
		
	//This is called by the DataController
	init : function() {
		//Pre UI
		titleStyle = (this.descriptor.style === undefined) ? "formTitle" : "formTitleInline"
		titleStyle = this.mainForm ? "mainFormTitle" : titleStyle
		this.container.append(html.div(titleStyle).text(this.parentForm.title))
		this.formContainer = html.div("inline")
		this.subFormElements = new Object()
		$.each(this.descriptor.formElements, (function(key, value){
			this.subFormElements[key] = new elementMap[value.type](key, value, this)
		}).bind(this))
		this.loadUI()
	},
	
	loadUI : function(elements){
		
		UIelements = []
		$.each(this.subFormElements, (function(key, element){
			UIelements.push(element.container)
		}).bind(this))
		//this.container.append(UIelements)
		this.formContainer.append(UIelements)
		this.container.append(this.formContainer)
		this.parentForm.ready()
	},
}

var MainForm = function(){
	
	PopUpController.addWaitGif($("#form"))
	$.ajax({
		type : 'POST',
		context : this,
		dataType : 'json',
		url : baseUrl + "formConfigLoader",
		data : {
			editKey : editKey,
		}
	}).done((function(msg) {
		formDescriptor = msg.formDescriptor
		dataDependencies = msg.dataDependencies
		if (objectUri != null) {
			this.loadExistingData()
		} else {
			formData.existingData = new Object()
			formData.existingData.subject = subjectUri;
			formData.existingData.rangeUri = rangeUri;
			this.init()
		}
	}).bind(this)) 
}

MainForm.prototype =  {

	ready : function(){
		this.container = html.div()
		this.submitButton = new TextButton("Submit", (this.submit).bind(this)).container
		this.container.append(this.subForm.container).append(this.submitButton)
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
	},	
	
	submit : function() {

		PopUpController.init("RDF data generation is in progress")
		var toSend = new Object();
		toSend.subject = {
			uri : subjectUri,
		}
		toSend.editKey = editKey
		this.dataObject.subject = subjectUri
		toSend.dataToStore = this.dataObject
		console.log()
		DataLib.debugObject(toSend.dataToStore)
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
	},

	loadExistingData : function() {
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "existingFormDataLoader",
			data : {
				subject : subjectUri,
				object : objectUri,
				editKey : editKey
			}
		}).done((function(msg) {
			formData.existingData = msg[0]
			this.init()
		}).bind(this))
	},
}
