var util = {
		
	setUndefined : function(variable, value){
		if(variable !== undefined){
			return variable
		} else {
			return value
		}
	}	
}


var strUtil = {
		
	splitLast : function(str, char){
		arr = str.split(char)
		return arr[arr.length -1]
	}	
}