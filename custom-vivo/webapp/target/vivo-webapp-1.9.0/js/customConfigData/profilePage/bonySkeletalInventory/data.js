
pageData.dryBones = {
	dataOperation : "query",
	queryType : "singleBones",
	parameters : [{
		value : "this.individual",
		name : "skeletalInventory",
	}],
	sortBy : "skeletalDivisionType",
}

dryBones = {
	type : sw.dataField,
	textValue : {
		type : sw.local,
		key : "typeLabel"
	},
	linkDataInputs : [
	{
		type : sw.global,
		key : "individual",
	}, {
		type : sw.local,
		key : "skeletalDivisionClass",
		varName : "class"
	}, {
		type : sw.local,
		key : "classUri",
	},{
		type : sw.local,
		key : "formUri",
	}],
	mapping : "customForm",
	dataToDisplay : {
		type : sw.field,
		of : {
			type : sw.global,
			key : "dryBones"
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
		type : sw.binButton,
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