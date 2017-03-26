
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
		this.edit = $("#edit")
		this.del = $("#delete")

		this.validContainer = $("#validContainer")
		this.errorMsg = $("#errorMessage")

		this.textArea = $("#conclusionValue").bind('input propertychange', (this.change).bind(this))
		this.submit.click((this.submitRoutine).bind(this))
		this.edit.click((this.editRoutine).bind(this))
		this.del.click((this.deleteRoutine).bind(this))

		this.cancel.click(util.redirect)
		this.done.click(util.redirect)
		
		if(objectUri != null){
			this.submit.hide()
			this.cancel.hide()
		} else {
			this.done.hide()
			this.edit.hide()
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
		
		this.dataObject = msg.data;
		this.dataObject.drawingConclusionLabel = this.process(this.dataObject.drawingConclusionType)
		this.dataObject.inputTypeLabel = this.process(this.dataObject.inputType)
		this.dataObject.conclusionLabel = this.process(this.dataObject.conclusionType)

		
		if(this.dataObject.conclusionValue != null){
			this.textArea.text(this.dataObject.conclusionValue)
		} else {
			this.dataObject.conclusionValue = null
		}
		
		if(this.dataObject.inputInstance == ""){
			this.errorMsg.text("Please add " + this.dataObject.inputTypeLabel + " to the investigation")
			this.submit.hide()
			this.validContainer.hide()
		}
		this.initValues();
		
		if(objectUri != null){
			this.dataObject.drawingConclusionInstance = objectUri
			this.dataObject.newConlusionValue = null	
		}
	}


	initValues(){
	
		$("#drawingConclusionLabel").text(this.dataObject.drawingConclusionLabel)
		$("#inputTypeLabel").text(this.dataObject.inputTypeLabel)
		$("#inputValue").text(this.dataObject.inputValue)
	}
	
	
	change(){
		
		if(objectUri != null){
			this.dataObject.newConclusionValue = this.textArea.val()	
		} else {
			//Just set the value
			this.dataObject.conclusionValue = this.textArea.val()
		}
	}
	
	editRoutine(){
	
		if(this.dataObject.newConclusionValue == null){
			alert("Please change the conclusion text")
		} else {
			this.dataObject.task = "edit"
			DTAJAX.call(this.dataObject, (function(msg){
				//Do nothing
			}).bind(this))	
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
		
		if(this.dataObject.conclusionValue == null){
			alert("Please set conclusion text")
		} else {
			this.dataObject.task = "save"
			DTAJAX.call(this.dataObject,(function(msg){
				util.redirect()
			}).bind(this))
		}
	}
	
	process(input){
		if(input === undefined){
			return "undefined"
		} else{
			var str = input.split("#")[1]
			if(str == undefined) str = "undefined"
			str = str.replace(".", " ")
			return str.replace("_", " ")
		}
	}
}
