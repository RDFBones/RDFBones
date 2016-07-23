bonypelvis = {
		type : sw.container,
		localData : [
				coherentSkeletalDivisionCEF, {
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_16580",
					key : "coherentSkeletalDivisionType",
				},{
					type : sw.constant,
					value : "Bony Pelvis",
					key : "typeLabel",
				},{
					type : sw.constant,
					value : "simpleQuery",
					key : "simpleQuery",
				}],
		elements : [coherentSkeletalDivisionData]
	}

coherentBonyPelvis = {
		
		type : sw.container,
		localData : [ coherentSkeletalSubdivisionCEF, 
		{
			type : sw.constant,
			value : "http://purl.obolibrary.org/obo/FMA_16580",
			key : "skeletalDivisionType",
		}, {
			type : sw.constant,
			value : ["http://purl.obolibrary.org/obo/FMA_16580"],
			key : "classSelection"
		}, {
			type : sw.constant,
			value : "simpleQuery",
			key : "simpleQuery",
		}, {
			type : sw.constant,
			value : "Coherent Skeletal Divisions of Bony Pelvis",
			key : "typeLabel",
		}],
		elements : [ skeletalDivisionData]
}


singleBonyPelvis = {
		type : sw.container,
		localData : [
		        {
		        	type : sw.constant,
		        	value : "singlePelvicGirdle",
		        	key : "pageUri",
		        }, {
		        	type : sw.constant,
		        	value : "singlePelvicGirdle",
		        	key : "dataKey",
		        }, {
		        	type : sw.constant,
		        	key : "skeletalDivisionClass",
		        	value : FMA + "16580",
		        },{
					type : sw.constant,
					value : "Single Bones of Bony Pelvis",
					key : "typeLabel",
				}] ,
		elements : [ singleBones ]
	}


bonyPelvisTab = {
	type : sw.tab,
	tabTitle : "Pelvic Gridle",
	elements : [bonypelvis,coherentBonyPelvis,  singleBonyPelvis]
}
