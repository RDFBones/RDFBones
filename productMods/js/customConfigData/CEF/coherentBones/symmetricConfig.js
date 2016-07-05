pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : SymmetricClassSelector,
} ]

pageData.queries = [ {
	parameters : [ {
		type : sw.global,
		varName : "classUri",
		key : "classUri"
	}, {
		type : sw.constant,
		value : " ",
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
		varName : "queryType",
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


pageData.dataOperations = [

{
	type : "grouping",
	processes : [ {
		inputVariable : "boneDivisions1",
		by : "inputClass",
		within : [ "inputClassLabel" ],
		to : "systemicParts",
		rename : [ {
			key : "inputClass",
			to : "uri"
		}, {
			key : "inputClassLabel",
			to : "label"
		} ]
	}, {
		inputVariable : "systemicParts",
		by : "boneDivision",
		within : [ "boneDivisionLabel" ],
		to : "subClasses",
		rename : [ {
			key : "boneDivision",
			to : "uri"
		}, {
			key : "boneDivisionLabel",
			to : "label"
		} ]
	}, {
		inputVariable : "subClasses",
		by : "subClass",
		within : [ "subClassLabel" ],
		rename : [ {
			key : "subClass",
			to : "uri"
		}, {
			key : "subClassLabel",
			to : "label"
		} ]
	} ]
}, {
	type : "grouping",
	processes : [ {
		inputVariable : "boneDivisions2",
		by : "boneDivision",
		within : [ "boneDivisionLabel" ],
		to : "systemicParts",
		rename : [ {
			key : "boneDivision",
			to : "uri"
		}, {
			key : "boneDivisionLabel",
			to : "label"
		} ]
	}, {
		inputVariable : "systemicParts",
		by : "systemicPart",
		within : [ "systemicPartLabel" ],
		to : "unused",
		rename : [ {
			key : "systemicPart",
			to : "uri"
		}, {
			key : "systemicPartLabel",
			to : "label"
		} ]
	} ]
}, {
	type : "mergeArrays",
	arrays : [ "boneDivisions1", "boneDivisions2" ],
	output : "boneDivisions"
} ]
