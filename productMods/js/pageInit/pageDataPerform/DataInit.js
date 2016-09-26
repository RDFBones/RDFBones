
var CheckDataOperation = function(variable, input) {

	this.dataOperations = []
	this.check(variable, input)
}

CheckDataOperation.prototype = {

	check : function(variable, input) {

		switch (type(input)) {

		case "object":
			
			var lastKey = null
			$.each(input, (function(key, value) {
				if(key != "pageElements"){
					if (key == "dataOperation") {
						this.addToQueue(variable, input)
					}
					var varQueue = variable + "." + key
					this.check(varQueue, value)				
				}
			}).bind(this))
			break;
		case "array":
			$.each(input, (function(i, inp) {
				
				if(variable.lastIndexOf("]") == variable.length - 1){
					variable = variable.cutFromCharacter("[")
				} 
				variable += "[" + i + "]"
				this.check(variable, inp)
			}).bind(this))
			break;
		default:
			break;
		}
	},
	
	addToQueue : function(inputQueue, operation){

		index = inputQueue.indexOf("$")
		if(index > -1){
		  inputQueue = inputQueue.substring(0, index)	
		}
		this.dataOperations.push({
			object : inputQueue,
			operation : operation,
		})
	}
}
