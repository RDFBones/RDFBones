bonypelvis = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_16580",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Bony Pelvis",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_16580"],
					key : "classSelection"
				} ],
		elements : [ coherentData]
	}


bonyPelvisTab = {
	type : sw.tab,
	tabTitle : "Pelvic Gridle",
	elements : [bonypelvis]
}
