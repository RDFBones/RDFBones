


freelowerlimb = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_21144",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Skeleton of Free Lower Limb",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_21144",
					          "http://purl.obolibrary.org/obo/FMA_21174",
					          "http://purl.obolibrary.org/obo/FMA_21174"],
					key : "classSelection"
				} ],
		elements : [ coherentData]
	}


tarsalbones = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_71339",
					key : "boneUri",
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
				} ],
		elements : [ coherentData ]
	}

metatarsalbones = {
		uri : "",
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_71340",
					key : "boneUri",
				},
				{
					type : sw.constant,
					value : "Metatarsal Bones",
					key : "boneLabel",
				},
				{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_71340",
							"http://purl.obolibrary.org/obo/FMA_78511",
							"http://purl.obolibrary.org/obo/FMA_78510" ],
					key : "classSelection"
				} ],
		elements : [ coherentData ]
	}


lowerLimbTab = {
	type : sw.tab,
	tabTitle : "Lower Limb",
	elements : [freelowerlimb, tarsalbones, metatarsalbones]
}
