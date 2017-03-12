
class DataTransformationItem {

	constructor(mainForm, dataObject){
		this.mainForm = mainForm
		this.dataObject = dataObject
		this.init()
	}
	
	init(dataObject){
		
		this.value = null
		this.saved = null
		DTAJAX.call({
			dataTransformationType : this.dataObject.dataTransformationType,
			task : "outputType",
		}, (function(msg){
			this.dataObject = $.extend(this.dataObject, msg)
			this.dataObject.literalType = msg.inputs[0].literalType
			this.dataObject.measurementDatumType = msg.inputs[0].measDatumType
			this.dataObject.measurementDatumTypeLabel = this.process(this.dataObject.measurementDatumType)
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
		this.button = new TextButton("Select",  (this.addInput).bind(this), null, "inline")
		this.inputCont.append([this.inputTitle, this.button.container])
		
		//Output
		this.outputCont = html.div("flexInlineContainer margin10H")
		this.outputTitle = html.div("dt_title").text("Output data")
		
		//Output data container
		this.outputDataContainer = html.div("inline margin10H")
		this.measDatumLabelDiv = html.div("dt_title").text((this.dataObject.measurementDatumTypeLabel))
		this.precision = this.dataObject.literalType == "http://www.w3.org/2001/XMLSchema#float" ? 0.01 : 1 
		this.dataField = UI.floatInput(this.precision).change((this.change).bind(this)).addClass("margin15H")
		this.outputDataContainer.append([this.measDatumLabelDiv, this.dataField])
		
		this.outputCont.append([this.outputTitle, this.outputDataContainer])
		this.contentContainer.append([this.title, this.inputCont, this.outputCont])

		// Delete button
		this.buttonContainer = html.div()
		this.saveButton = new Button("done", (this.saveHandler).bind(this))
		this.deleteButton = new Button("del", (this.del).bind(this))
		this.buttonContainer.append([this.saveButton.container, this.deleteButton.container])
		
		//Assemble
		this.container.append([this.contentContainer, this.buttonContainer])	
		this.mainForm.elementContainer.append(this.container)
	}
	
	saveHandler (){
		
		if(this.value == null){
			//Data were not initialized
			alert("Please set the output value")
		} else {
			if(this.saved == null){
				this.save()
			} else {
				this.edit()
			}
			this.saveButton.hide()
		}
	}
	
	addInput(uri){
		
		DTAJAX.call({
			task : "inputsExisting",
			subjectUri : subjectUri,
			dataTransformation : this.dataObject.dataTransformation,
			dataTransformationType : this.dataObject.dataTransformationType
		})
	}
	
	removeInput(uri){
		if(this.saved){
			dataController.removeInput(uri, this.dataObject.dataTransformation)	
		}
	}
	
	edit (){
		DTAJAX.call({
			task : "edit",
			measurementDatum : this.dataObject.measurementDatum,
			oldMeasurementValue : this.saved,
			newMeasurementValue : this.value,
		})
		this.saved = this.value
		this.saveButton.hide()
	}
	
	change (){
		
		this.value = this.dataField.val()
		if(this.saved == this.value){
			this.saveButton.hide()
		} else {
			this.saveButton.show()
		}
	}

	del (){
		
		if(this.saved){
			DTAJAX.call({
				task : "delete",
				subjectUri : subjectUri,
				dataTransformation : this.dataObject.dataTransformation,
				dataTransformationType : this.dataObject.dataTransformationType,
				measurementDatum : this.dataObject.measurementDatum,
				measurementDatumType : this.dataObject.measurementDatumType,
				measurementValue : this.saved,
			},(function(msg) {
					this.container.remove()
					this.mainForm.remove(this.dataObject.dataTransformationType)
					PopUpController.doneMsg("Data has been deleted")
				}).bind(this))
		} else {
			this.container.remove()
			this.parentForm.remove(this.dataObject)
		}
	}
	
	save (){
		DTAJAX.call({
			task : "createNew",
			dataTransformationType : this.dataObject.dataTransformationType,
			measurementValue : this.value,
			measurementValueType : this.dataObject.measurementValueType,
			measurementDatumType : this.dataObject.measurementDatumType
		}, (function(msg) {
			//Here the new URIs will be added to the dataObject
			$.extend(this.dataObject, msg.dataObject)
			this.saved = this.value
			this.mainForm.unsaved = false
			this.saveButton.hide()
		}).bind(this))
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

class ExistingDataTransformation extends DataTransformationItem {
	
	constructor(mainForm, dataObject){
		super(mainForm, dataObject)
		this.saved = dataObject.measurementValue
		this.value = dataObject.measurementValue
		this.dataField.val(dataObject.measurementValue)
	}

	init(dataObject){
		this.dataObject.measurementDatumTypeLabel = this.process(this.dataObject.measurementDatumType)
		this.dataObject.dataTransformationTypeLabel = this.process(this.dataObject.dataTransformationType)
		this.initUI()
		this.saveButton.hide()
	}
	
	addInput(){

		//Here we call the existing ones as well
		DTAJAX.call({
			task : "inputsExisting",
			subjectUri : subjectUri,
			dataTransformation : this.dataObject.dataTransformation,
			dataTransformationType : this.dataObject.dataTransformationType
		})
	}
}

