var individual = {
		type : sw.global,
		key : "individual",
}

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
    }, {
	   type : sw.literalEditor,
	   title : {
			   type : sw.constant,
			   value : "Label",
	   },
	   subject : individual,
	   predicate  : {
		   type : sw.constant,
		   value : "rdfs:label",
	   }
}, {
	type : sw.imagesField,
}, {
	type : sw.dataField,
	textValue : {
		type : sw.constant,
		value : "Systemic Parts",
	},
	linkDataInputs : [
	{
		type : sw.constant,
		value : "coherentSkeletalDivisionCEF",
		varName : "pageUri",
	}, {
		type : sw.global,
		key : "skeletalInventory",
		varName : "individual",
	}, {
		type : sw.global,
		key : "individual",
		varName : "existingSkeletalDivision",
	}, {
		type : sw.global,
		key : "type",
		varName : "coherentSkeletalDivisionType",
	}, 
],
	mapping : "pageLoader",
	dataToDisplay : {
		type : sw.global,
		key : "skeletalDivisions",
	},
	dataFields : [ {
		type : sw.literalField,
		title : "Type",
		value : {
			type : sw.local,
			key : "typeLabel",
		}
	}, {
		type : sw.literalFieldMiddle,
		title : "Number of bone organs",
		value : {
			type : sw.local,
			key : "systemicPartCount",
		}
	}, {	
		type : sw.editButton,
		linkDataInputs : [
		    {
		  		type : sw.constant,
		  		varName : "cefPageUri",
		  		value : "coherentSkeletalSubdivisionCEF",
		  	},{
				type : sw.constant,
				key : "pageUri",
				value : "skeletalDivision",
			},{
				type : sw.constant,
				key : "pageUri",
				value : "skeletalDivision",
			},{
				type : sw.local,
				key : "uri",
				varName : "individual",
			},{
				type : sw.global,
				key : "type",
				varName : "skeletalDivisionType"
			}, {
				type : sw.global,
				key : "skeletalInventory",
			}
		],
		mapping : "pageLoader",
	}, {	
		type : sw.binButton,
		linkDataInputs : [
		    {
				type : sw.local,
				key : "uri",
				varName : "skeletalDivision",
			}, {
				type : sw.constant,
				value : "deleteSkeletalDivision",
				key : "operation",
			}
		],
		mapping : "delete",
	}, {	
		type : sw.deleteButton,
		linkDataInputs : [
		    {
				type : sw.local,
				key : "uri",
				varName : "part"
			}, {
				type : sw.constant,
				value : "deleteFromSystemicParent",
				key : "operation",
			}
		],
		mapping : "delete",
	},  ]
} ]

