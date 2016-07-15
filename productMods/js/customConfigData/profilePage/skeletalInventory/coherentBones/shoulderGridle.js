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
		        	key : "skeletalDivisionClass",
		        	value : FMA + "23217",
		        },{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_24141", 
					          "http://purl.obolibrary.org/obo/FMA_24163", 
					          "http://purl.obolibrary.org/obo/FMA_24164"],
					key : "classSelection"
				} ],
		elements : [ coherentData]
	}


singeShoulderGirdle = {
		type : sw.container,
		localData : [
		        {
		        	type : sw.constant,
		        	value : "singleShoulderGirdle",
		        	key : "pageUri",
		        }, {
		        	type : sw.constant,
		        	value : "singleShoulderGirdle",
		        	key : "dataKey",
		        }, {
					type : sw.constant,
					value : "Single Bones of Pectoral Girdle",
					key : "boneLabel",
				}] ,
		elements : [ singleBones ]
	}

shoulderGridleTab = {
		type : sw.tab,
		tabTitle : "Shoulder Girdle",
		elements : [pectoralGridle, singeShoulderGirdle]
	}