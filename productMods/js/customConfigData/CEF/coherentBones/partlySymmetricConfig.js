pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : SystemicPartSelector,
} ]

pageData.queries = [

         labelQuery("classUri", "classLabel"),
                   
{
	parameters : [ {
		type : sw.constant,
		varName : "queryType",
		value : "subClasses"
	}, {
		type : sw.field,
		of : {
			type : sw.field,
			of : {
				type : sw.global,
				key : "partlySymmetricBones"
			}, 
			key : {
				type : sw.global,
				key : "classUri"
			},
		},
		key : {
			type : sw.constant,
			value : "parentRegions",
		},
		varName : "classUri"
	}, ],
	mapping : "dataLoader",
	toVariable : "symmetricBoneOrgans",
	concatResultArrays : "true",
}, {
	parameters : [ {
		type : sw.constant,
		key : "queryType",
		value : "systemicPartsWithout"
	}, {
		type : sw.global,
		key : "classUri",
	}, ],
	mapping : "dataLoader",
	toVariable : "systemicParts",
}, {
	parameters : [ {
		type : sw.constant,
		key : "queryType",
		value : "existingBoneOrgan"
	}, {
		type : sw.global,
		key : "existingBoneDivision",
		varName : "boneDivision"
	}, ],
	mapping : "dataLoader",
	toVariable : "systemicParts",
	
	requirement : {
		type : sw.existence,
		variable : {
			type : sw.global,
			key : "existingBoneDivision",
		}
	},
}, {
	parameters : [ {
		type : sw.constant,
		varName : "queryType",
		value : "literal"
	}, {
		type : sw.global,
		varName : "subject",
		key : "classUri"
	}, {
		type : sw.constant,
		varName : "predicate",
		value : "http://www.w3.org/2000/01/rdf-schema#label"
	} ],
	singleData : true,
	mapping : "dataLoader",
	toVariable : "classLabel",
	} 
]

pageData.dataOperations = [

{
	type : "grouping",
	processes : [ {
		inputVariable : "symmetricBoneOrgans",
		by : "inputClass",
		within : [ "inputClassLabel" ],
		to : "subClasses",
		rename : [ {
			key : "inputClass",
			to : "uri"
		}, {
			key : "inputClassLabel",
			to : "label"
		} ] 
	} ],
}, {
	type : "extraction",
	from : {
		type : sw.global,
		key : "systemicParts"
	},
	fromBy : "uri",
	what : {
		type : sw.field,
		of : {
			type : sw.global,
			key : "symmetricBoneOrgans",
		},
		key : {
			type : sw.constant,
			value : "subClasses",
		}
	},
	whatBy : "uri",
}, {
	type : "mergeArrays",
	arrays : [ "systemicParts", "symmetricBoneOrgans" ],
	output : "systemicParts"
} ]
