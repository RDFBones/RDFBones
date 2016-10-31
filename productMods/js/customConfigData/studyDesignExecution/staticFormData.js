

var formData = {
		
	/*
	 * Here comes all the variables that appear on the form, and their dependency is de 
	 * 
	 */	
	assayType : {

		"rdfbones#pretuberance" : {
			label : "Assay Pretuberance",
		},
			
		"rdfbones#mastoid" : {
			label : "Assay Mastoid"
		}
	},
}

var dependentData = new Object()

var dataDependencies = {
		
	boneSegment : ["assayType"],
	measurementDatum : ["assayType"],
}

arrivedDependentData = {
	boneSegment : [{
		uri : "1", label : "boneSegment1",
	},{
		uri : "2", label : "boneSegment2",
	}],
	measurementDatum : [{
		uri : "md1",
		label : "Hyper Feminin",
	},{
		uri : "md2",
		label : "Feminim",
	},{
		uri : "md3",
		label : "Indifferent",
	},{
		uri : "md4",
		label : "Masculin",
	},{
		uri : "md5",
		label : "Hyper Masculin",
	}]
}
