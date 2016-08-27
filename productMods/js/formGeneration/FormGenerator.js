

var FormGenerator = function(){
	
	this.initElements()
}

FormGenerator.prototype = {
		
	initElements : function(){

		//Form Elements
		var elements = []
		$.each(formElements, (function(i, value){
			switch(value.type){
			case "selector" : 
				elements.push(new Selector(value, this))
			}
		}).bind(this))
		//SubmitButton
		containers = []
		
		$.each(elements, function(i, element){
			containers.push(
					html.div("margin10").append(element.container))
		})
		
		this.elements = elements
		this.submitButton = new TextButton("Submit", (this.submit).bind(this)).disable()
		containers.push(this.submitButton.container)
		
		$("#form").append(containers)	
	},
	
	checkSubmission : function(){
		
		flag = true
		$.each(this.elements, function(i, value){
			if(!value.selected){
				flag = false
				return false
			}
		})
		
		if(flag){
			this.submitButton.enable()
		} else {
			this.submitButton.disable()
		}
	},
		
	submit : function(){
		
		//Assemble the JSON objects to store
		var dataToStore = new Object()
		$.each(formElements, function(i, element){
			dataToStore[element.varName] = element.dataObject
		})

		dataToStore["operation"] = dataOperation
		
		$.each(globalVarsToSend, function(i, element){
			dataToStore[element.key] = pageData[element.value]
		})
		
		/*
		 * These data is configuration data 
		 */
		
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataInput",
			data : "dataToStore=" + JSON.stringify(dataToStore)})
			.done((function(msg) {

				window.location = baseUrl
						+ "pageLoader?"
						+ DataLib.getUrl(urlObject)
			}).bind(this))
	}
}