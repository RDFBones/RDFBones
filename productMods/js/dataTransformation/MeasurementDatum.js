
class MeasurementDatum {
	
	constructor(form, dataKey, dataObject){
	
		this.form = form
		this.dataObject = dataObject
		this.dataKey = dataKey
		this.initUI()
	}
	
	initUI(){
	
		//Output data container
		this.container = html.div("inline margin10H")
		util.setLabel(this.dataObject, "type", "label")
		this.measDatumLabelDiv = html.div("inlineTitle").text((this.dataObject.label))
	
		if(this.dataObject.dataType !== undefined){
			this.floatMode = true
			this.precision = 0.01 
			this.dataField = UI.floatInput(this.precision).change((this.changeFloat).bind(this)).addClass("inline margin15H")
			this.dataField.val(0.00)
			this.okButton = new Button("done", (this.save).bind(this)).hide()
			this.container.append([this.measDatumLabelDiv, this.dataField, this.okButton.container])
		} else {
			this.floatMode = false
			this.selector = new SelectorField(this.dataObject.instances, (this.changeInstance).bind(this))
			this.selector.set(this.dataObject.value)
			this.container.append([this.measDatumLabelDiv, this.selector.container])
		}
	}
	
	changeFloat(){
		this.dataObject.newValue = this.dataField.val()
		this.okButton.show()
	}

	changeInstance(){
		this.dataObject.newValue = this.selector.val()
		this.save()
	}

	save(){
		this.form.change(this)
		if(this.floatMode) this.okButton.hide()
		this.dataObject.value = this.dataObject.newValue
	}
	
}


//The MeasurementDatum class gets the form descriptor


