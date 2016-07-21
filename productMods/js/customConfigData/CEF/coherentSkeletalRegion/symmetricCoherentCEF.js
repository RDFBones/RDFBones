
subClassPlusExisting = {
	dataOperation : "query",
	queryType : "subClassesWithout",
	parameters : [inputClass],
} 
	

systemicSubclass = {
	dataOperation : "query", 
	queryType : "systemicPartsWithout", 
	parameters : [inputClass], 
	subClasses : subClass,
}


pageData.mainSkeletalRegion = [{
	uri : pageData.skeletalRegion,	
	systemicParts : systemicSubclass,
	label : labelQuery,
}]


pageData.skeletalRegions = {	
	uri : pageData.skeletalRegion,	
	subClasses1 : subclassSystemic,
	subClasses1$1 : {
		dataOperation : "merge",
		what : "pageData.mainSkeletalRegion"
	},
	existing : {
		//This in this the coherent skeletal division
		uri : pageData.existingSkeletalRegion,
		label : labelQuery,
		systemicParts : systemicPartOfSkeletalRegion,
	},
	existingToSelect : existingBoneOrgans
}

/*
 * Setting the existing variable into the ontology data tree
 */

customPageDataOperations.push({
	
	object : "pageData.skeletalRegions.subClasses1.systemicParts.existingToSelect",
	operation : {
		dataOperation : "selection",
		object : "pageData.skeletalRegions.existing.systemicParts",
		by : "this.uri"
	}
})

customPageDataOperations.push({
	object : "pageData.skeletalRegions.subClasses1.systemicParts.subClasses.existingToSelect",
	operation : {
		dataOperation : "selection",
		object : "pageData.skeletalRegions.existing.systemicParts",
		by : "this.uri"
	}
})

pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : CoherentBoneRegionSelectorSymmetric,
} ]

