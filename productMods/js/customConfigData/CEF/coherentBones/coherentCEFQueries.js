pageData.queries = [ {
	type : "query",
	parameters : [ {
		type : sw.global,
		varName : "classUri",
		key : "classUri"
	}, {
		type : sw.constant,
		value : "systemicParts",
		varName : "queryType"
	} ],
	mapping : "anatomicalModelLoader",
	toVariable : "boneDivisions1",
}, {
	type : "query",
	parameters : [ {
		type : sw.local,
		varName : "classUri",
		key : "classUri"
	}, {
		type : sw.constant,
		value : "subClasses",
		varName : "queryType"
	} ],
	mapping : "anatomicalModelLoader",
	toVariable : "boneDivisions2",
} ]