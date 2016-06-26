pageData.pageElements = [

{
	type : sw.labelEditor,
}, {
	type : sw.imagesField,
}, {
	type : sw.addNew,
	textValue : {
		type : sw.constant,
		value : "Systemic Parts",
	},
	linkDataInputs : [ {
		type : sw.global,
		key : "individual",
	} ],
	mapping : "entryFormLoad",
}, {
	type : sw.dataTable,
	dataToDisplay : {
		type : sw.local,
		key : "systemicParts",
	},
	dataFields : [ {
		type : sw.literalField,
		title : "Type",
		value : {
			type : sw.local,
			key : "type",
		}
	}, {
		type : sw.literalFieldMiddle,
		title : "Completeness",
		value : {
			type : sw.local,
			key : "completnessLabel",
		}
	}, {
		type : sw.editButton,
		linkDataInputs : [ {
			type : sw.local,
			key : "boneSegment",
		}, {
			type : sw.constant,
			key : "pageUri",
			value : "boneDivision",
		} ],
		mapping : "entryFormLoad",
	} ]
} ]
