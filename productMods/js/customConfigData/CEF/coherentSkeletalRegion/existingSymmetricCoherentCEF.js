



//Additional query with respect to the previous one


pageData.existingSkeletalRegion = {
		
	uri : pageData.skeletalRegion,
	type : mstQuery,	
	label : labelQuery,
	systemicParts : {
		dataOperation : "dataOperation",
		queryType : "boneOrgans",
		input : [{
			value : "this.uri",
			name : "boneDivision",
		}]
	}
}

pageData.sortedExisting = {
	dataOperation : "sortToKey",
	object : "pageData.existingSkeletalRegion.systemicParts",
	type : "object",
	by : "type",	
}

customPageDataOperations.push({
	
	object : "pageData.skeletalRegions.subClasses1.systemicParts.existing",
	operation : {
		dataOperation : "selection",
		object : "pageData.sortedSingleBones",
		by : "this.uri"
	}
})


customPageDataOperations.push({
	
	object : "pageData.skeletalRegions.subClasses1.systemicParts.subClasses.existing",
	operation : {
		dataOperation : "selection",
		object : "pageData.sortedSingleBones",
		by : "this.uri"
	}
})






