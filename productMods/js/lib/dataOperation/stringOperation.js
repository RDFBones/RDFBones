String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.getObjectByKey = function(key, value){
	
	var toReturn = null
	$.each(this, function(i, object){
		if(object[key] == value){
			toReturn = object
			return false
		}
	})
	return toReturn
}


Array.prototype.selectObjects = function(key, array){
	
	var toReturn = []
	$.each(this, function(i, object){
		if(array.indexOf(object[key]) > -1){
			toReturn.push(object)
		}
	})
	return toReturn
}

Array.prototype.removeElement = function(value){
	
	if(this.indexOf(value) != -1) {
		this.splice(this.indexOf(value), 1)	
	}
}

String.prototype.cutFromCharacter = function(char){
	
	index = this.lastIndexOf(char)
 	if(index > -1){
		return this.substring(0, index)
	} else {
		return this	
	}
}

String.prototype.getArrayNumber = function(){
	
	i1 = this.lastIndexOf("[")
    i2 = this.lastIndexOf("]")
    return parseInt(this.substring(i1 + 1, i2 + 1))
}


Array.prototype.getObjectByKey = function(key, value){
	
	var toReturn = null
	$.each(this, function(i, object){
		if(object[key] == value){
			toReturn = object
			return false
		}
	})
	return toReturn
}
