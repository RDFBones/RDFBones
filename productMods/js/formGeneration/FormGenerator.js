

var FormGenerator = function(){
	
	this.initElements()
}

FormGenerator.prototype = {
		
	initElements : function(){

		//Form Elements
		this.elements = []
		$.each(formElements, (function(i, value){
			switch(value.type){
			case "selector" : 
				this.elements.push(new Selector(value, this))
			}
		}).bind(this))
		//SubmitButton
		containers = []
		
		$.each(this.elements, function(i, element){
			containers.push(
					html.div("margin3").append(element.container))
		})
		
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
		$.each(this.elements, function(i, element){
			dataToStore[element.varName] = element.dataObject
		})
		
		
		ext = this.generateSubmissionMap()
		$.extend(dataToStore, ext)
		
		dataToStore.operation = dataOperation
		
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataInput",
			data : "dataToStore=" + JSON.stringify(dataToStore)})
			.done((function(msg) {

				window.location = baseUrl
						+ "pageLoader?"
						+ DataLib.getUrl(this.generateRedirectMap(msg.object))	
							
			}).bind(this))
	},
	
	generateSubmissionMap : function(){
		
		var obj = new Object()
		$.each(submitConfig, function(index, value){
			if(value.value === undefined){
				//Constant
				if(value.varName === undefined){
					obj[value.key] = pageData[value.key]
				} else {
					obj[value.varName] = pageData[value.key]
				}
			} else {
				obj[value.varName] = value.value
			}
		})
		return obj 
	},
	
	generateRedirectMap : function(returnObject){
		
		var obj = new Object()
		$.each(redirectConfig, function(index, value){
			if(value.type == "SUBMISSIONDATA"){
				if(value.varName === undefined){
					obj[value.key] = returnObject[value.key].uri
				} else {
					obj[value.varName] = returnObject[value.key].uri
				}
			} else{
				if(value.value === "undefined"){
					//Constant
					if(value.varName === undefined){
						obj[value.key] = pageData[value.key]
					} else {
						obj[value.varName] = pageData[value.key]
					}
				} else {
					obj[value.varName] = value.value
				}
			}

		})
		return obj 
	}
}