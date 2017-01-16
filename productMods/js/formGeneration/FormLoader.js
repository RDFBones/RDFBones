var FormLoader = function(){

	PopUpController.addWaitGif($("#form"))
	this.edit = false
	AJAX.call("formDescriptor", (function(msg) {
		Global.formDescriptor = msg.formDescriptor
		Global.dataDependencies = msg.dataDependencies
		if (objectUri != null) {
			this.edit = true
			this.loadExistingData()
		} else {
			Global.formData = new Object()
			Global.formData.subjectUri = subjectUri
			Global.formData.rangeUri = rangeUri
			this.initUI()
			Global.mainForm = new MainForm(this)
	}
	}).bind(this))
}

FormLoader.prototype = {
		
	loadExistingData : function() {

		AJAX.call("existingFormGraphData", (function(msg) {
			Global.formData = msg
			this.initUI()
			Global.mainForm = new ExistingMainForm(this)
		}).bind(this), [ subjectUri, objectUri ])
	},

	ready : function(container){
		
		this.container.append([container, this.buttonContainer])
		PopUpController.removeWaitGif($("#form"), this.container)
	},
	
	initUI : function() {
		
		this.container = html.div()
		this.buttonContainer = html.div()
		if(this.edit){
			this.doneButton = new TextButton("Done", (this.cancel).bind(this))
			UI.appendToDiv(this.buttonContainer, [this.doneButton])
		} else {
			this.submitButton = new TextButton("Submit", (this.submit).bind(this))
			this.cancelButton = new TextButton("Cancel", (this.cancel).bind(this))
			UI.appendToDiv(this.buttonContainer, [this.submitButton, this.cancelButton])
		}
	},

	submit : function() {

		PopUpController.init("RDF data generation is in progress")
		var request = {
			editKey : editKey,
			dataToStore : Global.formData
		}
		console.log(request)
		if (!debug) {
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataGenerator",
			data : "requestData=" + JSON.stringify(request)
		}).done((function(msg) {
			
			if (msg.failed !== undefined) {
				PopUpController.defaultDoneMsg("Triple creation failed!");
				console.log(msg)
				var ajaxmsg = msg
			} else {
				PopUpController.doneMsg("Triples are successfully saved", 2000, null,
				function() {
					window.location = baseUrl
							+ "display/"
							+ subjectUri.split("/")[subjectUri.split("/").length - 1]
				})
			}
			}).bind(this))
	} else {
			PopUpController.done()
		}
	},

	cancel : function() {
		window.location = baseUrl + "display/"
				+ subjectUri.split("/")[subjectUri.split("/").length - 1]
	},
	
	
}

var ElementMap = {
	adder : Adder,
	selector : Selector,
	existingInstanceSelector : ExistingInstanceSelector,
	stringInput : StringInput,
	literalCell : LiteralCell,
	imagesCell : ImagesCell,
}
