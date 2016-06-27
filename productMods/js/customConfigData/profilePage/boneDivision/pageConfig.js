var individual = {
		type : sw.global,
		key : "individual",
}

pageData.pageElements = [

 {
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
	type : sw.addNew,
	textValue : {
		type : sw.constant,
		value : "Systemic Parts",
	},
	linkDataInputs : [
	{
		type : sw.constant,
		key : "pageUri",
		value : "coherentBones",
	}, {
		type : sw.global,
		key : "individual",
		varName : "existingBoneDivision",
	}, {
		type : sw.global,
		key : "skeletalInventory",
	}
],
	mapping : "pageLoader",
}, {
	type : sw.dataTable,
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
				key : "boneOrgan",
				varName : "individual",
			}, {
				type : sw.local,
				key : "completenessState",
			}, {
				type : sw.local,
				key : "completeness",
			}
		],
		mapping : "pageLoader",
	} ]
} ]
