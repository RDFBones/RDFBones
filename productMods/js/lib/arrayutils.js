

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
}