pageData.queries = [ {
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
	parameters : [ {
		type : sw.global,
		varName : "classUri",
		key : "classUri"
	}, {
		type : sw.constant,
		value : "subClasses",
		varName : "queryType"
	} ],
	mapping : "anatomicalModelLoader",
	toVariable : "boneDivisions2",
}, {
	
	requirement : {
		type : sw.existence,
		variable : {
			type : sw.global,
			key : "existingBoneDivision",
		}
	},

	parameters : [ {
		type : sw.global,
		varName : "boneDivision",
		key : "existingBoneDivision"
	}, {
		type : sw.constant,
		value : "boneOrgans",
		varName : "queryType",
	} ],
	mapping : "dataLoader",
	toVariable : "existingBoneOrgans",	
} ]
