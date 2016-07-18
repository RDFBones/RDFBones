singleBones = {
	type : sw.constant,
	varName : "qBueryType",
	value : "singleBones"
}

individual = {
	type : sw.global,
	varName : "skeletalInventory",
	key : "individual"
}

singleQuery = [ {
	parameters : [ singleBones, individual, {
		type : sw.global,
		varName : "inputType",
		key : "neurocraniumClasses",
	} ],
	mapping : "dataLoader",
	toVariable : "singleNeurocranium",
	concatResultArrays : true,
}, {
	parameters : [ singleBones, individual, {
		type : sw.global,
		varName : "inputType",
		key : "viscerocraniumClasses",
	} ],
	mapping : "dataLoader",
	toVariable : "singleViscerocranium",
	concatResultArrays : true,
}, {
	parameters : [ singleBones, individual, {
		type : sw.global,
		varName : "inputType",
		key : "phalanxOfToeClass",
	} ],
	mapping : "dataLoader",
	toVariable : "singlePhalanx",
}, {
	parameters : [ singleBones, individual, {
		type : sw.global,
		varName : "inputType",
		key : "tarsalClass",
	} ],
	mapping : "dataLoader",
	toVariable : "singleTarsal",
}, {
	parameters : [ singleBones, individual, {
		type : sw.global,
		varName : "inputType",
		key : "meatarsalClass",
	} ],
	mapping : "dataLoader",
	toVariable : "singleMetaTarsal",
}, {
	parameters : [ singleBones, individual, {
		type : sw.global,
		varName : "inputType",
		key : "lowerLimbSkeletonClasses",
	} ],
	mapping : "dataLoader",
	toVariable : "singleLowerLimbSkeleton",
	concatResultArrays : true,
} ]

coherentQuery = [ {
	parameters : [ {
		type : sw.constant,
		varName : "queryType",
		value : "coherentBones"
	}, {
		type : sw.global,
		varName : "skeletalInventory",
		key : "individual"
	}, ],
	mapping : "dataLoader",
	toVariable : "coherentBones",
} ]


skeletalSubDivisionQuery = [ {
	parameters : [ {
		type : sw.constant,
		varName : "queryType",
		value : "skeletalSubdivision"
	}, {
		type : sw.global,
		varName : "skeletalInventory",
		key : "individual"
	}, ],
	mapping : "dataLoader",
	toVariable : "skeletalSubdivision",
} ]


pageData.singleBones = {
		dataOperation : "query",
		queryType : "singleBones1",
		parameters : [{
			value : "this.individual",
			name : "skeletalInventory",
		}]		
}

pageData.sortedSingleBones = {
		dataOperation : "sortToKey",
		object : "pageData.singleBones",
		type : "object",
		by : "skeletalDivisionType"
}


pageData.skeletalRegions = {
		
	dataOperation : "query",
	queryType : "skeletalRegions",
	parameters : [{
		value : "this.individual",
		name : "skeletalInventory",
		}]
}
	
pageData.sortedSkeletalRegions = {
		
	dataOperation : "sortToKey",
	object : "pageData.skeletalRegions",
	type : "object",
	by : "type",	
}

pageData.coherentSkeletalRegions = {
		
	dataOperation : "query",
	queryType : "coherentBones",
	parameters : [skeletalInventory]
}

skeletalInventory = {
	value : "pageData.individual",
	name : "skeletalInventory",
}

skeletalRegion = {
	value : "this.uri",
	name : "skeletalRegion",
}

coherentBones = {
	dataOperation : "query",
	queryType : "coherentBones",
	parameters : [skeletalInventory, skeletalRegion],
}

/*
 * Partlysymmetric Skeletal Divisions 
 */
/*
pageData.partlySymmetricSkeletalDivision = [
	{ uri : FMA + "46565"}, //Skull
	{ uri : FMA + "13478"}, //Vertebral Column
	{ uri : FMA + "7480"}, //Rib Cage
	{ uri : FMA + "16580"}, //Bony Pelvis	
]


//Systemicparts

customPageDataOperations.push({
	object : "pageData.partlySymmetricSkeletalDivision.systemicParts",
	operation : systemicPartsQuery
})

customPageDataOperations.push({
	object : "pageData.partlySymmetricSkeletalDivision.coherentBones",
	operation : coherentBones,
})

customPageDataOperations.push({
	object : "pageData.partlySymmetricSkeletalDivision.systemicParts.coherentBones",
	operation : coherentBones,
})
*/


/*
 * Symmetric Skeletal Divisions 
 */

/*
pageData.symmetricSkeletalDivision = [
	{ uri : FMA + "24141"}, //Skeleton of Pectoral Girdle
	{ uri : FMA + "71199"}, //Skeleton of Forearm 
	{ uri : FMA + "71335"}, //Carpal Bones
	{ uri : FMA + "71336"}, //Metacarpal Bones
	{ uri : FMA + "71339"}, //Tarsal Bones
	{ uri : FMA + "71340"}, //Metatarsal Bones
]

customPageDataOperations.push({
	object : "pageData.symmetricSkeletalDivision.coherentBones",
	operation : coherentBones,
})

customPageDataOperations.push({
	object : "pageData.symmetricSkeletalDivision.subClasses",
	operation : subClass
})

customPageDataOperations.push({
	object : "pageData.symmetricSkeletalDivision.subClasses.coherentBones",
	operation : coherentBones
})
*/


//pageData.queries = coherentQuery.concat(singleQuery).concat(skeletalSubDivisionQuery)