
skull = {
		type : sw.container,
		localData : [
				coherentSkeletalDivisionCEF, {
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_46565",
					key : "coherentSkeletalDivisionType"
				},{
					type : sw.constant,
					value : "Skull",
					key : "typeLabel",
				}],
		elements : [ coherentSkeletalDivisionData]
	}	

skullDivision = {
		type : sw.container,
		localData : [
		        coherentSkeletalSubdivisionCEF,  
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_46565",
					key : "skeletalDivisionType"
				}, {
					type : sw.constant,
					value : "Coherent Skeletal Divisions of Skull",
					key : "typeLabel",
				},{
					type : sw.constant,
					value : "subDivision",
					key : "subDivision",
				},{
					type : sw.constant,
					value : [FMA + "53672", FMA+ "53673"],
					key : "classSelection"
				},{
					type : sw.constant,
					value : "partlySymmetricBoneDivision",
					key : "cefPageUri",
				}],
		elements : [ skeletalDivisionData]
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
				key : "typeLabel",
			}, {
				type : sw.constant,
				value : "singleSkull",
				key : "cefPageUri",
			}] ,
	elements : [ singleBones ]
}

skullTab = {
	type : sw.tab,
	tabTitle : "Skull",
	elements : [skull, skullDivision, singleSkull]
}