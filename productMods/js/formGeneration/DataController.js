
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
		
		PopUpController.init()
		//Only one AJAX call comes
		varsThroughAjax = []
		$.each(form.formElementDescriptor, function(key, formElement){
			//Check if dependent or independent the data is
			dataKey = DataController.getDataKey(key, formElement)
			if(formData[dataKey] === undefined){
				//It is dependent variable
				inputObject = DataController.getInputObject(form, dataKey)
				varsThroughAjax.push(inputObject)
			}
		})
		
		if(varsThroughAjax.length > 0){
			$.ajax({
				type : 'POST',
				context : this,
				dataType : 'json',
				url : baseUrl + "formDataLoader",
				data : "requestData=" + JSON.stringify(varsThroughAjax)})
				.done((function(msg) {
					//We just copy the result to the dataFromAJAX variable
					DataController.setInputData(msg)
					DataController.done(form)
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
		msgObject["varToGet"] = dataKey
		console.log()
		$.each(dataDependencies[dataKey], function(i, variable){
			console.log(variable)
			if(subForm.dataObject[variable] !== undefined){
				msgObject[variable] = subForm.dataObject[variable]
			} else {
				/*
				 * The variable maybe in some upper parents
				 */
				/*
				parentContainer = subForm.parentContainer
				while(true){
					if(parentContainer != null){
						if(parentContainer.dataObject.dataKey == dataKey){
							msgObject[dataKey] = formContainer.dataObject.uri
							break
						} else {
							if(parentContainer.dataObject[dataKey] !== undefined){
								msgObject[dataKey] = parentContainer.dataObject[dataKey]
								break
							} else {
								parentContainer = parentContainer.parentContainer
							}
						}
					} else {
						console.log("Variable is not found")
						break
					}		
				} */
			}
		})
		return msgObject
	}
}