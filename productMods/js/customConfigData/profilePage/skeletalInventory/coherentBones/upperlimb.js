forearm = {

	type : sw.container,

	localData : [
	
	   symmetricBoneSegment ,
	{

		type : sw.constant,

		value : "http://purl.obolibrary.org/obo/FMA_71199",

		key : "skeletalRegion",

	}, {

		type : sw.constant,

		value : "Skeleton of Forearm",

		key : "boneLabel",

	}, {

		type : sw.constant,

		value : [ "http://purl.obolibrary.org/obo/FMA_71199",
		"http://purl.obolibrary.org/obo/FMA_71201",
		"http://purl.obolibrary.org/obo/FMA_71200" ],
		key : "classSelection"

	} ],

	elements : [ coherentData ]

}

carpalbones = {

	type : sw.container,

	localData : [
	      	   symmetricBoneSegment ,

	{

		type : sw.constant,

		value : "http://purl.obolibrary.org/obo/FMA_71335",

		key : "skeletalRegion",

	}, {

		type : sw.constant,

		value : "Carpal Bones",

		key : "boneLabel",

	}, {

		type : sw.constant,

		value : [ "http://purl.obolibrary.org/obo/FMA_71335",

		"http://purl.obolibrary.org/obo/FMA_71895",

		"http://purl.obolibrary.org/obo/FMA_71894" ],

		key : "classSelection"

	} ],

	elements : [ coherentData ]

}

metacarpalbones = {

	type : sw.container,

	localData : [
	             
	    symmetricBoneSegment, 
	{
		
		type : sw.constant,

		value : "http://purl.obolibrary.org/obo/FMA_71336",

		key : "skeletalRegion",

	}, {

		type : sw.constant,

		value : "Metacarpal Bones",

		key : "boneLabel",

	}, {

		type : sw.constant,

		value : [ "http://purl.obolibrary.org/obo/FMA_71336",

		"http://purl.obolibrary.org/obo/FMA_71897",

		"http://purl.obolibrary.org/obo/FMA_71896" ],

		key : "classSelection"

	} ],

	elements : [ coherentData ]

}

phalangesofhand = {

	type : sw.container,

	localData : [
	             symmetricBoneSegment, 
	{
		type : sw.constant,

		value : "http://purl.obolibrary.org/obo/FMA_71337",

		key : "boneUri",

	}, {

		type : sw.constant,

		value : "Phalanges of Hand",

		key : "boneLabel",

	}, {

		type : sw.constant,

		value : [ "http://purl.obolibrary.org/obo/FMA_71337",

		"http://purl.obolibrary.org/obo/FMA_71898",

		"http://purl.obolibrary.org/obo/FMA_71899" ],

		key : "classSelection"

	} ],

	elements : [ coherentData ]

}

singleUpperLimb = {
		
		type : sw.container,
		localData : [
		        {
		        	type : sw.constant,
		        	value : "singleUpperLimb",
		        	key : "pageUri",
		        }, {
		        	type : sw.constant,
		        	value : "singleUpperLimb",
		        	key : "dataKey",
		        }, {
		        	type : sw.constant,
		        	key : "skeletalDivisionClass",
		        	value : FMA + "7183",
		        },{
					type : sw.constant,
					value : "Single Bone Organs of Upper Limb",
					key : "boneLabel",
				}] ,
		elements : [ singleBones ]
	}


upperLimbTab = {

	type : sw.tab,

	tabTitle : "Upper Limb",

	elements : [ forearm, carpalbones, metacarpalbones, phalangesofhand, singleUpperLimb]
}
