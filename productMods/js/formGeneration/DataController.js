
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
	
	prepareOptions : function(options){
		
		if(DataLib.getType(options) == "array"){
			console.log("array")
			var object = new Object
			$.each(options, function(key, value){
				object[value.uri] = new Object()
				object[value.uri]
				if(value.label === undefined){
					object[value.uri].label = value.uri.split["#"][1]
				} else {
					object[value.uri].label = value.label 
				}
			})
			return object
		} else {
			$.each(options, function(key, value){
				if(value.label === undefined){
					value.label = key.split("#")[1]
				}
			})	
			return options
		}
	},
	
	getLabel : function(object, key){
		
		if(object[key] === undefined){
			return "Unknown"
		}
		if(object[key].label !== undefined){
			return object[key].label
		} else {
			if(key.indexOf("#") > -1){
				return strUtil.splitLast(key, "#")
			} else {
				return strUtil.splitLast(key, "/")
			}
		}
	},
	
	getData : function(dataKey){
		if(formData[dataKey] !== undefined){
			return	formData[dataKey]
		} else {
			return dataFromAJAX[dataKey]
		}
	},
	
	loadSubformData : function(form){
	
		//PopUpController.init("Loading form data")
		var start = new Date()
		//Only one AJAX call comes
		dependentVars = new Object()
		$.each(form.descriptor.formElements, function(key, formElement){
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
					form.init(this.prepare(msg))
				}).bind(this))
		} else {
			form.init()
		}
	},

	loadSubFormDataAll : function(form, inputList){
		
		var dependentVars = new Object()
		$.each(form.descriptor.formElements, function(key, formElement){
			//Check if dependent or independent the data is
			if(key != form.dataKey){
				dataKey = DataController.getDataKey(key, formElement)
				dependentVars[dataKey] = DataController.getInputObject(form.parentForm, dataKey)
			} else {
				dependentVars[dataKey] = inputList
			}
		})

		var toSend = {
				editKey : editKey,
				arrayKey : form.dataKey,
				dependentVars : dependentVars,
			}
		toSend[form.dataKey] = inputList
		if(Object.keys(dependentVars).length > 0){
			$.ajax({
				type : 'POST',
				context : this,
				dataType : 'json',
				url : baseUrl + "formDataLoader",
				data : "requestData=" + JSON.stringify(toSend)})
				.done((function(msg) {
					form.initAll(msg)
				}).bind(this))
		} else {
			form.init()
		}
	},
	
	prepare : function(msg){
		var dataFromAJAX = new Object()
		$.each(msg, function(key, array){
			dataFromAJAX[key] = DataController.getObjectFormArray(array)
		})
		return dataFromAJAX
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
	
	getInputObject : function(form, dataKey){
		
		var msgObject = new Object()
		$.each(dataDependencies[dataKey], function(i, variable){
			if(form.dataObject[variable] !== undefined){
				msgObject[variable] = form.dataObject[variable]
			} else {
				parentContainer = form.parentForm
				while(true){
					if(parentContainer !== undefined){
						if(parentContainer.dataObject !== undefined){
							if(parentContainer.dataObject[variable] !== undefined){
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