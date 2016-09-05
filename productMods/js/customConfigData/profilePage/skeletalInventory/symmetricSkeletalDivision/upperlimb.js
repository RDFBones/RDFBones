skeletalDivisionClass = {
	type : sw.constant,
    key : "skeletalDivisionClass",
    value : FMA + "7183",    
}

forearm = {

	type : sw.container,
	localData : [
	
	    symmetricSkeletalDivisionCEF ,
	    symmetricSkeletalDivisionCEFUri ,
	{
		type : sw.constant,
		value : "http://purl.obolibrary.org/obo/FMA_71199",
		key : "skeletalDivisionType",
	}, {
		type : sw.constant,
		value : "Skeleton of Forearm",
		key : "typeLabel",
	}, {
		type : sw.constant,
		value : [ "http://purl.obolibrary.org/obo/FMA_71199",
		"http://purl.obolibrary.org/obo/FMA_71201",
		"http://purl.obolibrary.org/obo/FMA_71200" ],
		key : "classSelection"
	} ],

	elements : [ skeletalDivisionData ]
}

carpalbones = {

	type : sw.container,
	localData : [
	      	   symmetricSkeletalDivisionCEF ,
	{
		type : sw.constant,
		value : "http://purl.obolibrary.org/obo/FMA_71335",
		key : "skeletalDivisionType",
	}, {
		type : sw.constant,
		value : "Set of Carpal Bones",
		key : "typeLabel",
	}, {
		type : sw.constant,
		value : [ "http://purl.obolibrary.org/obo/FMA_71335",
		          "http://purl.obolibrary.org/obo/FMA_71895",
		          "http://purl.obolibrary.org/obo/FMA_71894" ],
		key : "classSelection"
	} ],
	elements : [ skeletalDivisionData ]
}

metacarpalbones = {

	type : sw.container,

	localData : [
	    symmetricSkeletalDivisionCEF, 
	{
		type : sw.constant,
		value : "http://purl.obolibrary.org/obo/FMA_71336",
		key : "skeletalDivisionType",
	}, {
		type : sw.constant,
		value : "Set of Metacarpal Bones",
		key : "typeLabel",
	}, {
		type : sw.constant,
		value : [ "http://purl.obolibrary.org/obo/FMA_71336",
		          "http://purl.obolibrary.org/obo/FMA_71897",
		          "http://purl.obolibrary.org/obo/FMA_71896" ],
		key : "classSelection"
	} ],
	elements : [ skeletalDivisionData ]
}

phalangesofhand = {

	type : sw.container,
	localData : [
     symmetricSkeletalDivisionCEF, 
     {
        	type : sw.constant,
        	value : "singleUpperLimb",
        	key : "phalanxOfHand",
        },{
		type : sw.constant,
		value : "http://purl.obolibrary.org/obo/FMA_71337",
		key : "skeletalDivisionType",
	}, {
		type : sw.constant,
		value : "Set of Phalanges of Hand",
		key : "typeLabel",
	}, {
		type : sw.constant,
		value : [ "http://purl.obolibrary.org/obo/FMA_71337",
		          "http://purl.obolibrary.org/obo/FMA_71898",
		          "http://purl.obolibrary.org/obo/FMA_71899" ],
		key : "classSelection"
	} ],
	elements : [ skeletalDivisionData ]
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
		        	value :  FMA + "7183",
		        	      /*    "http://purl.obolibrary.org/obo/FMA_71337",
		        	          "http://purl.obolibrary.org/obo/FMA_71336",
		        	          "http://purl.obolibrary.org/obo/FMA_71335",
		        	          "http://purl.obolibrary.org/obo/FMA_71199"
		        	         ]*/
		        },{
					type : sw.constant,
					value : "Single Bones of Upper Limb",
					key : "typeLabel",
				}] ,
		elements : [ singleBones ]
	}


upperLimbTab = {
	type : sw.tab,
	tabTitle : "Upper Limb",
	elements : [ forearm, carpalbones, metacarpalbones, phalangesofhand, singleUpperLimb]
}
