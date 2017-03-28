
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
		
		this.allAdded = false
		this.addedDTs = new Object()
		this.selector = new SelectorElement(msg.dataTransformations)
		this.items = []
		this.initUI()
		this.prefix = msg.prefix
		//this.existingData = //this.filter(msg.existingData)
		$.each(msg.existingData, (function(key, value){
			console.log(value)
			this.addedDTs[value.dataTransformationType] = true
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
	
		if(!this.allAdded){
			if(this.unsaved){
				alert("Please finish editing current data transformation")
			} else {
				this.unsaved = true
				var object = {
					dataTransformationType : this.selector.val(),
					dataTransformationTypeLabel : this.selector.text(),
					prefix : this.prefix
				}
				this.addedDTs[this.selector.val()] = true
				new DataTransformationItem(this, object)
			}
		} else {
			alert("All possible data transformations have been added")
		}
	}

	refresh(){
	
		DTAJAX.call({
			task : "refresh"
		}, (this.refreshSelector).bind(this))
	}
	
	refreshSelector(msg){
		if(msg.dataTransformations.length == 0){
			this.allAdded = true
			this.selector = new SelectorElement({
				uri : "",
				label : "All possible data transformations have been added"
			})
		} else {
			this.selector.container.remove()
			this.selector = new SelectorElement(msg.dataTransformations)
			this.selectorCont.prepend(this.selector.container)
		}
	}
	
	remove (dataTransformationType){
		//Remove the key
		delete this.addedDTs[dataTransformationType]
	}
	
	filter(existingData){
		var output = []
		var object = new Object()
		$.each(existingData, function(key, value){
			if(value.dataTransformationType != 
				"http://purl.obolibrary.org/obo/OBI_0200000"){
				output.push(value)
				object[value.dataTransformation] = true
			}
		})
		return output
	}
}
