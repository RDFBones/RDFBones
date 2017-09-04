
class FormElement {
	
	constructor(form, descriptor, formOptions, predicate) {
		this.parentForm = form
		this.descriptor = descriptor
		this.dataKey = descriptor.dataKey
		if(formOptions !== undefined && formOptions[this.dataKey] !== undefined){
			this.options = DataController.prepareOptions(formOptions[this.dataKey])
		} else {
			this.options = new Object()
		}
		this.predicate = predicate
		this.dataObject = form.dataObject
		this.initUI()
		this.initData()
	}
}

class LiteralField extends FormElement {
	
	initUI(){
	
		this.container = html.div()
		this.titleField = html.div("inline").text(this.descriptor.title);
		this.inputField = html.textBox("inline margin10H").on('input', (function() {
		   this.dataObject[this.dataKey] = this.inputField.val()
		}).bind(this))
		this.container.append(this.titleField, this.inputField)
	}

	initData(){
		if (this.dataObject[this.dataKey] !== undefined) {
			this.inputField.val(this.dataObject[this.dataKey].split(".")[0])
		}
	}
}

class Selector extends FormElement{
	
	initUI () {
		
		this.container = html.div("elementContainer")
		this.selector = new DataSetterSelectorFieldMap(this.options,
				(this.changeData).bind(this))
	
		if(this.descriptor.title.length > 1){
			this.title = html.div("inline").text(this.descriptor.title)
			this.container.append([this.title, this.selector.container])
		} else {
			this.container.append(this.selector.container)	
		}
	}

	initData () {
		if (this.dataObject[this.dataKey] !== undefined) {
			this.selector.set(this.dataObject[this.dataKey])
			this.edit = true
		} else {
			this.edit = false
			this.dataObject[this.dataKey] = Object.keys(this.options)[0]
		}
	}

	changeData (selectedValue) {
		if(this.edit){
			PopUpController.init("Please wait ...")
			AJAX.call("editData", function(){
				PopUpController.done()
			}, [this.dataKey, dataUtil.getStrings(this.dataObject), selectedValue])
		}
		this.dataObject[this.dataKey] = selectedValue
	}	
}


class AuxNodeSelector extends Selector{
	
	changeData (selectedValue) {
		this.dataObject[this.dataKey] = selectedValue
	}
}


class Adder extends FormElement{
	
	initUI () {
		
		this.container = html.div("adderContainer")
		this.title = html.div("inline").text(this.descriptor.title)
		this.selector = UI.classSelectorMap(this.options)
		this.addButton = new TextButton("Add", (this.add).bind(this))
		this.addAllButton = new TextButton("Add all", (this.addAll).bind(this))
		this.subContainer = html.div("subContainer")
		this.container.append(this.title).append(this.selector).append(
				this.addButton.container)
		if (Object.keys(this.options).length > 1)
			this.container.append(this.addAllButton.container)
		this.container.append(this.subContainer)
	}

	initData () {

		this.subContainers = []
		this.subForms = []
		if (this.dataObject[this.predicate] !== undefined) {
			this.dataArray = this.dataObject[this.predicate]
			this.addedUris = array.get(this.dataArray, this.dataKey)
			this.edit = true
			this.showExistingData()
		} else {
			this.edit = false
			this.dataArray = []
			this.addedUris = []
			this.dataObject[this.predicate] = this.dataArray
		}
	}

	showExistingData () {
		
		$.each(this.dataArray, (function(i, object) {
			var option = this.options[object[this.dataKey]]
			object[this.dataKey + "Label"] = option.label
			this.subForms.push(new ExistingForm(this, this.descriptor, object))
		}).bind(this))
		UI.appendToDiv(this.subContainer, this.subForms)
	}

	add () {

		if (this.addAllFlag) {
			PopUpController.note("All types have been already added!")
		} else if (this.dataArray.getObjectByKey(this.dataKey, this.selector
				.val()) != null) {
			var text = this.selector.find(
					"option[value='" + this.selector.val() + "']").text()
			PopUpController.note(text + " have already been added!");
		} else {
			var object = new Object()
			object[this.dataKey] = this.selector.val()
			object[this.dataKey + "Label"] = this.options[this.selector.val()].label
			this.addedUris.push(this.selector.val())
			this.dataArray.push(object)
			if(this.edit){
				// Adding new data
				PopUpController.addSubWaitGifText(this.subContainer, "Adding new form")
				this.cnt = 1
				this.subForms.push(new EditSubForm(this, this.descriptor, object))	
			} else {		
				PopUpController.addSubWaitGif(this.subContainer)
				this.subForms.push(new SubForm(this, this.descriptor, object))	
			}
		}
	}
	
	ready (container){
		this.subContainers.push(container)
		if(--this.cnt == 0){
			this.subContainer.prepend(this.subContainers)
			this.subContainers = []
			PopUpController.remove()
		}
	}
	
	addAll () {
		var remainingKeys = array.substract1(Object.keys(this.options), this.addedUris)
		this.addedUris = Object.keys(this.options)
		if(remainingKeys.length > 0){
				PopUpController.addSubWaitGif(this.subContainer, "Adding new subforms")
				this.cnt = 0
				this.numOfForms = remainingKeys.length
				DataController.loadSubFormDataAll(this, remainingKeys)
		} else {
			PopUpController.note("All types have been already added!")
		}
	}

	
	initAll (data) {

		this.cnt = 0
		this.addedForms = []
		$.each(data, (function(key, value) {
			// The key is the uri
			if(key != "queries"){
				this.cnt++
				var object = new Object()
				object[this.dataKey] = key
				object[this.dataKey + "Label"] = this.options[key].label
				this.dataArray.push(object)
				if(this.edit){
					this.subForms.push(new EditSubForm(this, this.descriptor, object))
				} else {
					this.subForms.push(new SubFormAll(this, this.descriptor, object))
				}
			}
		}).bind(this))
	}

	readyAll (form){
		
		this.addedForms.push(form.container)
		if(--this.cnt == 0){
			this.subContainer.append(this.addedForms)
			PopUpController.remove()
			this.addedForms = []
		}
	}
	
	deleteElement(formElement){
		formElement.container.remove()
		var key = formElement.dataObject[formElement.descriptor.dataKey]
		DataLib.removeObjectFromArrayByKey(this.dataArray, formElement.dataObject, key)
		this.addedUris.removeElement(key)
	}
}

class StringInput {
	
	constructor(descriptor) {

		if (descriptor.arrangement !== undefined) {
			this.container = html.div("inlineContainer inline");
		} else {
			this.container = html.div("inlineContainer");
		}
		this.title = html.div("margin10").text(descriptor.name)
		this.textBoxDiv = html.div().append(html.textBox())
		// this.textBox = html.textBox()
		this.container.append(this.title).append(this.textBoxDiv)
	}
}

class InstanceSelector extends FormElement {
	
	initUI () {
		this.container = html.div("elementContainer")
		this.title = html.div("formTitleInline").text(this.descriptor.title)
		this.textButton = new TextButton("Select", (this.loadTableData).bind(this), "inline") 
		this.container.append([this.title, this.textButton.container])
	}

	initData () {

		if(this.dataObject[this.predicate] !== undefined){
			this.existingData = this.dataObject[this.predicate]
		} else {
			this.existingData = []
			this.dataObject[this.predicate] = this.existingData
		}
	}

	loadTableData () {

		// if(this.instanceBrowser != undefined){
		// this.instanceBrowser.display()
		// } else {
		if (this.descriptor.table != undefined) {
			if(objectUri !== null){
				this.instanceBrowser = new EditInstanceBrowser(this)
			} else {
				this.instanceBrowser = new InstanceBrowser(this)
			}
		} else {
			alert("Table is not defined")
		}	
		// }
	}	
}
