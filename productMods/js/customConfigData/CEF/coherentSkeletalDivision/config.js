
pageData.skeletalRegions = {
	uri : pageData.coherentSkeletalDivisionType,
	label : labelQuery,
	systemicParts1 : partlySymmetricLoad,
	existing : {
		uri : pageData.existingSkeletalRegionUri,
		label : labelQuery,
		systemicParts11 : systemicParts2
	},
}


pageData.existingBoneOrgans = existingBoneOrgans
pageData.existingCoherenSkeletalRegion = existingCoherentSkeletalRegions



customPageDataOperations.push({
	object : "pageData.skeletalRegions.systemicParts1.existing",
	operation : {
		dataOperation : "selection",
		object : "pageData.skeletalRegions.existing.systemicParts11",
		by : "this.uri"
	}
})


customPageDataOperations.push({
	object : "pageData.skeletalRegions.systemicParts1.existingToSelect",
	operation : {
		dataOperation : "selection",
		object : "pageData.existingCoherenSkeletalRegion",
		by : "this.uri"
	}
})

customPageDataOperations.push({
	object : "pageData.skeletalRegions.systemicParts1.systemicParts.existingToSelect",
	operation : {
		dataOperation : "selection",
		object : "pageData.existingBoneOrgans",
		by : "this.uri"
	}
})


customPageDataOperations.push({
	object : "pageData.skeletalRegions.systemicParts1.systemicParts.subClasses.existingToSelect",
	operation : {
		dataOperation : "selection",
		object : "pageData.existingBoneOrgans",
		by : "this.uri"
	}
})

customPageDataOperations.push({
	object : "pageData.skeletalRegions.systemicParts1.existingSystemicPart",
	operation : {
		dataOperation : "selection",
		object : "pageData.skeletalRegions.existing.systemicParts11",
		by : "this.uri"
	}
})



pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : CoherentSkeletalDivision,
} ]


