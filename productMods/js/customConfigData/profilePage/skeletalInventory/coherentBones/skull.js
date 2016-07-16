systemicQuery = {
		type : sw.constant,
		key : "queryType",
		value : "systemicPartsWithout",
}

skullUri = {
	type : sw.constant,
	value : "http://purl.obolibrary.org/obo/FMA_46565",
	key : "skeletalDivision"
}

skull = {
		type : sw.container,
		localData : [
				skeletalSubDivisionCEF, skullUri, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_53672",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Skull",
					key : "boneLabel",
				}, {
					type : sw.constant,
					value : "partlySymmetricBoneDivision",
					key : "cefPageUri",
				}, systemicQuery ],
		elements : [ coherentData]
	}	

skullDivision = {
		type : sw.container,
		localData : [
				skeletalSubDivisionCEF, skullUri, 
				{
					type : sw.constant,
					value : "Coherent Skeletal Divisions of Skull",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : "subDivision",
					key : "subDivision",
				}, {
					type : sw.constant,
					value : "partlySymmetricBoneDivision",
					key : "cefPageUri",
				}],
		elements : [ coherentData]
	}	


singleSkull = {
	
	type : sw.container,
	localData : [
	        {
	        	type : sw.constant,
	        	value : "singleSkull",
	        	key : "pageUri",
	        }, {
	        	type : sw.constant,
	        	value : "singleSkull",
	        	key : "dataKey",
	        }, {
	        	type : sw.constant,
	        	key : "skeletalDivisionClass",
	        	value : FMA + "45565",
	        },{
				type : sw.constant,
				value : "Single Bone Organs of Skull",
				key : "boneLabel",
			}, {
				type : sw.constant,
				value : "singleSkull",
				key : "cefPageUri",
			}, systemicQuery ] ,
	elements : [ singleBones ]
}


skullTab = {
	type : sw.tab,
	tabTitle : "Skull",
	elements : [skull, skullDivision, singleSkull]
}