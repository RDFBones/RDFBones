pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : SkeletalRegion,
} ]


/*
if(pageData.coherentBoneRegion != ""){
	pageData.pageElements = [ {
		type : sw.customPage,
		pageLoader : SkeletalRegion,
	} ]
} else {
	pageData.pageElements = [ {
		type : sw.customPage,
		pageLoader : CoherentSkeletalRegion,
	} ]
}*/


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

querySwitch = {
	type : sw.switchCase,
	on : "pageData.simpleQuery",
	cases : [{
		value : "simpleQuery",
		toReturn : "systemicPartsWithout",
	}],
	defaultCase : "systemicPartsWithoutNoBoneOrgan"	
}

partlySymmetricCEF1 = {
   dataOperation : "query", 
   queryType : querySwitch,
   parameters : [inputClass], 
   systemicParts : partlySymmetricCEF,
   symmetricClasses : symmetricBonesQueryCEF,
   systemicParts$1 : extract,
   symmetricClasses$1 : group,
   systemicParts$2 : merge,
   //existing : boneOrganFilteredQuery, 
}

pageData.partlySymmetricSkeletalDivision = {
	uri : pageData.skeletalRegion,
	label : labelQuery,
	systemicParts1 : partlySymmetricCEF1,
}


