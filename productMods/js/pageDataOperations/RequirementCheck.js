
var RequirementCheck = function(object) {

	if (object.requirement != undefined) {
		return RequirementCheckMap[object.requirement.type](object.requirement)
	} else {
		return true
	}
}

RequirementCheckMap = {
		
	"http://softwareOntology.com/Existence" : function(object){
		
		if(getData1(object.variable) != undefined){
			return true
		} else {
			return false
		}
	},
}