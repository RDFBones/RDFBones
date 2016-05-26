var DataField = function() {
	
		
}

DataField.prototype = {

	/*
	 * The add is general for each type of DataField since we do not know
	 * what kind of type do we have.
	 * 
	 * The inputs - >  dataController, variableName (forward), class
	 */
	add : function() {

		/*
		 * Case I. - We arrived to the last instance before the individual
		 * and there is no other type of variables coming out from this instance
		 */
		if(Object.keys(this.cachedDef.variables).length == 1 && 
				this.cachedDef.variables.individual != undefined){
			
			
			if(this.fieldDataController === undefined){
				this.fieldDataController = new DataEntryDataController(this, "individual",
						this.cachedDef.variables.individual.property, this.dataController)
			}
			
			this.fieldContainer.append(new DataEntry(this.classUri, this.fieldDataController).container)
		} else if(true){
			
			$.each(this.cachedDef.variables, (function(varName, variableDef) {
				
				var property = variableDef.property
				var dataController = new DataController(this, varName, variableDef.property)
				
				if(processedNodes[this.varName].type == "addNew"){
					
					console.log(processedNodes[varName])
					//Check if we can select from more classes or from just one
					var bufferArray = []
					//The we show ones from the possible classes that can be displayed
					$.each(variableDef.customClasses, function(i, customClass){
						//The classField knows the from the customClass the defintion
						//in the processedNodes
						bufferArray.push(new ClassField(varName, customClass, dataController).container)
					})
					this.fieldContainer.append(bufferArray)
					this.saveButton.show()
					this.cancelButton.show()		
				} 
			}).bind(this))
		}
	},
}