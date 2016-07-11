pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : ClassSelector,
} ]

pageData.queries = [ {
	parameters : [ {
		type : sw.global,
		varName : "classUri",
		key : "classUri"
	}, {
		type : sw.constant,
		value : "sytemicPartWithSubclass",
		varName : "queryType"
	} ],
	mapping : "dataLoader",
	toVariable : "boneDivisions",
}]


pageData.dataOperations = [

{
	type : "grouping",
	processes : [ {
		inputVariable : "boneDivisions",
		by : "uri",
		within : [ "label" ],
		to : "systemicParts",
		rename : [],
	}, {
		inputVariable : "systemicParts",
		by : "systemicPart",
		within : [ "systemicPartLabel" ],
		to : "subClasses",
		rename : [ {
			key : "systemicPart",
			to : "uri"
		}, {
			key : "systemicPartLabel",
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
} ]
