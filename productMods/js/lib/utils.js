var util = {
		
	setUndefined : function(variable, value){
		if(variable !== undefined){
			return variable
		} else {
			return value
		}
	},

	flip : function(bool){
		bool = bool ? false : true
	}
}


var strUtil = {
		
	splitLast : function(str, char){
		arr = str.split(char)
		return arr[arr.length -1]
	}	
}

var arrayutil = {

	subtract : function(base, arr){

		$.each(arr, function(i, value){
			index = base.indexOf(value)
			if(index > -1){
				base.splice(index, 1)
			}
		})	
	}
}