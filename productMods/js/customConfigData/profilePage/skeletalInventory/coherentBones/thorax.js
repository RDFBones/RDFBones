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
					value : [ "http://purl.obolibrary.org/obo/FMA_7480"],
					key : "classSelection"
				} ],
		elements : [ coherentData]
	}


thoraxTab = {
	type : sw.tab,
	tabTitle : "Thorax",
	elements : [ribcage]
}