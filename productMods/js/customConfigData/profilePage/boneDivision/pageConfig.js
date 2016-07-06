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
		type : sw.global,
		key : "cefPageUri",
		varName : "pageUri",
		defaultValue : "partlySymmetricBoneDivision",
	},{
		type : sw.global,
		key : "cefPageUri",
		varName : "pageUri",
		
	}, {
		type : sw.global,
		key : "skeletalInventory",
		varName : "individual",
	}, {
		type : sw.global,
		key : "classUri",
	}, {
		type : sw.global,
		key : "individual",
		varName : "existingBoneDivision",
	}, {
		type : sw.global,
		key : "existingBoneDivisionType",
		varName : "classUri",
	}, {
		type : sw.global,
		key : "classUri",
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
				key : "boneOrgan",
				varName : "individual",
			},{
				type : sw.global,
				key : "individual",
				varName : "boneDivision",
			}, {
				type : sw.local,
				key : "completenessState",
			}, {
				type : sw.local,
				key : "completeness",
			}, {
				type : sw.local,
				key : "completenessState",
			}, {
				type : sw.global,
				key : "skeletalInventory",
			}, {
				type : sw.global,
				key : "classUri",
			}
		],
		mapping : "pageLoader",
	}, {	
		type : sw.deleteButton,
		linkDataInputs : [
		    {
				type : sw.local,
				key : "boneOrgan",
			}, {
				type : sw.constant,
				value : "deleteOrganFromDivision",
				key : "operation",
			}
		],
		mapping : "delete",
	} ]
} ]
