
class DataTransformationItem {

	constructor(mainForm, dataObject){
		this.mainForm = mainForm
		this.dataObject = dataObject
		this.dataObject.inputs = []
		this.init()
	}
	
	init(){
	
		this.value = null
		this.saved = null
		this.dataObject.task = "saveForm",
		DTAJAX.call(this.dataObject, (function(msg){
			this.dataObject = $.extend(this.dataObject, msg)
			this.dataObject.inputs = []
			this.initUI()
			this.mainForm.refresh()
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
		this.button = new TextButton("Select",  (this.showInputs).bind(this), null, "inline")
		this.inputCont.append([this.inputTitle, this.button.container])
		
		//Output
		this.outputCont = html.div("flexInlineContainer margin10H")
		this.outputTitle = html.div("dt_title").text("Output data")
		this.outputMD = new MeasurementDatum(this, "measurementDatum", this.dataObject.measurementDatum)
		
		this.outputCont.append([this.outputTitle, this.outputMD.container])
		this.contentContainer.append([this.title, this.inputCont, this.outputCont])

		// Delete button
		this.deleteButton = new Button("del", (this.del).bind(this))
	
		//Assemble
		this.container.append([this.contentContainer, this.deleteButton.container])	
		this.mainForm.elementContainer.append(this.container)
	}
	
	/*
	change (){
		
		this.value = parseFloat(this.dataField.val()).toFixed(2)
		if(this.saved == this.value){
			this.saveButton.hide()
		} else {
			this.saveButton.show()
		}
	}
	*/
	
	change(element){
		
		DTAJAX.call({
			task : "editData",
			dataKey : element.dataKey,
			dataObject : element.dataObject,
		}, null)
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
	
	showInputs(uri){

		//Here we call the existing ones as well
		//if(this.inputSelector === undefined){
		this.dataObject.task = "inputData"
		DTAJAX.call(this.dataObject, (function(msg){
			this.inputSelector = new InputSelector(this, msg.possibleInputs, msg.exsistingInputs)
		}).bind(this), false)
		//} else {
		//this.inputSelector.display()
		//}
	}	

	addInput(uri){
		this.dataObject.task = "addInput",
		this.dataObject.input = uri
		this.dataObject.inputs.push(uri)
		DTAJAX.call(this.dataObject, null, false)
	}
	
	removeInput(uri){	
		this.dataObject.task = "removeInput",
		this.dataObject.input = uri
		this.dataObject.inputs.removeElement(uri)
		DTAJAX.call(this.dataObject, null, false)
	}

	edit (){
		DTAJAX.call({
			task : "edit",
			measurementDatum : this.dataObject.measurementDatum,
			measurementValueType : this.dataObject.measurementValueType,
			oldMeasurementValue : this.saved,
			newMeasurementValue : this.value,
		})
		this.saved = this.value
		this.saveButton.hide()
	}
	
	del (){
	
		this.dataObject.task = "del"
		DTAJAX.call(this.dataObject, (function(msg) {
			this.container.remove()
			this.mainForm.remove(this.dataObject.dataTransformationType)
			PopUpController.doneMsg("Data has been deleted")
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
	}

	init(dataObject){
		this.initUI()
	}
}

var dTItemDescriptor = [
	{
		title : "Input data",
		dataKey : "inputData",
		type : "instanceSelector"
	},{
		title : "Output data",
		dataKey : "measurementDatum",
		type : "measurementDatum",
	}	
]