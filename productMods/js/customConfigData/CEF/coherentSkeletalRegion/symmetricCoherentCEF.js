
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
	}
}

pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : CoherentBoneRegionSelectorSymmetric,
} ]



pageData.existingSingleBones = {
		
	dataOperation : "query",
	queryType : "existingBoneOrgan1",
	parameters : [skeletalInventory]
}


pageData.sortedSingleBones = {
		
	dataOperation : "sortToKey",
	object : "pageData.existingSingleBones",
	type : "object",
	by : "mst",	
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

