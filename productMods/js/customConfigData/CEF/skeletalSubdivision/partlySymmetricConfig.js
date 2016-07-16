pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : SkeletalRegion,
} ]

boneOrganFilteredQuery = {
	    dataOperation : "query",
	    queryType : "singleBones",
	    parameters  : [skeletalInventory, inputType]
	}

symmetricBonesQueryCEF = {
		dataOperation : "query",
		queryType : "subClasses",
		parameters : [
			{
				value : {
					type : sw.field,
					of : {
						type : sw.field,
						of : {
							type : sw.global,
							key : "partlySymmetricBones",
						},
						key : "this.uri",
					},
					key : {
						type : sw.constant,
						value : "parentRegions",
					},
				},
				name : "classUri",
			},
		],
	}

partlySymmetricCEF = { 
   dataOperation : "query", 
   queryType : "systemicPartsWithout", 
   parameters : [inputClass], 
} 

partlySymmetricCEF1 = {
   dataOperation : "query", 
   queryType : "systemicPartsWithoutNoBoneOrgan", 
   parameters : [inputClass], 
   systemicParts : partlySymmetricCEF,
   symmetricClasses : symmetricBonesQueryCEF,
   systemicParts$1 : extract,
   symmetricClasses$1 : group,
   systemicParts$2 : merge,
   //existing : boneOrganFilteredQuery, 
}

pageData.partlySymmetricSkeletalDivision = {
	uri : pageData.skeletalDivision,
	label : labelQuery,
	systemicParts1 : partlySymmetricCEF1,
}