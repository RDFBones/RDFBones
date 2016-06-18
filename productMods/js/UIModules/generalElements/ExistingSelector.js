


var ExistingSelector = function(parentField, customClass, varName, set, dataReference){
	
	//This gets the object, an it has to create the new field based on the 
	// 
	this.parentField = parentField
	this.customClass = customClass
	this.dataReference = dataReference
	this.varName = varName
	
	this.prepareSet(set)
	
	this.container = html.div("dataForm")
	this.classContainer = html.div("title").text(classConfiguration[customClass].fieldMsg)
	this.selector = new SelectorField(this.set, (this.setData).bind(this))
	
	this.container
		.append(this.classContainer)
		.append(this.selector.container)
		
	this.selectedOnce = false
}


ExistingSelector.prototype = {


	prepareSet : function(set){
		this.set = []
		this.set.push({
			value : "SelectorElement",
			text : "Please select a value"
		})
		$.each(set, (function(i, element){
			this.set.push({
				value : element,
				text : data[element].label
			})
		}).bind(this))
	},
	
	setData : function(selectedValue){
		console.log(this)
		if(!this.selectedOnce){
			this.selector.removeSelectorElement()
			this.selectedOnce = true
		} 
		console.log(selectedValue)
		this.parentField.setData(this.varName)
	}

} 