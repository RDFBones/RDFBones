


var CustomSelector = function(data, uri, data, returnFunction){
	
	this.value = value
	this.text = text
	this.data = data
	this.returnFunction = returnFunction
	this.container = html.div("addFieldContainer")
	this.initFields()
	this.initButton()
}


CustomSelector.prototype = {
		
	initFields : function(){
		
		this.selectorField = html.getSelectorField()
		$.each(dataSet, (function(index, data) {
			$("<option/>", {
				value : data[this.value],
				text : data[this.text],
			}).appendTo(this.selectorField)
		}).bind(this))
		this.container.append(this.selectorField)
	},

	addEvent : function(){
		this.returnFunction(this.selectorField.val())
	},

	addButton : function(){
		this.button = new Button("add", (this.addEvent).bind(this))
		this.container.append(this.button.container)
	},
	
	disableAdd : function(){
		this.button.disable()
	},

	enableAdd : function(){
		this.button.disable()
	}
}
