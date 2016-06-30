

labelQuery = function(varName, toVariable){
	return {
		parameters : [ {
			type : sw.constant,
			varName : "queryType",
			value : "literal"
		}, {
			type : sw.global,
			varName : "subject",
			key : varName
		}, {
			type : sw.constant,
			varName : "predicate",
			value : "http://www.w3.org/2000/01/rdf-schema#label"
		} ],
		singleData : true,
		mapping : "dataLoader",
		toVariable : toVariable,
	}
} 