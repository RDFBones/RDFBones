addCoherent = {

	type : sw.addNew,
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
	},{
		type : sw.constant,
		key : "pageUri",
		value : "coherentBones",
	} ],
	mapping : "pageLoader",
}

coherentDataTable = {

	type : sw.dataTable,
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
		linkDataInputs : [
			{
				type : sw.local,
				key : "boneDivision",
				varName : "individual",
			}, {
				type : sw.global,
				key : "individual",
				varName : "skeletalInventory",
			}, {
				type : sw.constant,
				key : "pageUri",
				value : "coherentBones",
			}, {
				type : sw.local,
				key : "boneDivision",
				varName : "existingBoneDivision",
			}, {
				type : sw.local,
				key : "type",
				varName : "existingBoneDivisionType",
			}, {
				type : sw.local,
				key : "boneUri",
				varName : "classUri",
			}
		],
		mapping : "pageLoader",
	} ]
}

tarsalBones = {
	uri : "",
	type : sw.container,
	localData : [
			{
				type : sw.constant,
				value : "http://purl.obolibrary.org/obo/FMA_71339",
				key : "boneUri",
			},
			{
				type : sw.constant,
				value : "Tarsal Bones",
				key : "boneLabel",
			},
			{
				type : sw.constant,
				value : [ "http://purl.obolibrary.org/obo/FMA_71339",
						"http://purl.obolibrary.org/obo/FMA_78509",
						"http://purl.obolibrary.org/obo/FMA_78508"],
				key : "classSelection"
			} ],
	elements : [ addCoherent, coherentDataTable]
}

metaTarsalBones = {
	uri : "",
	type : sw.container,
	localData : [ {
		type : sw.constant,
		value : "http://purl.obolibrary.org/obo/FMA_71340",
		key : "boneUri",
	}, {
		type : sw.constant,
		value : "Metatarsal Bones",
		key : "boneLabel",
	}, {
		type : sw.constant,
		value : [ "http://purl.obolibrary.org/obo/FMA_71340",
				"http://purl.obolibrary.org/obo/FMA_78511",
				"http://purl.obolibrary.org/obo/FMA_78510"],
		key : "classSelection"
	}],
	elements : [ addCoherent, coherentDataTable ]
}


coherentTab = {
	type : sw.tab,
	tabTitle : "Coherent Bone Regions",
	elements : [tarsalBones, metaTarsalBones]
}

singleTab = {
	type : sw.tab,
	tabTitle : "Single Bones",
	elements : []
}

tabContainer = {
	
	type : sw.tabContainer,
	tabs : [coherentTab, singleTab]
} 


pageData.pageElements = [ tabContainer ]



