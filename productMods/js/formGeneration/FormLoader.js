var FormLoader = function() {

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

	ready : function(container) {

		this.container.append([ container, this.buttonContainer ])
		PopUpController.removeWaitGif($("#form"), this.container)
	},

	initUI : function() {

		this.container = html.div()
		this.buttonContainer = html.div()
		if (this.edit) {
			this.doneButton = new TextButton("Done", (this.cancel).bind(this))
			UI.appendToDiv(this.buttonContainer, [ this.doneButton ])
			this.doneButton = new TextButton("Delete", (this.deleteFormData).bind(this))
			UI.appendToDiv(this.buttonContainer, [ this.doneButton ])
		} else {
			this.submitButton = new TextButton("Submit", (this.submit)
					.bind(this))
			this.cancelButton = new TextButton("Cancel", (this.cancel)
					.bind(this))
			UI.appendToDiv(this.buttonContainer, [ this.submitButton,
					this.cancelButton ])
		}
	},

	submit : function() {

		PopUpController.init("RDF data generation is in progress")
		if (!debug) {
			AJAX.call("formSubmission", (this.responseHandler).bind(this),
					[ Global.formData ])
		} else {
			PopUpController.done()
		}
	},

	responseHandler : function(msg) {
		if (msg.failed !== undefined) {
			PopUpController.defaultDoneMsg("Triple creation failed!");
			console.log(msg)
			var ajaxmsg = msg
		} else {
			PopUpController.doneMsg("Triples are successfully saved", 2000,
					null, util.redirect)
		}
	},

	deleteFormData : function(){
		
		PopUpController.init("Delete is in progress")
		AJAX.call("deleteAll", (function(msg){
			PopUpController.doneMsg("Delete was successful",
					2000, null, util.redirect)
		}).bind(this),[Global.formData])
	},
	
	cancel : function() {
		util.redirect()
	}
}

var ElementMap = {
	adder : Adder,
	selector : Selector,
	existingInstanceSelector : ExistingInstanceSelector,
	stringInput : StringInput,
	literalCell : LiteralCell,
	imagesCell : ImagesCell,
}
