pageData.phalanxOfToeClass = "http://purl.obolibrary.org/obo/FMA_24493"

singlePhalanx = {
	type : sw.container,
	localData : [ {
		type : sw.constant,
		value : "Phalanges of toe",
		key : "boneLabel",
	}, {
		type : sw.constant,
		value : "someThingDifferent",
		key : "pageUri",
	},{
		type : sw.constant,
		value : "singlePhalanx",
		key : "dataKey",
	} ],
	elements : [ singleBones ]
}

pageData.tarsalClass = "http://purl.obolibrary.org/obo/FMA_24491"

singleTarsal = {
	type : sw.container,
	localData : [ {
		type : sw.constant,
		value : "Tarsal Bones",
		key : "boneLabel",
	},{
		type : sw.constant,
		value : "symmetricSingleBone",
		key : "pageUri",
	}, {
		type : sw.constant,
		value : "singleTarsal",
		key : "dataKey",
	} ],
	elements : [ singleBones ]
}

pageData.metatarsalClass = "http://purl.obolibrary.org/obo/FMA_24492"

singleMetaTarsal = {
	type : sw.container,
	localData : [ {
		type : sw.constant,
		value : "Metatarsal Bones",
		key : "boneLabel",
	},{
		type : sw.constant,
		value : "symmetricSingleBone",
		key : "pageUri",
	},{
		type : sw.constant,
		value : "http://purl.obolibrary.org/obo/FMA_71340",
		key : "classUri",
	}, {
		type : sw.constant,
		value : "singleMetaTarsal",
		key : "dataKey",
	} ],
	elements : [ singleBones ]
}


pageData.lowerLimbSkeletonClasses = [
            "http://purl.obolibrary.org/obo/FMA_9611", //Femur
            "http://purl.obolibrary.org/obo/FMA_24485", //Patella
            "http://purl.obolibrary.org/obo/FMA_24476", //Tibia
            "http://purl.obolibrary.org/obo/FMA_24479" //Fibula
            ]

singleLowerLimbSkeleton = {
		type : sw.container,
		localData : [ {
			type : sw.constant,
			value : "Lower Limb Skeleton",
			key : "boneLabel",
		}, {
			type : sw.constant,
			value : "singleLowerLimbSkeleton",
			key : "dataKey",
		} ],
		elements : [ singleBones ]
	}


singleLowerLimbTab = {
	type : sw.tab,
	tabTitle : "Lower Limb",
	elements : [ singlePhalanx, singleTarsal, singleMetaTarsal, singleLowerLimbSkeleton]
}
