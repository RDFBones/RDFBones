

var DataLib = {
		
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
	
	or : function(variable, values){
		var ret = false
		$.each(values, function(index, value){
			if(variable === value){
				ret = true
				return false
			}
		})
		return ret
	},
	
	typeCheck : function(variable, values){
		return this.or(this.getType(variable), values)
	},
	
	
	
	removeObjectFromArrayByKey : function(array, key, value){

		$.each(array, function(index, object){
			if(object[key] == value){
				array.splice(index, 1)
				return false
			}
		})
	},
	
	debugObject : function(object){
		
		var str = ""
		switch(DataLib.getType(object)){
			
		case "object" :
			str += "{ \n "
			$.each(object, function(key, value){
				str += "\n\t" + key + " : " + DataLib.debugObject(value) + " , "
			})
			str += " \n }"
			break
		case "data" : 
			str += "'" + object + "'"
			break
		case "array" :
			str = "[ \n "
			$.each(object, function(key, value){
				str += DataLib.debugObject(value) + " ,  \n"
			})
			str += "\n ]"
			break
		}
		
		return str 
	},
	
	joinArrays : function(array1, key1, array2, key2){
		
		var found = false
		$.each(array1, function(i, val1){
			$.each(array2, function(i, val2){
				if(val1[key1] ==  val2[key2]){
					found = true
					return false
				}
			})
			if(found){
				return false
			}
		})
		return found
	},
	
	assembleUrl : function(configData){
		
		var paramMap = new Object()
		$.each(configData, function(i, data){
			
			if(data.varName != undefined){
				paramMap[data.varName] = encodeURIComponent(getData1(data))
			} else {
				paramMap[data.key] = encodeURIComponent(getData1(data))
			}	
		})
		
		var href = baseUrl + this.configData.mapping + "?"
		$.each(paramMap, function(key, value){
			href += key + "=" + value + "&"
		})
		href = href.substring(0, href.length - 1)
		return href
	},
	
	getUrl : function(object){
		
		var url = ""
		$.each(object, function(key, value){
			url += key + "=" + value + "&"
		})
		return url = url.substring(0, url.length - 1)
	}
}