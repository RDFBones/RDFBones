var query = {

	getObjectOf : function(varname) {
		return nodes[varname].objectOf
	},

	getNextNode : function(varName, prop){
		
		var prop = properties[property]
		var node = new Object()
		
		if(prop.domain == varName){
			node.type = "object"
			node.value = prop.range
		} else {
			node.type = "subject"
			node.value = prop.domain
		}
		return node
	}
}




var logic = {

		
	isFinalNode : function(variable){

		return Arithmetic.or([this.isDataProperty(prop), this.onlyAddExisting(prop), this.connectsToIndividual(prop)])
	},

	isDataProperty : function(prop) {

		if (properties[prop].dataProperty != undefined) {
			return true
		} else {
			return false
		}
	},

	onlyAddExisting : function(prop) {

		if (properties[prop].addExisting != undefined
				&& properties[prop].addNew === undefined) {
			return true
		} else {
			return false
		}
	},
	
	connectsToIndividual : function(prop){
		
		if(properties[prop].domain == "individual" || properties[prop].range == "individual"){
			return true
		} else {
			return false
		}
	}
}	