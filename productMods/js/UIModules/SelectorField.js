


var SelectorField = function(dataSet, changeFunction){
	
	console.log(dataSet)
	this.container = html.div()
	this.selectorField = html.getSelectorField()
		.change(function(){
			changeFunction(this.value)
		})
	
	$.each(dataSet, (function(index, data) {
		$("<option/>", {
			value : data["value"],
			text : data["text"],
		}).appendTo(this.selectorField)
	}).bind(this))
	
	this.container.append(this.selectorField)
}


SelectorField.prototype = {
		
	removeSelectorElement : function(){
		this.selectorField.find('option[value="SelectorElement"]').remove()
	}
}


