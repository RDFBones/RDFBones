coherentSkeletalDivisionData = {
		
	type : sw.dataField,
	textValue : {
		type : sw.local,
		key : "typeLabel"
	},
	linkDataInputs : [ {
		type : sw.local,
		key : "coherentSkeletalDivisionType",
	}, {
		type : sw.global,
		key : "individual",
	}, {
		type : sw.constant,
		key : "pageUri",
		value : "coherentSkeletalDivisionCEF"
	}, {
		type : sw.local,
		key : "simpleQuery",
	}],
	mapping : "pageLoader",
	dataToDisplay : {
		type : sw.field,
		of : {
			type : sw.global,
			key : "coherentSkeletalRegions"
		},
		key : {
			type : sw.local,
			key : "coherentSkeletalDivisionType",
		}
		//Later on more compact definition
		//coherentSkeletalRegions[local.coherentSkeletalDivisionType]
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
		title : "Number Skeletal Divisions",
		value : {
			type : sw.local,
			key : "skeletalDivisionCount",
		}
	}, {
		type : sw.editButton,
		linkDataInputs : [ {
			type : sw.global,
			key : "individual",
			varName : "skeletalInventory",
		}, {
			type : sw.constant,
			varName : "pageUri",
			value : "coherentSkeletalDivision",
		}, {
			type : sw.local,
			key : "uri",
			varName : "individual",
		}, {
			type : sw.local,
			value : "type",
		}],
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


skeletalDivisionData = {

	type : sw.dataField,
	textValue : {
		type : sw.local,
		key : "typeLabel"
	},
	linkDataInputs : [ {
		type : sw.local,
		key : "skeletalDivisionType",
	}, {
		type : sw.global,
		key : "individual",
	}, {
		//The the CEF is defined by the container because 
		//there is two different types of cases. The symmetric and the
		//coherentSkeletalSubdivision
		type : sw.local,
		key : "pageUri",
	}, {
		type : sw.local,
		key : "cefPageUri",
	}, {
		type : sw.local,
		key : "queryType",
	}, {
		type : sw.local,
		key : "skeletalRegion",
	}, {
		type : sw.local,
		key : "simpleQuery",
	}],
	mapping : "pageLoader",
	dataToDisplay : {
		type : sw.field,
		of : {
			type : sw.global,
			key : "skeletalDivisions",
		},
		key : {
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
		},{
			type : sw.constant,
			varName : "pageUri",
			value : "skeletalDivision",
		},{
			type : sw.local,
			key : "cefPageUri",
		},{
			type : sw.local,
			key : "uri",
			varName : "individual",
		}, {
			type : sw.local,
			key : "type",
			varName : "skeletalRegionType",
		}, {
			type : sw.local,
			key : "skeletalDivisionType",
		} ],
		mapping : "pageLoader",
	}, {	
		type : sw.deleteButton,
		linkDataInputs : [
		    {
				type : sw.local,
				key : "uri",
				varName : "boneDivision",
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
			key : "typeLabel"
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
			key : "skeletalDivisionClass",
		}, {
			type : sw.local,
			key : "classUri",
		},{
			 type : sw.local,
			 key : "cefPageUri",
		}, {
			type : sw.local,
			key : "pageUri",
		}],
		mapping : "pageLoader",
		dataToDisplay : {
			type : sw.field,
			of : {
				type : sw.global,
				key : "singleBones"
			},
			key : {
				type : sw.local,
				key : "skeletalDivisionClass",
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
			title : "Label",
			value : {
				type : sw.local,
				key : "label",
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
				key : "boneOrgan",
				varName : "individual",
			}, {
				type : sw.local,
				key : "type",
			}, {
				type : sw.local,
				key : "completenessState",
			}, {
				type : sw.local,
				key : "completeness",
			}],
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