

var DataField = function(){
	
	
}

DataField.prototype = {
		
	add : function(){
		
		//Here I add more datafield object 
		$.each(this.cachedDef.variables, (function(varName, variable){
		
			
			switch(variable.type){
			
			case "newInstance" :
				
				if(variable.customClasses != undefined){
					var classBuffer = []
					$.each(variable.customClasses, function(index, customClass){
						//Each subfield (i.e. possible classes)
						classBuffer.push(new ClassField(varName, customClass, 
											cachedNodes[varName][customClass]).container)
					})
				}
				this.fieldContainer.append(classBuffer)
				break;
			}
			
		}).bind(this))
		
	}
}