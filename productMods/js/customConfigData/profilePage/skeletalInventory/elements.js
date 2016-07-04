coherentData = {

	type : sw.dataField,
	textValue : {
		type : sw.local,
		key : "boneLabel"
	},
	linkDataInputs : [ {
		type : sw.local,
		key : "boneUri",
		varName : "classUri",
	}, {
		type : sw.global,
		key : "individual",
	}, {
		type : sw.local,
		key : "pageUri",
	}, {
		type : sw.local,
		key : "queryType",
	}],
	mapping : "pageLoader",
	dataToDisplay : {
		type : sw.selectOperationResult,
		dataToSelect : {
			type : sw.global,
			key : "coherentBones",
		},
		selectField : "type",
		selectCriteria : {
			type : sw.local,
			key : "classSelection",
		}
	},
	dataFields : [ {
		type : sw.literalField,
		title : "Label",
		value : {
			type : sw.local,
			key : "label",
		}
	}, {
		type : sw.literalFieldMiddle,
		title : "Number of Bone Organs",
		value : {
			type : sw.local,
			key : "boneOrganCount",
		}
	}, {
		type : sw.editButton,
		linkDataInputs : [ {
			type : sw.global,
			key : "individual",
			varName : "skeletalInventory",
		}, {
			type : sw.constant,
			key : "pageUri",
			value : "boneDivision",
		}, {
			type : sw.local,
			key : "boneDivision",
			varName : "individual",
		}, {
			type : sw.local,
			key : "type",
			varName : "existingBoneDivisionType",
		}, {
			type : sw.local,
			key : "boneUri",
			varName : "classUri",
		} ],
		mapping : "pageLoader",
	}, {	
		type : sw.deleteButton,
		linkDataInputs : [
		    {
				type : sw.local,
				key : "boneDivision",
			}, {
				type : sw.constant,
				value : "deleteDivisionFromOrgans",
				key : "operation",
			}
		],
		mapping : "delete",
	} ]
}

singleBones = {

		type : sw.dataField,
		textValue : {
			type : sw.local,
			key : "boneLabel"
		},
		linkDataInputs : [ {
			type : sw.local,
			key : "boneUri",
			varName : "classUri",
		}, {
			type : sw.global,
			key : "individual",
		}, {
			type : sw.local,
			key : "pageUri",
		}, {
			type : sw.local,
			key : "queryType",
		}],
		mapping : "pageLoader",
		dataToDisplay : {
			type : sw.global,
			key : {
				type : sw.local,
				key : "dataKey",
			}
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
			linkDataInputs : [ {
				type : sw.global,
				key : "individual",
				varName : "skeletalInventory",
			}, {
				type : sw.constant,
				key : "pageUri",
				value : "boneOrgan",
			}, {
				type : sw.local,
				key : "boneDivision",
				varName : "individual",
			}, {
				type : sw.local,
				key : "type",
				varName : "existingBoneDivisionType",
			}, {
				type : sw.local,
				key : "boneUri",
				varName : "classUri",
			} ],
			mapping : "pageLoader",
		}, {	
			type : sw.deleteButton,
			linkDataInputs : [
			    {
					type : sw.local,
					key : "boneOrgan",
				}, {
					type : sw.constant,
					value : "deleteBoneOrgan",
					key : "operation",
				}
			],
			mapping : "delete",
		} ]
	}