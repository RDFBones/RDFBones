
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
	
	"http://softwareOntology.com/NotEmpty" : function(object){
		
		if(getData1(object.variable) != ""){
			return true
		} else {
			return false
		}
	},
	"http://softwareOntology.com/NotNull" : function(object){
		
		if(getData1(object.variable) != null){
			return true
		} else {
			return false
		}
	}
}