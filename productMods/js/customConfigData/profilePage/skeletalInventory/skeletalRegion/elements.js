
pageData.skeletalRegions = []

skeletalRegionElements = [

	{
		type : sw.container,
		localData : [
		        skeletalRegionCEF, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_46565",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Skull",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : ["http://purl.obolibrary.org/obo/FMA_46565"],
					key : "classSelection"
				} ],
		elements : [ skeletalRegionData]
	}, {
		type : sw.container,
		localData : [
		        skeletalRegionCEF, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_13478",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Vertebral Column",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : ["http://purl.obolibrary.org/obo/FMA_13478"],
					key : "classSelection"
				} ],
		elements : [ skeletalRegionData]
	}
]

