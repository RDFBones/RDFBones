
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
		linkDataInputs : [
			{
				type : sw.global,
				key : "individual",
			}
		],
		mapping : "entryFormLoad",
	}
]