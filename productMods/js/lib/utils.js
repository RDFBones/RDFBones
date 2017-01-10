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
	},
	
	getButtonId : function(){
		
		return "button" +  (++buttonID)
	},
	
	setEvent : function(event){
		
		$(document).on("click", "#button" +  buttonID, event)
	}
}

var strUtil = {
		
	splitLast : function(str, char){
		arr = str.split(char)
		return arr[arr.length -1]
	},

	cutFromBeggining : function(str, n){
		
		return str.substring(n, str.length)
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