
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
		$.each(msg.existingData, (function(key, value){
			this.items.push(new ExistingDataTransformation(this, value).container)
		}).bind(this))
		this.initUI()
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
		
		new DataTransformationItem(this, this.selector.val(), 
					this.selector.text())
	}
	
	remove (data){
		this.selector.append(this.optionMap[data.sexScore])
		this.cnt++
		this.refreshSelector()
	}
}

























	
