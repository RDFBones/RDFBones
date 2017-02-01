
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
		
		this.container = html.div("dT_elementContainer")
		this.title = html.div("titleNotUnderlined").text(this.dataObject.sexScoreLabel)
		
		// Categorical Label
		this.catLabelDiv = html.div("inline")
		this.catLabTitle = html.div("title").text("Categorical Label")
		this.selector = UI.classSelector(this.options)
		this.catLabelDiv.append([this.catLabTitle, this.selector])

		// Sex Score
		this.sexScoreDiv = html.div("inline")
		this.sexScoreLabel = html.div("title").text("Degree of sexualisation")
		
		this.fieldContainer = html.div("dT_elementContainer")	
		this.sexScoreField = UI.floatInput(0.1).change((this.change).bind(this)).addClass("margin15H")
		this.saveButton = new Button("done", (this.saveHandler).bind(this)).disable()
		
		this.fieldContainer.append([this.sexScoreField, this.saveButton.container])
		this.sexScoreDiv.append([this.sexScoreLabel, this.fieldContainer])

		// Buttons
		this.deleteButton = new Button("del", (this.del).bind(this))
		this.container.append([this.title, this.catLabelDiv, this.sexScoreDiv, 
			this.deleteButton.container])
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
			PopUpController.doneMsg("Data has been saved")
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
			PopUpController.doneMsg("Data has been updated")
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
			PopUpController.init("Please wait")
			$.ajax({
				type : 'POST',
				context : this,
				dataType : 'json',
				url : baseUrl + "dataTransformationAJAX",
				data : {
					task : "delete",
					subjectUri : subjectUri,
					dataTransformation : this.dataObject.dataTransformation,
					degreeOfSexualisation : this.dataObject.degreeOfSexualisation,
					degree : this.savedValue,
					editKey : editKey,
				}
			}).done((function(msg) {
				this.container.remove()
				this.mainForm.remove(this.dataObject)
				PopUpController.doneMsg("Data has been deleted")
			}).bind(this))
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


