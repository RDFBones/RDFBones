


var SelectorField = function(dataSet, changeFunction, config){
	
	this.container = html.div()
	this.selectorField = html.getSelectorField(config.id, config.name)
		.change(function(){
			changeFunction(this.value)
		})
		
	$.each(dataSet, (function(index, data) {
		$("<option/>", {
			value : data.uri,
			text : data.label,
		}).appendTo(this.selectorField)
	}).bind(this))
	
	this.container.append(this.selectorField)
}


SelectorField.prototype = {
	
	removeSelectorElement : function(){
		this.selectorField.find('option[value="SelectorElement"]').remove()
	},

	getText : function(){
		return this.selectorField.find('option:selected').text()
	}
}

var DataSetterSelectorField = function(dataSet, dataToSet, key){
	
	this.key = key
	this.dataToSet = dataToSet
	this.container = html.div("inline")
	this.selectorField = html.getSelectorField()
		.change((function(){
			this.dataToSet[this.key] = this.selectorField.val()
		}).bind(this))
		
	$.each(dataSet, (function(index, data) {
		$("<option/>", {
			value : data.uri,
			text : data.label,
		}).appendTo(this.selectorField)
	}).bind(this))
	this.container.append(this.selectorField)

}

