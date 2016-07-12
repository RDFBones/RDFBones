singleBones = {
	type : sw.constant,
	varName : "queryType",
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


pageData.queries = coherentQuery.concat(singleQuery).concat(skeletalSubDivisionQuery)