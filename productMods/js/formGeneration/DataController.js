var DataController = {

		
	errorCount : 0,	
	id : 0,
	getId : function() {

		this.id++;
		return "elementId" + this.id
	},

	loadSubformData : function(form) {

		// PopUpController.init("Loading form data")
		var start = new Date()
		// Only one AJAX call comes
		dependentVars = new Object()
		$.each(form.descriptor.formElements, function(key, formElement) {
			if (formElement.type != "instanceSelector") {
				// Check if dependent or independent the data is
				var dataKey = formElement.dataKey
				if (Global.dataDependencies[dataKey] !== undefined) {
					dependentVars[dataKey] = DataController.getInputObject(
							form, dataKey)
				}
			}
		})
		var toSend = {
			editKey : editKey,
			dependentVars : dependentVars,
		}
		
		if (Object.keys(dependentVars).length > 0) {
			this.callAjax(form, toSend, true)
		} else {
			form.init()
		}
	},

	callAjax : function(form, toSend, firstTry){
		
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "formDataLoader",
			data : "requestData=" + JSON.stringify(toSend),
			error : (function(){
				this.errorCount++;
				if(firstTry){
					console.log("FirstTry")
					this.callAjax(form, toSend, false)
				} else {
					alert("Something went wrong. Please reload the page and try again!")
				}
			}).bind(this)
		}).done((function(msg) {
			form.init(this.prepare(msg))
		}).bind(this))
	},
	
	getGraphDataParams : function(instanceSelector) {

		var dataKey = instanceSelector.dataKey
		var dependentVars = new Object()
		if (Global.dataDependencies[dataKey] !== undefined) {
			dependentVars = DataController.getInputObject(
					instanceSelector.formElement.parentForm, dataKey)
		}
		return [dependentVars, dataKey]
	},

	loadSubFormDataAll : function(form, inputList) {
		
		var dependentVars =new Object()
		$.each(form.descriptor.formElements, function(key, formElement) {
			// Check if dependent or independent the data is
			if (key != form.dataKey) {
				dataKey = formElement.dataKey
				dependentVars[dataKey] = DataController.getInputObject(
						form.parentForm, dataKey)
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
		if (Object.keys(dependentVars).length > 0) {
			$.ajax({
				type : 'POST',
				context : this,
				dataType : 'json',
				url : baseUrl + "formDataLoader",
				data : "requestData=" + JSON.stringify(toSend)
			}).done((function(msg) {
				form.initAll(msg)
			}).bind(this))
		} else {
			form.init()
		}
	},

	getInputObject : function(form, dataKey) {

		var msgObject = new Object()
		$.each(Global.dataDependencies[dataKey], function(i, variable) {
			
			if (form.dataObject[variable] !== undefined) {
				msgObject[variable] = form.dataObject[variable]
			} else {
				parentContainer = form.parentForm
				while (true) {
					if (parentContainer !== undefined && parentContainer != null) {
						if (parentContainer.dataObject !== undefined) {
							if (parentContainer.dataObject[variable] !== undefined) {
								msgObject[variable] = parentContainer.dataObject[variable]
								break
							} else {
								parentContainer = parentContainer.parentForm
							}
						} else {
							parentContainer = parentContainer.parentForm
						}
					} else {
						console.log("Variable " + variable + " is not found ")
						break
					}
				}
			}
		})
		return msgObject
	},

	prepare : function(msg) {
		var dataFromAJAX = new Object()
		$.each(msg, function(key, array) {
			dataFromAJAX[key] = DataController.getObjectFormArray(array)
		})
		return dataFromAJAX
	},

	getObjectFormArray : function(arr) {
		var obj = new Object()
		$.each(arr, function(i, element) {
			obj[element.uri] = new Object()
			if (element.label !== undefined) {
				obj[element.uri].label = element.label
			}
		})
		return obj
	},

	prepareOptions : function(options) {

		if (DataLib.getType(options) == "array") {
			var object = new Object
			$.each(options, function(key, value) {
				object[value.uri] = new Object()
				if (value.label === undefined) {
					object[value.uri].label = (value.uri).split("#")[1]
				} else {
					object[value.uri].label = value.label
				}
			})
			return object
		} else {
			$.each(options, function(key, value) {
				if (value.label === undefined) {
					value.label = key.split("#")[1]
				}
			})
			return options
		}
	},
	
	getLabel : function(object, key) {

		if (object[key] === undefined) {
			return "Unknown"
		}
		if (object[key].label !== undefined) {
			return object[key].label
		} else {
			if (key.indexOf("#") > -1) {
				return strUtil.splitLast(key, "#")
			} else {
				return strUtil.splitLast(key, "/")
			}
		}
	},

	getData : function(dataKey) {
		if (formData[dataKey] !== undefined) {
			return formData[dataKey]
		} else {
			return dataFromAJAX[dataKey]
		}
	},

}

var AJAX = {

	errorhandling : function(msg) {

		if (msg.errormsg !== undefined) {
			PopUpController.note(msg.errormsg)
		}
	},

	call : function(task, returnFunction, array) {

		if (jsonTest && jsonMapping[task] !== undefined) {
			returnFunction(jsonMapping[task])
		} else {
			if (array !== undefined) {
				request = this.requestObject(task, array)
			} else {
				request = this.requestTask(task)
			}
			$.ajax(request).done(function(msg) {
				if (msg.errormsg !== undefined) {
					PopUpController.note(msg.errormsg)
				} else {
					returnFunction(msg)
				}
			})
		}
	},

	requestTask : function(task) {
		return AJAX.requestData({
			editKey : editKey,
			task : task,
		})
	},

	requestObject : function(task, array) {
		return AJAX.requestData($.extend({
			editKey : editKey,
			task : task,
		}, AJAXParams.getObject(task, array)))
	},

	requestData : function(object) {
		
		return $.extend(AJAX.base, {
			data : "requestData=" + JSON.stringify(object)
		})
	},

	base : {
		type : 'POST',
		dataType : 'json',
		url : baseUrl + "ajaxservlet",
	},
}

var AJAXParams = {

	formGraphData : [ "inputParameters", "key" ],
	existingFormGraphData : [ "subjectUri", "objectUri"],
	formSubmission : [ "dataToStore"],
	editData : ["variableToEdit", "graphData", "newValue"],
	addTriple : ["variableToEdit", "graphData"],
	removeTriple : ["variableToEdit", "graphData"],
	deleteFormData : ["formKey", "graphData"],
	deleteAll : ["graphData"],
	addFormData : ["formKey", "parentData", "formData"],
	getObject : function(key, array) {

		if (this[key] !== undefined && DataLib.isArray(this[key])) {
			var object = new Object()
			$.each(this[key], function(index, value) {
				object[value] = array[index]
			})
			return object
		} else {
			alert("Invalid AJAX parameter : " + key)
			return null
		}
	}
}
