
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
  		   type : sw.constant,
  		   value : "Test Inventory"
  	   },
  	   linkDataInputs : [
  		   {
  				type : sw.constant,
  				key : "pageUri",
  				value : "skeletalInventory",
  			},{
  				type : sw.global,
  				key : "skeletalInventory",
  			},
  	   ],
  	   mapping : "pageLoader"
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
			},
	   ],
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