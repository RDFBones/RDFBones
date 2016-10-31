
var DataController = {
	
	/*
	 * This function only retrieves the data from the JavaScript dataset
	 */
	getData : function(form){
		
		//Init 
		if(formData[form.descriptor.dataKey] !== undefined){
			return formData[form.descriptor.dataKey]
		} else {
			//Now only one is assigned
			return arrivedDependentData[form.descriptor.dataKey]	
			//AJAX Call -> Implemented later
		}
	},
	
	loadSubformData : function(subForm){
		
		PopUpController.init()
		//Only one AJAX call comes
		varsThroughAjax = []
		$.each(subForm.descriptor.elements, function(i, formElement){
			//Check if dependent or independent the data is
			if(formData[formElement.dataKey] === undefined){
				//Collect the necessary data
				inputObject = DataController.getInputObject(subForm, formElement.dataKey)
				varsThroughAjax.push(inputObject)
			}
		})
		//Here comes later the AJAX call
		//Now just debug
		console.log(varsThroughAjax)
		
		
		
		//Set the data of the selectors
		
		
		PopUpController.done()
		subForm.init()
	},
	
	setDependentVariablesAjax : function(){
	
	},
	
	getInputObject : function(subForm, key){
		
		var msgObject = new Object()
		msgObject["varToGet"] = key
		$.each(dataDependencies[key], function(i, dataKey){
			if(subForm.dataObject.dataKey === dataKey){
				msgObject[dataKey] = subForm.dataObject.uri
			} else {
				/*
				 * The variable maybe in some upper parents
				 */
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
				}
			}
		})
		return msgObject
	}
}