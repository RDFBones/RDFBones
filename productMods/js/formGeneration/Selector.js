

var Selector = function(def, formGenerator){
	
	this.formGenerator = formGenerator
	
	this.varName = def.varName,
	this.dataObject = {
		type : def.dataType
	}
	
	title = {
		uri : "",
		label : "Select " + def.title,
	}
	this.selected = false;
	def.dataSet.unshift(title)
	
	this.container = html.div()
	this.title = html.div("Title").text(def.title)
	
	this.selector = UI.classSelector(def.dataSet)
	this.selector.change((this.select).bind(this))

	this.container
		.append(this.title)
		.append(this.selector)
}

Selector.prototype = {
		
	select : function(){
		this.selected = true
		this.formGenerator.checkSubmission()
		this.dataObject.uri = this.selector.val()
		/*
		 * To implement the label of the selector
		 */
		this.dataObject.label = this.selector.find("option:selected").text()
	}
}
