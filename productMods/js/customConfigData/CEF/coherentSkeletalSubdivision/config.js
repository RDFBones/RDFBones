

pageData.skeletalRegions = {	
	uri : pageData.skeletalRegion,	
	systemicParts1 : partlySymmetricLoad,
	existing : {
		uri : pageData.existingSkeletalRegion,
		label : labelQuery,
		type : typeQuery,
		systemicParts11 : systemicPartsWithCompletenessSorted
	},
}

pageData.existingBoneOrgans = existingBoneOrgans


customPageDataOperations.push({
	
	object : "pageData.skeletalRegions.systemicParts1.systemicParts.existingSystemicPart",
	operation : {
		dataOperation : "selection",
		object : "pageData.skeletalRegions.existing.systemicParts11",
		by : "this.uri"
	}
})

customPageDataOperations.push({
	object : "pageData.skeletalRegions.systemicParts1.systemicParts.subClasses.existingSystemicPart",
	operation : {
		dataOperation : "selection",
		object : "pageData.skeletalRegions.existing.systemicParts11",
		by : "this.uri",
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
	object : "pageData.skeletalRegions.systemicParts1.systemicParts.subClasses.existingToSelectSubClass",
	operation : {
		dataOperation : "selection",
		object : "pageData.existingBoneOrgans",
		by : "this.uri"
	}
})

pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : CoherentSkeletalSubdivision,
} ]
