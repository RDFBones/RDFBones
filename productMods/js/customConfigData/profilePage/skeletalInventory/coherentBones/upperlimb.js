forearm = {

	type : sw.container,

	localData : [
	
	   symmetricBoneSegment ,
	{

		type : sw.constant,

		value : "http://purl.obolibrary.org/obo/FMA_71199",

		key : "boneUri",

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

		key : "boneUri",

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

		value : "http://purl.obolibrary.org/obo/FMA_71335",

		key : "boneUri",

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

upperLimbTab = {

	type : sw.tab,

	tabTitle : "Upper Limb",

	elements : [ forearm, carpalbones, metacarpalbones, phalangesofhand ]

}
