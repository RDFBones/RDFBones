bonypelvis = {
		type : sw.container,
		localData : [
				skeletalSubDivisionCEF, {
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_16580",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Bony Pelvis",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : ["http://purl.obolibrary.org/obo/FMA_16580"],
					key : "classSelection"
				},{
					type : sw.constant,
					value : "simpleQuery",
					key : "simpleQuery",
				},{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_16580",
					key : "skeletalDivision",
				}, {
					type : sw.constant,
					value : "partlySymmetricBoneDivision",
					key : "cefPageUri",
				}],
		elements : [coherentData]
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
					key : "boneLabel",
				}] ,
		elements : [ singleBones ]
	}


bonyPelvisTab = {
	type : sw.tab,
	tabTitle : "Pelvic Gridle",
	elements : [bonypelvis, singleBonyPelvis]
}
