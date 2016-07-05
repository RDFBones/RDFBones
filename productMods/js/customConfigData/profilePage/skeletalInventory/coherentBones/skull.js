systemicQuery = {
		type : sw.constant,
		key : "queryType",
		value : "systemicPartsWithout",
}

neurocranium = {
		type : sw.container,
		localData : [
				partlySymmetricBoneSegment, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_53672",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Neurocranium",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_53672"],
					key : "classSelection"
				}, {
					type : sw.constant,
					value : "partlySymmetricBoneDivision",
					key : "cefPageUri",
				}, systemicQuery ],
		elements : [ coherentData]
	}	

viscerocranium = {
		type : sw.container,
		localData : [
		        partlySymmetricBoneSegment, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_53673",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Viscerocranium",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_53673"],
					key : "classSelection"
				}, {
					type : sw.constant,
					value : "partlySymmetricBoneDivision",
					key : "cefPageUri",
				}, systemicQuery ] ,
		elements : [ coherentData]
	}


skullTab = {
	type : sw.tab,
	tabTitle : "Skull",
	elements : [neurocranium, viscerocranium]
}