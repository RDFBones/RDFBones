
var ontology = {
		
	restrictions : {
		catLabelRestriction : {
			someValuesFrom : [
			  "012345", "012346"                  
			]
		},

		completenessRestriction1 : {
			onProperty : "isAbout",
			hasValuesFrom : "a"
		},
		
		completenessRestriction2 : {
			onProperty : "isAbout",
			hasValuesFrom : "b"
		}
	},
	
	properties : {
		hasCategoricalLabel : {
			restriction :  "catLabelRestriction",
		},
		
		regionalPartOf : {
			inverseRestriction : {
				"maxilla" : ["a", "b"],
			}
		},
		
		isAbout : {
			inverseRestriction : {
				"a" : ["completeness"],
				"b" : ["completeness"],
			}
		}
	},
	
	data : {
		"012345" : {
			label : "incomplete",
		},
		
		"012346" : {
			label : "complete",
		},
	},
	
	
	classes : {
		
	   boneOrgan : {
		   uri : "boneOrgan",
		   label : "Bone Organ",
		   subclasses : ["maxilla", "parietal"]
	   },
	   
	   maxilla : {
		   uri : "maxilla",
		   label : "Maxilla",
		   regionalParts : ["a", "b"],
	   },
	   
	   nasalBone : {
		   uri : "nasalbone",
		   label : "Nasal Bone",
		   regionalParts : ["c", "d"],
	   },
	   
	   a : {
			uri : "a",
			label : "A",
	   },
	   
	   b : {
			uri : "b",
			label : "B",
	   },
	   
	   c : {
			uri : "c",
			label : "C",
	   },
	   
	   d : {
			uri : "d",
			label : "D",
	   },
	   
	   weight : {
			uri : "weight",
			label : "Weight",
		},
		
		twoState : {
			uri : "twoState",
			label : "Two State",
		},
		
		completeness : {
			subClassOf : ["completenessRestriction1",
			              "completenessRestriction2"]
	   	}
	}
}