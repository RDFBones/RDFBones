// Generated by CoffeeScript 1.10.0


var getData = function(element, dataDescriptor){
	
	return DataOperationMap[dataDescriptor.type](element, dataDescriptor)
}

var DataOperationMap = {
    "http://softwareOntology.com/Constant": function(container, data) {
      return data.value;
    },
    
    "http://softwareOntology.com/local": function(cont, pageData) {
      var container
      toReturn = ""
      
      container = cont;
      while (container.parent !== void 0) {
        if (container.parent.localData !== void 0) {
        	if(container.parent.localData[pageData.key] !== undefined){
        		toReturn = container.parent.localData[pageData.key]
                break;
        	} else {
        		container = container.parent
        	}
        } else {
          container = container.parent;
          break
        }
      }
      return toReturn; 
      
    },
    "http://softwareOntology.com/global": function(cont, configData) {
    	return pageData[configData.key]
    },
        
    "http://softwareOntology.com/selectOperationResult" : function(cont, configData){
    	
    	var dataToSelect = DataOperationMap[configData.dataToSelect.type](cont, configData.dataToSelect)	
    	var selectCriteria = DataOperationMap[configData.selectCriteria.type](cont, configData.selectCriteria)	
    	var arr = []
    	
    	$.each(dataToSelect, (function(index, object){
    		if(checkCriteria(object[configData.selectField], selectCriteria)){
    			arr.push(object)
    		}
    	}).bind(this))
    	return arr
    },
    
  };


var checkCriteria = function(value, selectCriteria){
	
	switch(DataLib.getType(selectCriteria)){
		
	case "array" : 
		return DataLib.or(value, selectCriteria)
		break
	case "data" : 
		return value == selectCriteria
	}
}
