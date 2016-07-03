pectoralGridle = {
		type : sw.container,
		localData : [
		        symmetricBoneSegment, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_24141",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Skeleton of Pectoral Girdle",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_24141", 
					          "http://purl.obolibrary.org/obo/FMA_24163", 
					          "http://purl.obolibrary.org/obo/FMA_24164"],
					key : "classSelection"
				} ],
		elements : [ coherentData]
	}


shoulderGridleTab = {
		type : sw.tab,
		tabTitle : "Shoulder Girdle",
		elements : [pectoralGridle]
	}