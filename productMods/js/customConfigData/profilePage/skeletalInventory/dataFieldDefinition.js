skeletalDivisionData = {
		
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
			key : "sortedSkeletalRegions"
		},
		key : {
			type : sw.local,
			key : "skeletalRegion",
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
		title : "Number of Coherent Skeletal Division",
		value : {
			type : sw.local,
			key : "coherentSkeletalDivisionCount",
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
			value : "boneDivision",
		}, {
			type : sw.local,
			key : "cefPageUri",
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

skeletalSubdivisionData = {
		
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
			key : "skeletalSubdivision",
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
		title : "Number of Coherent Skeletal Regions",
		value : {
			type : sw.local,
			key : "coherentSkeletalRegionCount",
			//key : "skeletalSubdivision",

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
			value : "skeletalSubdivision",
		}, {
			type : sw.local,
			key : "cefPageUri",
		}, {
			type : sw.local,
			key : "skeletalSubdivision",
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
	},
	/*{	
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
	} */ ]
}

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
	}, {
		type : sw.local,
		key : "skeletalRegion",
	}, {
		type : sw.local,
		key : "simpleQuery",
	}],
	mapping : "pageLoader",
	dataToDisplay : {
		type : sw.selectOperationResult,
		dataToSelect : {
			type : sw.global,
			key : "coherentSkeletalRegions",
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
		},{
			type : sw.constant,
			varName : "pageUri",
			value : "boneDivision",
		}, {
			type : sw.local,
			key : "cefPageUri",
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
		}, ],
		mapping : "pageLoader",
		dataToDisplay : {
			type : sw.field,
			of : {
				type : sw.global,
				key : "sortedSingleBones"
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