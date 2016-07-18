
pageData.mainSkeletalRegion = [{
	uri : pageData.skeletalRegion,	
	systemicParts : systemicNoBoneOrganSubclass,
	label : labelQuery,
}]


pageData.skeletalRegions = {	
	uri : pageData.skeletalRegion,	
	subClasses : subclassSystemic,
	subClasses$1 : {
		dataOperation : "merge",
		what : "pageData.mainSkeletalRegion"
	}
}

pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : CoherentBoneRegionSelectorSymmetric,
} ]
