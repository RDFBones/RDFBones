
pageData.skeletalRegion = {
	uri : pageData.skeletalRegion,
	label : labelQuery,
	systemicParts1 : partlySymmetricLoad,
	existing : {
		uri : pageData.existingSkeletalRegionUri,
		label : labelQuery,
		systemicParts : systemicParts
	},
}

pageData.existingBoneOrgans = existingBoneOrgans

/*
 * pageData.existingSkeletalRegion is defined only 
 * if the request come from the profile page
 */


pageData.existingCoherentSkeletalDivisions = {
		
		dataOperation : "query",
		queryType : "systemicParts",
		parameters : [{
			value : "pageData.existingSkeletalRegion",
			name : "skeletalRegion",
		}],
		sortBy : "type",
}


customPageDataOperations.push({
	object : "pageData.skeletalRegion.systemicParts1.existing",
	operation : {
		dataOperation : "selection",
		object : "pageData.skeletalRegion.existing.systemicParts",
		by : "this.uri"
	}
})


pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : SkeletalRegion,
} ]


