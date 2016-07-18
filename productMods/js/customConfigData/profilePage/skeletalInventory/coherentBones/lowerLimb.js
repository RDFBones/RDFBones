

phalangesOfFoot = {
		type : sw.container,
		localData : [
		      	{
		      		type : sw.constant,
		      		value : "phalanges",
		      		key : "pageUri",
		      	} ,{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_78512",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Set of phalanges of foot",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_78512",
					          "http://purl.obolibrary.org/obo/FMA_231319",
					          "http://purl.obolibrary.org/obo/FMA_231317"],
					key : "classSelection"
				}, {
					type : sw.constant,
					key : "cefPageUri",
					value : "phalanges",
				}],
		elements : [ coherentData]
	}



freelowerlimb = {
		type : sw.container,
		localData : [
		      	   symmetricCoherentCEF ,
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_24144",
					key : "skeletalRegion",
				},{
					type : sw.constant,
					value : "Skeleton of Free Lower Limb",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_24144",
					          "http://purl.obolibrary.org/obo/FMA_21174",
					          "http://purl.obolibrary.org/obo/FMA_21175"],
					key : "classSelection"
				}],
		elements : [ coherentData]
	}


tarsalbones = {
		type : sw.container,
		localData : [
		      	   symmetricCoherentCEF ,

				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_71339",
					key : "skeletalRegion",
				},
				{
					type : sw.constant,
					value : "Tarsal Bones",
					key : "boneLabel",
				},
				{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_71339",
							"http://purl.obolibrary.org/obo/FMA_78509",
							"http://purl.obolibrary.org/obo/FMA_78508" ],
					key : "classSelection"
				}],
		elements : [ coherentData ]
	}

metatarsalbones = {
		uri : "",
		type : sw.container,
		localData : [
		      	   symmetricCoherentCEF ,

				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_71340",
					key : "skeletalRegion",
				}, {
					type : sw.constant,
					value : "Metatarsal Bones",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_71340",
							"http://purl.obolibrary.org/obo/FMA_78511",
							"http://purl.obolibrary.org/obo/FMA_78510" ],
					key : "classSelection"
				},],
		elements : [ coherentData ]
	}

singleLowerLimb = {
		
		type : sw.container,
		localData : [
		        {
		        	type : sw.constant,
		        	value : "singleLowerLimb",
		        	key : "pageUri",
		        }, {
		        	type : sw.constant,
		        	value : "singleLowerLimb",
		        	key : "dataKey",
		        }, {
		        	type : sw.constant,
		        	key : "skeletalDivisionClass",
		        	value : FMA + "7184",
		        },{
					type : sw.constant,
					value : "Single Bone Organs of Lower Limb",
					key : "boneLabel",
				}] ,
		elements : [ singleBones ]
	}



lowerLimbTab = {
	type : sw.tab,
	tabTitle : "Lower Limb",
	elements : [phalangesOfFoot, freelowerlimb, tarsalbones, metatarsalbones, singleLowerLimb]
}
