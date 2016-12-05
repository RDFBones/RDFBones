var type = function(someVar){
	if ((typeof someVar) == "object") {
		if(DataLib.isArray(someVar)){
			return "array"
		} else {
			return "object"
		}
	} else {
		return "data" 
	}
}

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
		console.log(this.debugObj(0, object))
	},
	
	debugObj : function(num, object){
		
		var tab = Array(num).join("\t")
		num++
		var n = num 
		var str = ""
		switch(DataLib.getType(object)){
			case "object" :
				str += "{ \n"
				$.each(object, function(key, value){
					str +=  tab + key + " : " + DataLib.debugObj(n, value) + " ,\n"
				})
				str = str.substring(0, str.length - 2)
				str += "\n" + tab +  "}"
				break
			case "data" : 
				str +=  "'" + object + "'"
				break
			case "array" :
				str =  "[ "
				$.each(object, function(key, value){
					str +=  DataLib.debugObj(n, value) + ", "
				})
				str = str.substring(0, str.length - 2)
				str += " ]"
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

	joinTables : function(array1, key1, array2, key2){
		
		var join = []
		$.each(array1, function(i, val1){
			$.each(array2, function(i, val2){
				if(val1[key1] ==  val2[key2]){
					join.push(val1)
				}
			})
		})
		return join
	},
	
	
	assembleUrl : function(configData, element){
		
		var paramMap = new Object()
		$.each(configData.linkDataInputs, function(i, input){
			
			if(element !== null){
				data = getData(element, input)
			} else {
				data = getData1(input)
			}
			
			if(input.varName != undefined){
				paramMap[input.varName] = encodeURIComponent(data)
			} else {
				paramMap[input.key] = encodeURIComponent(data)
			}	
		})
		
		var href = baseUrl + configData.mapping + "?"
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