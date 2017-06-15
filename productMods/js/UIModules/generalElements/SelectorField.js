
class SelectorField {
	
	constructor(dataSet, changeFunction, config) {

		this.container = html.div("inline")
		if(config == undefined){
			config = { id : "id", name : "name"}
		}
		this.config = config
		this.selectorField = html.getSelectorField(config.id, config.name).change(
				function() {
					changeFunction(this.value)
				})
		this.initOptions(dataSet);
		this.container.append(this.selectorField)
	}
	
	initOptions(dataSet){

		var value = util.setUndefined(this.config["value"], "uri")
		var text = util.setUndefined(this.config["text"], "label")
		$.each(dataSet, (function(index, data) {
			$("<option/>", {
				value : data[value],
				text : data[text],
			}).appendTo(this.selectorField)
		}).bind(this))
	}

	set(value) {
		this.selectorField.val(value)
	}
	
	removeSelectorElement() {
		this.selectorField.find('option[value="SelectorElement"]').remove()
	}

	getText (){
		return this.selectorField.find('option:selected').text()
	}
	
	val(){
		return this.selectorField.val()
	}
}


var DataSetterSelectorField = function(dataSet, changeFunction) {

	this.container = html.div("inline")
	this.changeFunction = changeFunction
	this.selectorField = html.getSelectorField().change((function() {
		this.changeFunction(this.selectorField.val())
	}).bind(this))
	this.setSelector(dataSet)
	this.container.append(this.selectorField)
}

DataSetterSelectorField.prototype = {

	set : function(value) {
		this.selectorField.val(value);
	},

	setSelector : function(dataSet) {
		$.each(dataSet, (function(index, data) {
			$("<option/>", {
				value : data.uri,
				text : data.label,
			}).appendTo(this.selectorField)
		}).bind(this))
	}
}

var DataSetterSelectorFieldMap = function(dataSet, changeFunction) {

	DataSetterSelectorField.call(this, dataSet, changeFunction)
}

DataSetterSelectorFieldMap.prototype = $.extend(Object
		.create(DataSetterSelectorField.prototype), {

	setSelector : function(dataSet) {
		$.each(dataSet, (function(key, data) {
			$("<option/>", {
				value : key,
				text : data.label,
			}).appendTo(this.selectorField)
		}).bind(this))
	}
})

class SelectorElement {
	
	constructor(data, customValueKey, customTextKey){
		
		this.data = data
		this.options = DataController.prepareOptions(data)
		this.container = html.selectorMap(this.options, customValueKey, customTextKey)
	}

	refresh (data){
		this.container = html.selectorMap(DataController.prepareOptions(data))
	}
	
	val(){
		return this.container.val()	
	}

	text(){
		return this.container.find('option:selected').text()
	}
}
