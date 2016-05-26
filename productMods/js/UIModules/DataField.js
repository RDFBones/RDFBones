var DataField = function() {
	
	
}

DataField.prototype = {

	/*
	 * The add is general for each type of DataField since we do not know
	 * what kind of type do we have.
	 * 
	 * 
	 * The inputs - >  dataController, variableName (forward), class
	 */
	add : function() {

		/*
		 * Important - we have to create a DataController for each variable 
		 * connected to the variable
		 */
		
		$.each(this.cachedDef.variables, (function(varName, variable) {
			
			//Each variable is connected to the variable in scope throug a property
			//This property is in the processed node
			
			//The dataController is independent from the class selected
			var dataController = new DataController(this, varName)
			
			var property = variable.property
			//We have to figure out what fields do we offer for this property
			
			if(properties[property].addNew != undefined){
				//If addNew is there then we create the new classes for the
				
			}
			
		}).bind(this))
	},
	

}