skeletalInventory = {
	value : "pageData.individual",
	name : "skeletalInventory",
}

pageData.coherentSkeletalRegions = {
	dataOperation : "query",
	queryType : "coherentSkeletalDivisions",
	parameters : [skeletalInventory],
	sortBy : "type",
}

pageData.skeletalDivisions = {
	dataOperation : "query",
	queryType : "skeletalDivisions",
	parameters : [skeletalInventory],
	sortBy : "type",
}

pageData.singleBones = {
	dataOperation : "query",
	queryType : "singleBones",
	parameters : [{
		value : "this.individual",
		name : "skeletalInventory",
	}],
	sortBy : "skeletalDivisionType",
}

