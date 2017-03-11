
class DataTransformationItem {

	constructor(mainForm, dataTransformationType, dataTransformationTypeLabel){
	
		this.mainForm = mainForm
		this.dataObject = {
				dataTransformationType : dataTransformationType,
				dataTransformationTypeLabel : dataTransformationTypeLabel,
		}
		this.saved = null
		DTAJAX.call({
			dataTransformationType : dataTransformationType,
			task : "outputType",
		}, (function(msg){
			this.dataObject = $.extend(this.dataObject, msg)
			this.dataObject.literalType = msg.inputs[0].literalType
			this.dataObject.measDatumType = msg.inputs[0].measDatumType
			this.dataObject.measDatumTypeLabel = 
				this.dataObject.measDatumType.split("#")[1]
			this.dataObject.inputs = []
			this.initUI()
		}).bind(this))
	}

	initUI(){

		this.container = html.div("dT_elementContainer")

		this.contentContainer = html.div("")
		this.title = html.div("dt_title").text(
				this.dataObject.dataTransformationTypeLabel)
		
		//Input
		this.inputCont = html.div("margin10H")
		this.inputTitle = html.div("dt_inlineTitle").text("Input data")
		this.button = new TextButton("Select", null, null, "inline")
		this.inputCont.append([this.inputTitle, this.button.container])
		
		//Output
		this.outputCont = html.div("flexInlineContainer margin10H")
		this.outputTitle = html.div("dt_title").text("Output data")
		
		this.outputDataContainer = html.div("inline margin10H")
		
		this.measDatumDiv = html.div("inline")
		this.measDatumLabelDiv = html.div("dt_title").text((this.dataObject.measDatumTypeLabel))
		
		this.fieldContainer = html.div("dT_elementContainer")	
		this.dataField = UI.floatInput(0.1).change((this.change).bind(this)).addClass("margin15H")
		this.saveButton = new Button("done", (this.saveHandler).bind(this)).disable()
		this.fieldContainer.append([this.dataField, this.saveButton.container])
		
		this.outputDataContainer.append([this.measDatumLabelDiv, this.fieldContainer])
		
		this.outputCont.append([this.outputTitle, this.outputDataContainer])
		
		this.contentContainer.append([this.title, this.inputCont, this.outputCont])
		
		// Delete button
		this.deleteButton = new Button("del", (this.del).bind(this))
		
		//Assemble
		this.container.append([this.contentContainer, this.deleteButton.container])	
		this.mainForm.elementContainer.append(this.container)
	}
	
	saveHandler (){
		
		if(this.saved == null){
			this.save()
		} else {
			this.edit()
		}
	}
	
	addInput(uri){
		if(this.saved){
			dataController.addInput(uri, this.dataObject.dataTransformation)	
		}
	}
	
	removeInput(uri){
		if(this.saved){
			dataController.removeInput(uri, this.dataObject.dataTransformation)	
		}
	}
	
	save (){
		DTAJAX.send({
			task : "createNew",
			dataTransformationType : this.dataObject.dataTransformationType,
			measurementValue : this.unsaved,
			measurementValueType : this.dataObject.measurementValueType,
		}, (function(msg) {
			//Here the new URIs will be added to the dataObject
			$.extend(this.dataObject, msg.dataObject)
			this.saved = this.unsaved
			this.unsaved = null
			this.saveButton.disable()
		}).bind(this))
	}
	
	edit (){
		
		DTAJAX.send({
			task : "edit",
			measurementDatum : this.dataObject.measurementDatum,
			oldMeasurementValue : this.savedValue,
			newMeasurementValue : this.unsaved,
		})
		this.savedValue = this.unsaved
	}
	
	change (){
		
		if(this.unsaved == null){
			this.saveButton.enable()
		}
		this.unsaved = this.sexScoreField.val()
	}

	del (){
		
		if(this.saved){
			DTAJAX.send({
				task : "delete",
				subjectUri : subjectUri,
				dataTransformation : this.dataObject.dataTransformation,
				degreeOfSexualisation : this.dataObject.degreeOfSexualisation,
				degree : this.savedValue,
				editKey : editKey,
			},(function(msg) {
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


