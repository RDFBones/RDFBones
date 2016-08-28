

var SelectorAddField = function(configData){
	
	this.container = html.form("/newInstance", configData.id)
	this.title = html.div("title").text(configData.title)
	this.hidden = html.hiddenInput("label")
	this.select = html.div("addFieldContainer").css("margin-left", "15px")
	
	console.log(configData.listElements)
	
	var selectorConfig = {
		id : configData.id,
		name : "classUri",
	}
	
	this.selector = new SelectorField(configData.listElements,
			(this.setLabel).bind(this), selectorConfig)
	
	this.submit = html.submit("Create")
	
	this.container
		.append(this.title)
		.append(this.select
				.append(this.selector.container.addClass("inline")))
		.append(this.hidden)
		.append(this.submit)	
}

SelectorAddField.prototype = {
		
	setLabel : function(){
		this.hidden.attr("value", this.selector.getText());
	}
}


