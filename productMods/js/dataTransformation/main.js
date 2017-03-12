
class Main {
	
	constructor(){
	
		this.loadExistingData()
	}
	
	loadExistingData(){
		
		DTAJAX.call({
			task : "initial"
		}, (this.init).bind(this))
	}
	
	init (msg){
		
		this.selector = new SelectorElement(msg.dataTransformations)
		this.items = []
		this.initUI()
		this.existingData = this.filter(msg.existingData)
		$.each(this.existingData, (function(key, value){
			console.log(value)
			this.items.push(new ExistingDataTransformation(this, value).container)
		}).bind(this))
	}
	
	initUI(){
		
		this.container = html.div()
		this.selectorCont = html.div("title")
		this.addButton = new TextButton("Add", (this.addElement).bind(this))
		this.selectorCont.append([this.selector.container, this.addButton.container])
		this.elementContainer = html.div("margin10")
		this.elementContainer.append(this.items)
		this.doneButton = new TextButton("Done", util.redirect, null, "margin15V")
		this.container.append([this.selectorCont, this.elementContainer, this.doneButton.container])
		$("#form").append(this.container)
	}
	
	addElement(){
		
		if(this.unsaved){
			alert("Please finish editing current data transformation")
		} else {
			this.unsaved = true
			var object = {
				dataTransformationType : this.selector.val(),
				dataTransformationTypeLabel : this.selector.text()
			}
			new DataTransformationItem(this, object)
		}
	}
	
	remove (data){
		this.selector.append(this.optionMap[data.sexScore])
		this.cnt++
		this.refreshSelector()
	}
	
	filter(existingData){
		var output = []
		var object = new Object()
		$.each(existingData, function(key, value){
			if(object[value.dataTransformation] === undefined){
				output.push(value)
				object[value.dataTransformation] = true
			}
		})
		return output
	}
}

























	
