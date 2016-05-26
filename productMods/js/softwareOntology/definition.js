

var nodes = {
	
	boneOrgan : {
		interfaceSelection : true
	}
}

//We load the software ontology to JS, and it performs the queries necessary
//to the page load and optimizes

var processedNodes = {
	
	//The SPARQL query definition is represented here in JS
	//We need to distinct it based on the nodes, because we add the 
	//data node by node. And the restrictions, should be defined
	//in a more compact way.
	
	boneOrgan : {
		type : "addNew",
		possibleClasses : {
			maxilla : {
				variables : {
					boneSegment : {
						property : "regionalPartOf",
						customClasses : ["a", "b"]
					}
				}
			},

			nasalBone : {
				variables : {
					boneSegment : {
						property : "regionalPartOf",
						customClasses : ["c", "d"]
					}
				}
			}
		}
	},
	
	boneSegment : {
		
		/*
		 * Finalnode means we will not create any 
		 * more DataField after them.
		 */
		type : "addNew",
		possibleClasses : {

			a : {
				variables : {
					individual : {
						property : "isAbout",
						
					}
				}
			},
			
			b : {
				variables : {
					individual : {
						property : "isAbout",
						customClasses : ["completeness2state", "weight"],
					}
				}
			},
			
			c : {
				variables : {
					completeness : {
						property : "isAbout",
						customClasses : ["completeness2state"]
					}
				}
			},
			
			d : {
				variables : {
					completeness : {
						customClasses : ["completeness2state"]
					}
				}
			}
		}
	},
	
	completeness : {
		possibleClasses : {
			twoState : {
				uri : "twoState",
				label : "Two State",
			},
	
			weight : {
				uri : "weight",
				label : "Weight",
			},
		}
	},
	
	categoricalLabel : {
		possibleInstances : {
			set : ["complete", "incomplete"]
		}
	},
	
	individual : {
		possibleClassesForNew : [],
		subjectOf : ["hasPart"]
	},
}



var properties = {

	hasPart : {
		cardinality : 1,
		fauxOf : "obo:hasPart",
		domain : "individual",
		range : "completeness",
	},
	
	hasCategoricalLabel : {
		cardinality : 1,
		fauxOf : "hasCategoricalLabel",
	},
	
	isAbout : {
		domain : "completeness",
		range : "boneSegment",
		inverseMinCardinality : 1,
		cardinality : 1,
		offerAllPossible : true,
	},

	regionalPartOf : {
		subject : "boneSegment",
		object : "boneOrgan",
		inverseMinCardinality : 1,
		cardinality : 1,
		fauxOf : "regionalPartOf",
	},
	
	systemicPartOf : {
		subject : "boneOrgan",
		object : "boneDivision",
		minCardinality : 1,
		fauxOf : "obo:systemicPartOf",
	},
}


var type = {
	
	"individualUri" : "primarySkeletalInventory",
}

