singleBones = {
	type : sw.constant,
	varName : "queryType",
	value : "singleBones"
}

individual = {
	type : sw.global,
	varName : "skeletalInventory",
	key : "individual"
}

singleQuery = [
{
	parameters : [ singleBones, individual, {
		type : sw.global,
		varName : "inputType",
		key : "neurocraniumClasses",
	} ],
	mapping : "dataLoader",
	toVariable : "singleNeurocranium",
}, {
	parameters : [ singleBones, individual, {
		type : sw.global,
		varName : "inputType",
		key : "viscerocraniumClasses",
	} ],
	mapping : "dataLoader",
	toVariable : "singleViscerocranium",
}
]


coherentQuery = [
      {
		parameters : [ {
			type : sw.constant,
			varName : "queryType",
			value : "coherentBones"
		}, {
			type : sw.global,
			varName : "skeletalInventory",
			key : "individual"
		}, ],
		mapping : "dataLoader",
		toVariable : "coherentBones",
	}
]


pageData.queries = coherentQuery.concat(singleQuery)