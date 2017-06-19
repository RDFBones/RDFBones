
class Main {
	
	constructor(){
		this.initUI()
		this.loadExistingData()
	}
	
	initUI (){
		
		//BUTTONS
		this.submit = $("#submit")
		this.cancel = $("#cancel")
		this.done = $("#done")
		this.del = $("#delete")
	
		this.text = $("#text")
				
		this.inputButton = new TextButton("Select", (this.selectInput).bind(this), null, "inline")
		$("#inputButtonCont").append(this.inputButton.container)

		this.validContainer = $("#validContainer")
		this.errorMsg = $("#errorMessage")

		this.textArea = $("#conclusionValue").bind('input propertychange', (this.change).bind(this))
		this.submit.click((this.submitRoutine).bind(this))
		this.del.click((this.deleteRoutine).bind(this))

		this.editButton = new Button("done", (this.edit).bind(this)).hide()
		this.text.append(this.editButton.container)
		this.cancel.click(util.redirect)
		this.done.click(util.redirect)
		
		if(Global.editMode){
			this.submit.hide()
			this.cancel.hide()
		} else {
			this.done.hide()
			this.del.hide()
		}
	}
	
	loadExistingData(){
		
		var existing = null
		if(objectUri == null){
			existing = "false"
		} else {
			existing = "true"
		}
		DTAJAX.call({
			task : "initial",
			existing : existing,
			objectUri : objectUri,
		}, (this.init).bind(this))
	}
	
	init (msg){
		
		this.dataObject = msg;
		this.dataObject.inputInstances = []
		if(this.dataObject.conclusionValue != null){
			this.textArea.text(this.dataObject.conclusionValue)
		} else {
			this.dataObject.conclusionValue = null
		}
		
		if(Global.editMode){
			this.dataObject.drawingConclusionInstance = objectUri
		}
	}

	initValues(){
	
		$("#drawingConclusionLabel").text(this.dataObject.drawingConclusionLabel)
		$("#inputTypeLabel").text(this.dataObject.inputTypeLabel)
		//InputSelector
		if(!this.noData){
			var selector = new SelectorField(this.dataObject.inputData, (this.changeInput).bind(this),
					{ value : "inputInstance", text : "inputValue"});
			$("#inputValues").append(selector.container)
		} else {
			$("#inputValues").append(html.div().text("There is no input data to select"))
		}
	
		if(objectUri != null){
			selector.set(this.dataObject.inputInstance)
		}
	}
	
	change(){
		
		if(Global.editMode){
			this.dataObject.newConclusionValue = this.textArea.val()	
			this.editButton.show()
		} else {
			//Just set the value
			this.dataObject.conclusionValue = this.textArea.val()
		}
	}
	
	edit(){
		this.dataObject.task = "edit"
		DTAJAX.call(this.dataObject);
		this.dataObject.conclusionValue = this.dataObject.newConclusionValue
		this.editButton.hide()
	}

	/*
	 * Opening the floating window
	 */
	selectInput(){
		
		if(this.inputSelector === undefined){
			var existing = []
			if(Global.editMode){
				existing = this.dataObject.exsistingInputs
			} 
			this.inputSelector = new InputSelector(this, this.dataObject.possibleInputs, existing)	
		} else {
			this.inputSelector.display()
		}
	}

	/*
	 * Input instance handlers
	 */
	
	addInput(uri){
		
		if(Global.editMode){
			this.dataObject.task = "addInput"
			this.dataObject.inputInstance = uri
			DTAJAX.call(this.dataObject);
		} else {
			this.dataObject.inputInstances.push(uri)
		}
	}
	
	removeInput(uri){
		
		if(Global.editMode){
			this.dataObject.task = "removeInput"
			this.dataObject.inputInstance = uri
			DTAJAX.call(this.dataObject);
		} else {
			this.dataObject.inputInstances.removeElement(uri)
		}
	}
	
	deleteRoutine(){
		
		this.dataObject.task = "delete"
		DTAJAX.call(this.dataObject, (function(msg){
			//Do nothing
			util.redirect()
		}).bind(this))	
	}
	
	submitRoutine(){

		if(this.noData){
			alert("Without input data the submission is not allowed!")
		} else {
			if(this.dataObject.conclusionValue == null){
				alert("Please set conclusion text")
			} else {
				this.dataObject.task = "save"
				DTAJAX.call(this.dataObject,(function(msg){
					util.redirect()
				}).bind(this))
			}	
		}
	}
}
