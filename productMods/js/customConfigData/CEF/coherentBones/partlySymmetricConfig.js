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
		type : sw.global,
		key : "queryType",
	}, {
		type : sw.global,
		key : "classUri",
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
		key : {
			type : sw.constant,
			value : "subClasses",
		}
	},
	whatBy : "uri",
} ]