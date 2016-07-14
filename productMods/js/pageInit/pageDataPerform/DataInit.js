
var CheckDataOperation = function(variable, input) {

	this.dataOperations = []
	this.check(variable, input)
}

CheckDataOperation.prototype = {

	check : function(variable, input) {

		switch (type(input)) {

		case "object":
			
			$.each(input, (function(key, value) {
				if(key != "pageElements"){
					if (key == "dataOperation") {
						this.performDataOperation(variable, input)
					}
					var varQueue = variable + "." + key
					this.check(varQueue, value)				
				}
			}).bind(this))
			break;
		case "array":
			$.each(input, (function(i, inp) {
				this.check(variable, inp)
			}).bind(this))
			break;
		default:
			break;
		}
	},
	
	performDataOperation : function(inputQueue, operation){

		this.dataOperations.push({
			object : inputQueue,
			operation : operation,
		})
	}
}
