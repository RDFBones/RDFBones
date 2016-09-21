pageData.phalanxTypes = [

{
	uri : "http://purl.obolibrary.org/obo/FMA_32884",
	label : "Phalanx of big toe",
}, {
	uri : "http://purl.obolibrary.org/obo/FMA_32899",
	label : "Phalanx of second toe",
}, {
	uri : "http://purl.obolibrary.org/obo/FMA_32900",
	label : "Phalanx of third toe",
}, {
	uri : "http://purl.obolibrary.org/obo/FMA_32901",
	label : "Phalanx of fourth toe",
}, {
	uri : "http://purl.obolibrary.org/obo/FMA_32901",
	label : "Phalanx of little toe",
} ]

pageData.toes = [ "http://purl.obolibrary.org/obo/FMA_32884",
		"http://purl.obolibrary.org/obo/FMA_32899",
		"http://purl.obolibrary.org/obo/FMA_32900",
		"http://purl.obolibrary.org/obo/FMA_32901",
		"http://purl.obolibrary.org/obo/FMA_32901" ]

pageData.queries = [

{
	parameters : [ {
		type : sw.constant,
		varName : "queryType",
		value : "subClasses"
	}, {
		type : sw.global,
		varName : "classUri",
		key : "toes"
	}, {
		type : sw.global,
		varName : "toes",
	}],
	mapping : "dataLoader",
	toVariable : "coherentBones",
} ]

pageData.dataOperations = [{
		inputVariable : {
			type : sw.global,
			key : "toes",
		},
		type : "grouping",
		by : "inputClass",
		within : "inputClassLabel",
	} , {
	type : "rename",
	vars : [
	  { 
		  from : "inputClassUri", to : "uri",
	  }, {
		  from : "inputClassLabel", to : "label",
	  }
	]
}

]
pageData.mainToes = [ {
	uri : "http://purl.obolibrary.org/obo/FMA_75830",
	label : "Distal phalanx of little toe",
}, {
	uri : "http://purl.obolibrary.org/obo/FMA_75829",
	label : "Middle phalanx of little toe",
}, {
	uri : "http://purl.obolibrary.org/obo/FMA_75828",
	label : "Proximal phalanx of little toe",
} ]