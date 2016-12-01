
var DataController = {
	
	/*
	 * This function only retrieves the data from the JavaScript 
	 * does not call any JSON
	 */
	getDataKey : function(key, form){
		if(form.dataKey !== undefined){
			return form.dataKey
		} else {
			return key
		}
	},
	
	prepareOptions : function(object){
		
		$.each(object, function(key, value){
			if(value.label === undefined){
				value.label = key.split("#")[1]
			}
		})
	},
	
	getLabel : function(value){
		return value.split("#")[1]
	},
	
	getData : function(dataKey){
		if(formData[dataKey] !== undefined){
			return	formData[dataKey]
		} else {
			return dataFromAJAX[dataKey]
		}
	},
	
	loadSubformData : function(form){
	
		PopUpController.init("Loading form data")
		var start = new Date()

		//Only one AJAX call comes
		dependentVars = new Object()
		$.each(form.formElementDescriptor, function(key, formElement){
			//Check if dependent or independent the data is
			dataKey = DataController.getDataKey(key, formElement)
			dependentVars[dataKey] = DataController.getInputObject(form, dataKey)
		})
		var toSend = {
			editKey : editKey,
			dependentVars : dependentVars,
		}
		if(Object.keys(dependentVars).length > 0){
			$.ajax({
				type : 'POST',
				context : this,
				dataType : 'json',
				url : baseUrl + "formDataLoader",
				data : "requestData=" + JSON.stringify(toSend)})
				.done((function(msg) {
					//We just copy the result to the dataFromAJAX variable
					PopUpController.doneTime(start, 500, function(){
						DataController.setInputData(msg)
						DataController.done(form)
					})
				}).bind(this))
		} else {
			DataController.done(form)
		}
	},

	done : function(form){
		PopUpController.done()
		form.init();
	},
	
	setInputData : function(msg){
		dataFromAJAX = new Object()
		$.each(msg, function(key, array){
			dataFromAJAX[key] = DataController.getObjectFormArray(array)
		})
	},
	
	getObjectFormArray : function(arr){
		var obj = new Object()
		$.each(arr, function(i, element){
			obj[element.uri] = new Object()
			if(element.label !== undefined){
				obj[element.uri].label = element.label
			}
		})
		return obj
	},
	
	getInputObject : function(subForm, dataKey){
		
		
		var msgObject = new Object()
		console.log("subForm")
		console.log(subForm)
		$.each(dataDependencies[dataKey], function(i, variable){
			console.log(variable)
			console.log(subForm.dataObject)
			if(subForm.dataObject[variable] !== undefined){
				msgObject[variable] = subForm.dataObject[variable]
				console.log()
			} else {
				parentContainer = subForm.parentForm
				while(true){
					console.log("ParentSearch")
					console.log(parentContainer)
					if(parentContainer !== undefined){
						if(parentContainer.dataObject !== undefined){
							if(parentContainer.dataObject[variable] !== undefined){
								console.log("DataKey Found : " + variable)
								msgObject[variable] = parentContainer.dataObject[variable]
								break
							} else {
								parentContainer = parentContainer.parentForm
							}
						} else {
							parentContainer = parentContainer.parentForm
						}
					} else {
						console.log("Variable is not found")
						break
					}		
				} 
			}
		})
		return msgObject
	}
}