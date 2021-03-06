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
		//This comes as a parameter
		type : sw.global,
		key : "cefPageUri",
		varName : "pageUri",
	},{
		type : sw.global,
		key : "pageUri",
		varName : "cefPageUri",
	}, {
		type : sw.global,
		key : "skeletalInventory",
		varName : "individual",
	}, {
		type : sw.global,
		key : "individual",
		varName : "existingSkeletalRegion",
	}, {
		type : sw.global,
		key : "skeletalDivisionType",
	}, {
		type : sw.global,
		key : "individual",
		varName : "existingSkeletalRegion",
	}
],
	mapping : "pageLoader",
	dataToDisplay : {
		type : sw.global,
		key : "boneOrgans",
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
		title : "Completeness",
		value : {
			type : sw.local,
			key : "completenessLabel",
		}
	}, {	
		type : sw.editButton,
		linkDataInputs : [
		    {
				type : sw.constant,
				key : "pageUri",
				value : "boneOrgan",
			}, {
				type : sw.local,
				key : "uri",
				varName : "individual",
			}, {
				type : sw.global,
				key : "individual",
				varName : "boneDivision",
			}, {
				type : sw.local,
				key : "completeness",
			}, {
				type : sw.local,
				key : "completenessState",
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
				varName : "boneOrgan",
			}, {
				type : sw.constant,
				value : "deleteBoneOrgan",
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
				varName : "part",
			}, {
				type : sw.constant,
				value : "deleteFromSystemicParent",
				key : "operation",
			}
		],
		afterProcess : "It works as a flag simply",
		mapping : "delete",
	} ]
} ]
