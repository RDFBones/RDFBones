

pageData.toeClasses = [
    "http://purl.obolibrary.org/obo/FMA_32884",
    "http://purl.obolibrary.org/obo/FMA_32899",
    "http://purl.obolibrary.org/obo/FMA_32900",
    "http://purl.obolibrary.org/obo/FMA_32901",
    "http://purl.obolibrary.org/obo/FMA_32902",
]


pageData.queries = [
   labelQuery("classUri", "classLabel"),
	{
		parameters : [ {
			type : sw.global,
			varName : "classUri",
			key : "classUri"
		}, {
			type : sw.constant,
			value : "subClasses",
			varName : "queryType",
		}, {
			type : sw.global,
			key : "toeClasses",
			varName : "classUri"
		}],
		mapping : "dataLoader",
		toVariable : "systemicParts",
		concatResultArrays : "true",
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
	}            
]

pageData.dataOperations = [
{
	type : "grouping",
	processes : [ {
		inputVariable : "systemicParts",
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
}
]

pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : BoneDivisionEditor,
} ]

