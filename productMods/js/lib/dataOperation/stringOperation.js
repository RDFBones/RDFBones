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

Array.prototype.removeElement = function(value){
	
	if(this.indexOf(value) != -1) {
		this.splice(this.indexOf(value), 1)	
	}
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
