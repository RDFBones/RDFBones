var elementMap = {
	adder : Adder,
	selector : Selector,
	stringInput : StringInput,
}

var Form = function(parentForm, data){
	
	this.parentForm = parentForm
	this.dataObject = data
	this.container = parentForm.subContainer
	this.formElementDescriptor = parentForm.descriptor.formElements

	// The subform does not modify the dataObject. It just saves it
	DataController.loadSubformData(this)
}

Form.prototype = {
		
	//This is called by the DataController
	init : function() {
		
		//Pre UI
		this.container.append(html.div("title").text(this.parentForm.title))
		this.subFormContainer = html.div("subFormContainer")
		this.container.append(this.subFormContainer)
		this.subFormElements = new Object()
		$.each(this.formElementDescriptor, (function(key, value){
			this.subFormElements[key] = new elementMap[value.type](key, value, this)
		}).bind(this))
		this.loadUI()
	},
	
	loadUI : function(elements){
		
		UIelements = []
		$.each(this.subFormElements, (function(key, element){
			UIelements.push(element.container)
		}).bind(this))
		this.container.append(UIelements)
	},
}

var MainForm = function(){
	
	if (objectUri != null) {
		this.loadExistingData()
	} else {
		formData.existingData = new Object()
		this.init()
	}
}

MainForm.prototype =  {

	init : function(){
		
		//Data
		this.descriptor = formDescriptor
		this.dataObject = formData.existingData
		this.title = this.descriptor.title
		//UI
		this.container = html.div()
		this.subContainer = html.div("subContainer")
		new Form(this, formData.existingData)
		this.submitButton = new TextButton("Submit", (this.submit).bind(this)).container
		this.container.append(this.subContainer).append(this.submitButton)	
		$("#form").append(this.container)	
	},	
		
	
	submit : function() {

		var toSend = new Object();
		toSend.subject = {
			uri : subjectUri,
		}
		toSend.editKey = editKey
		this.dataObject.subject = subjectUri
		toSend.dataToStore = this.dataObject
		console.log(toSend)
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataGenerator",
			data : "requestData=" + JSON.stringify(toSend)
		}).done((function(msg) {
			console.log("Response")
			console.log(msg);
			window.location = baseUrl + "display/" +
			 	subjectUri.split("/")[subjectUri.split("/").length-1]
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
