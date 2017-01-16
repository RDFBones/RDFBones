
var SelectorField = function(dataSet, changeFunction, config) {

	this.container = html.div()
	this.selectorField = html.getSelectorField(config.id, config.name).change(
			function() {
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

	removeSelectorElement : function() {
		this.selectorField.find('option[value="SelectorElement"]').remove()
	},

	getText : function() {
		return this.selectorField.find('option:selected').text()
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
