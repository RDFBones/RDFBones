

//We get at first predicates

var nodes = {
	
	boneOrgan : {
		addNew : true,
		classTo : "boneOrgan",
		objectOf : ["isAbout"]
	}
}


var predicates = {

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
		fauxOf : "isAbout",
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

var alg = function(){
	
	$.each(predicates, function(index, predicate){
		if(predicate.subject == "individualUri"){
			
			//Here we have to check what kind of objects can we add
			switch(predicate.individualUri){
				
			}
			return false 
		}
	})
}

