

var nodes = {
	
	boneOrgan : {
		interfaceSelection : true
	}
}

//We load the software ontology to JS, and it performs the queries necessary
//to the page load and optimizes

var cachedNodes = {
	
	//The SPARQL query definition is represented here in JS
	//We need to distinct it based on the nodes, because we add the 
	//data node by node. And the restrictions, should be defined
	//in a more compact way.
	
	boneOrgan : {
		
		possibleClasses : {
			maxilla : {
				variables : {
					boneSegment : {
						type : "newInstance",
						property : "regionalPartOf",
						customClasses : ["a", "b"]
					}
				}
			},

			nasalBone : {
				variables : {
					boneSegment : {
						type : "newInstance",
						property : "regionalPartOf",
						customClasses : ["c", "d"]
					}
				}
			}
		}
	},
	
	boneSegment : {
		
		possibleClasses : {

			a : {
				variables : {
					completeness : {
						property : "isAbout",
						customClasses : ["completeness2state", "weight"]
					}
				}
			},
			
			b : {
				variables : {
					completeness : {
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
		cardinality : 1,
		offerAllPossible : true,
	},

	regionalPartOf : {
		subject : "boneSegment",
		object : "boneOrgan",
		minCardinality : 1,
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

