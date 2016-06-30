pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : PartlySymmetricSystemicPartSelector,
} ]

pageData.queries = [

         labelQuery("classUri", "classLabel"),
                   
{
	parameters : [ {
		type : sw.constant,
		varName : "queryType",
		value : "subClasses"
	}, {
		type : sw.global,
		varName : "classUri",
		key : "parentRegions"
	}, ],
	mapping : "dataLoader",
	toVariable : "symmetricBoneOrgans",
	concatResultArrays : "true",
}, {
	parameters : [ {
		type : sw.constant,
		varName : "queryType",
		value : "sytemicPartsWithout"
	}, {
		type : sw.global,
		varName : "classUri",
		key : "mainClass"
	}, ],
	mapping : "dataLoader",
	toVariable : "systemicParts",
} ]

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
		key : "subClasses",
	},
	whatBy : "uri",
} ]