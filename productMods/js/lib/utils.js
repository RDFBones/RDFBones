var dataUtil = {
		
	getStrings : function(object){
		
		var ret = new Object()
		$.each(object, function(key, value){
			if(DataLib.isData(value)){
				ret[key] = value
			}
		})
		return ret
	},

	setValue : function(array, key, value){
		
		$.each(array, function(i, element){
			element[key] = value
		})
	}
}

var util = {
		
	setLabel(object, type, label){
		
		if(object[label] == "" || object[label] == undefined){
			object[label] = this.process(object[type])
		}
	},
	
	process(input){
		
		if(input === undefined){
			return "undefined"
		} else{
			var str = input.split("#")[1]
			if(str == undefined) str = "undefined"
			str = str.replace(".", " ")
			return str.replace("_", " ")
		}
	},	
		
	setUndefined : function(variable, value){
		if(variable !== undefined){
			return variable
		} else {
			return value
		}
	},

	getUndefinedObject : function(object, key){
		if(object[key] !== undefined){
			return object[key]
		} else {
			return ""
		}
	},

	isArray : function(someVar){
		if( Object.prototype.toString.call( someVar ) === '[object Array]' ) {
		    return true
		}
		return false
	},	
		
	getType : function(someVar){
		if ((typeof someVar) == "object") {
			if(this.isArray(someVar)){
				return "array"
			} else {
				return "object"
			}
		} else {
			return "data" 
		}
	},
	
	flip : function(bool){
		bool = bool ? false : true
	},
	
	getNewButtonId : function(){
		
		return "button" +  (++Global.buttonID)
	},
	
	setEvent : function(event){
		
		$(document).on("click", "#button" +  buttonID, event)
	},
	
	redirect : function(){
		window.location = baseUrl
		+ "display/"
		+ subjectUri.split("/")[subjectUri
				.split("/").length - 1]
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