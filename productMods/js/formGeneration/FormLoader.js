var elementMap = {
	adder : Adder,
	selector : Selector,
	stringInput : StringInput,
}

var Form = function(parentForm, data){
	
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
		titleStyle = (this.descriptor.style === undefined) ? "title" : "inlineTitle"
		this.container.append(html.div("formTitle").text(this.parentForm.title))
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
	
	this.loadFormConfiguration()
}

MainForm.prototype =  {

	loadFormConfiguration : function(){
		
	PopUpController.init($("#form"));
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
			PopUpController.done();
			if (objectUri != null) {
				this.loadExistingData()
			} else {
				formData.existingData = new Object()
				formData.existingData.subject = subjectUri;
				formData.existingData.rangeUri = rangeUri;
				console.log(formData.existingData)
				this.init()
			}
		}).bind(this)) 
	},
	
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
		PopUpController.addWaitGif(this.subContainer)
		this.subForm = new Form(this, formData.existingData)
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
		console.log(toSend)
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataGenerator",
			data : "requestData=" + JSON.stringify(toSend)
		}).done((function(msg) {
			
			PopUpController.doneMsg("Triples are successfully saved", 2000, null,
			function(){
			window.location = baseUrl + "display/" +
			 		subjectUri.split("/")[subjectUri.split("/").length-1]
			})
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
