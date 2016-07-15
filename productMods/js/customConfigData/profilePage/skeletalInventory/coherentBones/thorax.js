ribcage = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_7480",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Rib Cage",
					key : "boneLabel",
				},{
		        	type : sw.constant,
		        	key : "skeletalDivisionClass",
		        	value : FMA + "7480",
		        },{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_7480"],
					key : "classSelection"
				} ],
		elements : [ coherentData]
	}

singleThorax = {
		
		type : sw.container,
		localData : [
		        {
		        	type : sw.constant,
		        	value : "singleThoracicBones",
		        	key : "pageUri",
		        }, {
		        	type : sw.constant,
		        	value : "singleThoracicBones",
		        	key : "dataKey",
		        }, {
					type : sw.constant,
					value : "Ribs",
					key : "boneLabel",
				}] ,
		elements : [ singleBones ]
	}
thoraxTab = {
	type : sw.tab,
	tabTitle : "Thorax",
	elements : [ribcage, singleThorax]
}