pageData.queries = [ {
	type : "query",
	parameters : [ {
		type : "global",
		varName : "classUri",
		name : "inputClassUri"
	}, {
		type : "local",
		value : "systemicParts",
		name : "queryType"
	} ],
	mapping : "anatomicalModelLoader",
	toVariable : "boneDivisions1",
}, {
	type : "query",
	parameters : [ {
		type : "global",
		varName : "classUri",
		name : "inputClassUri"
	}, {
		type : "local",
		value : "subClasses",
		name : "queryType"
	} ],
	mapping : "anatomicalModelLoader",
	toVariable : "boneDivisions2",
} ]