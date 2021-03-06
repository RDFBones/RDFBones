pectoralGridle = {
		type : sw.container,
		localData : [
		        symmetricSkeletalDivisionCEF, 
		        symmetricSkeletalDivisionCEFUri ,
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_24141",
					key : "skeletalDivisionType",
				},{
					type : sw.constant,
					value : "Skeleton of Pectoral Girdle",
					key : "typeLabel",
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
		elements : [ skeletalDivisionData]
	}


singeShoulderGirdle = {
		type : sw.container,
		localData : [
		        {		        	
		        	type : sw.constant,
		        	key : "skeletalDivisionClass",
		        	value : [FMA + "24141"]
		        }, {
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
					key : "typeLabel",
				}] ,
		elements : [ singleBones ]
	}

shoulderGridleTab = {
		type : sw.tab,
		tabTitle : "Shoulder Girdle",
		elements : [pectoralGridle, singeShoulderGirdle]
	}