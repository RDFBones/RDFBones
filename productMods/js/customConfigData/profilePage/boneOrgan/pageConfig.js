
var individual = {
	type : sw.global,
	key : "individual",
}

pageData.options = [ {
	uri : "http://w3id.org/rdfbones/core#complete",
	label : "complete"
}, {
	uri : "http://w3id.org/rdfbones/core#partlyPresent",
	label : "partly present"
}, ]

pageData.pageElements = [

{
	type : sw.literalEditor,
	title : {
		type : sw.constant,
		value : "Label",
	},
	subject : individual,
	predicate : {
		type : sw.constant,
		value : "rdfs:label",
	}
}, {
	type : sw.textEditor,
	title : {
		type : sw.constant,
		value : "Description",
	},
	subject : individual,
	predicate : {
		type : sw.constant,
		value : "rdfbones:description",
	}
}, {
	type : sw.imagesField,
	title : {
		type : sw.constant,
		value : "Images",
	},
}, {
	type : sw.selectEditor,
	title : {
		type : sw.constant,
		value : "Completeness",
	},
	subject : {
		type : sw.global,
		key : "completeness",
	},
	predicate : {
		type : sw.constant,
		value : "obo:OBI_0000999",
	},
	options : {
		type : sw.global,
		key : "options",
	},
	existingValue : {
		type : sw.global,
		key : "completenessState"
	}
}, ]