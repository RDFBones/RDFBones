
pageData.skeletalRegions = []

skeletalRegionElements = [

	{
		type : sw.container,
		localData : [
		        skeletalSubDivisionCEF, 
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
				}, {
					type : sw.constant,
					value : "skeletalSubdivisionCEF",
					key : "cefPageUri",
				}],
		elements : [ skeletalSubdivisionData]
	}, {
		type : sw.container,
		localData : [
		        skeletalSubDivisionCEF, 
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
		elements : [ skeletalSubdivisionData]
	}
]

