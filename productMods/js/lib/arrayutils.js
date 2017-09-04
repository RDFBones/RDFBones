

class array {
	
	static substract(A, B, key, MODE){
		
		switch(MODE){
		
			case 1 : // The result is returned in a new div
				var result = []
				$.each(A, function(i, value){
					if(!array.contains(B, key, value[key])){
						result.push(value)
					}
				})
				return result;
			default : 
				return []
		}
	}
	
	static intersection(A, B, key, MODE){
		
		switch(MODE){
			case 1 : // The result is returned in a new div
				var result = []
				$.each(A, function(i, value){
					if(array.contains(B, key, value[key])){
						result.push(value)
					}
				})
				return result;
			default : 
				return []
		}
	}
	
	static contains (array, key, value){
		
		var toReturn = false
		$.each(array, function(i, object){
			if(object[key] == value){
				toReturn = true
				return false
			}
		})
		return toReturn
	}
	
	
	/*
	 * array : [ { uri : "a" }, { uri : "b" } ]
	 * key : "uri"
	 * 
	 * return : ["a", "b"] 
	 */
	static get(array, key){
	
		var singleArray = []
		$.each(array, function(index, value){
			singleArray.push(value[key])
		})
		return singleArray
	}
	
	/*
	 * from : ["a", "b", "c"]
	 * array : ["a", "b"]
	 * 
	 * return : ["c"]
	 */
	static substract1(from, arr){
		var result = from
		$.each(arr, function(i, value){
			array.remove(result, value)
		})
		return result
	}
	
	static remove(array, element){
		var index = array.indexOf(element)
		array.splice(index, 1)
	}
}