
class DataTransformationItem {

	constructor(mainForm, dataObject){
	
		this.dataObject = dataObject
		this.mainForm = mainForm
		this.options = [{
			uri : dataObject.categoricalLabel,
			label : dataObject.categoricalLabelLabel,
		}]
		this.saved = null
		this.initUI()
	}
	
	initUI(){
		
		this.container = html.div()
		
		//Categorical Label
		this.catLabelDiv = html.div("inline")
		this.catLabTitle = html.div("title").text("Categorical Label")
		this.selector = UI.classSelector(this.options)
		this.catLabelDiv.append([this.catLabTitle, this.selector])

		//Sex Score
		this.sexScoreDiv = html.div("inline")
		this.sexScoreLabel = html.div("inline").text("Sex score")
		this.sexScoreField = UI.floatInput(0.1).change((this.change).bind(this))
		this.sexScoreDiv.append([this.sexScoreLabel, this.sexScoreField])
		
		//Buttons 
		this.buttonContainer = html.div("inline")
		this.saveButton = new Button("done", (this.saveHandler).bind(this))
		this.deleteButton = new Button("del", (this.del).bind(this))
		this.saveButton.disable()
		UI.appendToDiv(this.buttonContainer, [this.saveButton, this.deleteButton])
		this.container.append([this.catLabelDiv, this.sexScoreDiv, this.buttonContainer])
	}
	
	saveHandler (){
		
		if(this.saved == null){
			this.save()
		} else {
			this.edit()
		}
	}
	
	save (){
		
		PopUpController.init("Please wait")
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataTransformationAJAX",
			data : {
				task : "createNew",
				sexScore : this.dataObject.sexScore,
				degree : this.unsaved,
				subjectUri : subjectUri,
				editKey : editKey,
			}
		}).done((function(msg) {
			$.extend(this.dataObject, msg.dataObject)
			this.saved = this.unsaved
			this.unsaved = null
			this.saveButton.disable()
			PopUpController.done()
		}).bind(this))
	}
	
	edit (){
		
		PopUpController.init("Please wait")
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataTransformationAJAX",
			data : {
				task : "edit",
				degreeOfSexualisation : this.dataObject.degreeOfSexualisation,
				oldDegree : this.savedValue,
				newDegree : this.unsaved,
				editKey : editKey,
			}
		}).done((function(msg) {
			this.savedValue = this.unsaved
			this.unsaved = null
			PopUpController.done()
		}).bind(this))
	}
	
	change (){
		if(this.unsaved == null){
			this.saveButton.enable()
		}
		this.unsaved = this.sexScoreField.val()
	}
	
	del (){
		
		if(this.saved){
			//AJAX
			
		} else {
			this.container.remove()
			this.parentForm.remove(this.dataObject)
		}
	}
} 

class ExistingDataTransformation extends DataTransformationItem {
	
	constructor(mainForm, dataObject){
		super(mainForm, dataObject)
		this.saved = true
		this.savedValue = dataObject.degree
		this.sexScoreField.val(dataObject.degree)
	}
}


