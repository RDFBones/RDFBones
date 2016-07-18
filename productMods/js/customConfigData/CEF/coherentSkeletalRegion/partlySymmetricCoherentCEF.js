

pageData.skeletalRegions = {	
	uri : pageData.skeletalRegion,	
	systemicParts1 : partlySymmetricNoBoneOrgan,
}

/*
pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : CoherentSkeletalRegion,
} ]

*/

pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : CoherentBoneRegionSelectorPartlySymmetric,
} ]
