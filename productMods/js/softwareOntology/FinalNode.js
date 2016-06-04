


var FinalNode = function(parentField, varName, processedNode, dataReference){
	
	/*
	 * The final node gets the object, where it has to put as many fields 
	 * as many the variable the node has.
	 * 
	 */
	
	this.parentField = parentField
	this.parentDataField = parentField.parentDataField
	
	this.varName = varName
	//We do not do anything with the dataReference. This is just a mediator class
	this.dataReference = dataReference
	this.processedDef = processedNode[varName]
	
	//The dataReference is an object, which is the member of the array, whose key is the variable name
	//So we have to create for each variable the the 
	
	//As it is a final node 
	if(this.processedDef.customClasses != undefined){
		
		$.each(this.processedDef.customClasses, (function(index, customClass){
			
			//We jump back to the initial definition so that we know what kind of fields can we add
			//This is like in the ClassSelectorDataField
			
			//Iterate through the variables
			console.log(this.varName)
			console.log(customClass)
			$.each(processedNodes[this.varName].possibleClasses[customClass].variables, (function(varname, variable){
				//We have to check what kind
				console.log(varname)
				switch(processedNodes[varname].type){
					case "selectExisting" : 
						if(processedNodes[varname].customInstances != undefined){
							var selector = new ExistingSelector(this, customClass, varname, processedNodes[varname].customInstances, this.dataReference)
							this.parentField.fieldContainer.append(selector.container)
						} else {
							//Here comes the selection list from the existing editor
							
						}
					break
					
					case "literal" : 
						var literalEditor = new NewLiteralEditor(this, customClass, varname, this.dataReference)
						this.parentField.fieldContainer.append(literalEditor.container)						
					break
				}
			}).bind(this))

		}).bind(this))
	}
}

FinalNode.prototype = {
		
	setData : function(varname){
		/*
		 * This function handles the data requests from the
		 * children datasets.
		 */
		this.parentDataField.addedData()
	}
}