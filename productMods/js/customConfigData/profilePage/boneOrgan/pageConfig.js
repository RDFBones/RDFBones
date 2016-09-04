
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
	   type : sw.linkField,
	   title : {
		   type : sw.constant,
		   value : "SkeletalInventory"
	   },
	   label : {
		   type : sw.global,
		   key : "skeletalInventoryLabel"
	   },
	   linkDataInputs : [
	   {
			type : sw.global,
			varName : "individual",
			key : "skeletalInventory",
		}
	   ],
	   mapping : "defaultPageLoad"
    },   {
	   type : sw.linkField,
	   title : {
		   type : sw.constant,
		   value : "Bone division"
	   },
	   label : {
		   type : sw.constant,
		   value : "boneDivision"
	   },
	   linkDataInputs : [
		   {
				type : sw.constant,
				key : "pageUri",
				value : "boneDivision",
			},{
				type : sw.global,
				key : "boneDivision",
				varName : "individual",
			},{
				type : sw.global,
  				key : "skeletalInventory",
			},{
				type : sw.global,
				key : "classUri",
			}
	   ],
	   requirement : {
			type : sw.existence,
			variable : {
				type : sw.global,
				key : "existingBoneDivision",
			}
		},
	   mapping : "pageLoader"
    },
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


pageData.completeness = {
		
	dataOperation : "query",
	queryType : "completeness",
	singleQuery : true,
	parameters : [{
	  value : {
		  type : sw.global,
		  key : "individual",
	  },
	  name : "boneOrgan",
	}]
}

pageData.completenessState = {
		
	dataOperation : "query",
	queryType : "completenessState",
	singleQuery : true,
	parameters : [{
	  value : {
		  type : sw.global,
		  key : "individual",
	  },
	  name : "boneOrgan",
	}]
}

pageData.skeletalInventory = {
	dataOperation : "query",
	queryType : "skeletalInventory3",
	singleQuery : true,
	resultKey : "skeletalInventory",
	parameters : [{
		value : {
			type : sw.global,
			key : "individual",
		},
		name : "boneOrgan",
	}]
}

pageData.skeletalInventoryLabel = {
		
		dataOperation : "query",
		queryType : "literal",
		type : "literal",
		singleQuery : true,
		parameters : [
				{
				value : {
					type : sw.global,
					key : "skeletalInventory",
				},
				name : "subject",
				}, {
					value : {
						type : sw.constant,
						value : "http://www.w3.org/2000/01/rdf-schema#label", 
					},
					name : "predicate",
				}
		]
	}
