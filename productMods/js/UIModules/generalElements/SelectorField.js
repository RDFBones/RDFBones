


var SelectorField = function(dataSet, changeFunction){
	
	this.container = html.div()
	this.selectorField = html.getSelectorField()
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

