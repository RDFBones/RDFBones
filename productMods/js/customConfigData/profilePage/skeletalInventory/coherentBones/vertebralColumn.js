systemicQuery = {
		type : sw.constant,
		key : "queryType",
		value : "systemicPartsWithout",
}


vertebraUri = {
		type : sw.constant,
		value : "http://purl.obolibrary.org/obo/FMA_13478",
		key : "skeletalRegion"
	}

vertebralColumn = {
		type : sw.container,
		localData : [
				skeletalSubDivisionCEF, vertebraUri, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_13478",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Vertebral Column",
					key : "boneLabel",
				}, {
					type : sw.constant,
					value : "partlySymmetricBoneDivision",
					key : "cefPageUri",
				}, systemicQuery ],
		elements : [ skeletalDivisionData]
	}	


coherentVertebra = {
		
		type : sw.container,
		localData : [ partlySymmetricCoherentCEF, vertebraUri, 
		{
			type : sw.constant,
			value : [ FMA + "24138", 
			          FMA + "9140",
			          FMA + "16203"],
			key : "classSelection"
		}, {
			type : sw.constant,
			value : "Coherent Skeletal Divisions of Vertebral Column",
			key : "boneLabel",
		}],
		elements : [ coherentData]
}



singleVertebra = {
		type : sw.container,
		localData : [
		        {
		        	type : sw.constant,
		        	value : "singleVertebra",
		        	key : "pageUri",
		        }, {
		        	type : sw.constant,
		        	value : "singleVertebra",
		        	key : "dataKey",
		        }, {
		        	type : sw.constant,
		        	key : "skeletalDivisionClass",
		        	value : FMA + "9914",
		        },{
					type : sw.constant,
					value : "Single Bone Organs of Vertebra",
					key : "boneLabel",
				}] ,
		elements : [ singleBones ]
	}

vertebralColumnTab = {
		type : sw.tab,
		tabTitle : "Vertebral Column",
		elements : [vertebralColumn, coherentVertebra, singleVertebra]
	}


/*
regionalQuery = {
		type : sw.constant,
		key : "queryType",
		value : "regionalPartsWithout",
}

sacrum = {
		type : sw.container,
		localData : [
		        partlySymmetricBoneSegment, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_16202",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Sacrum",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_16202"],
					key : "classSelection"
				}, regionalQuery],
		elements : [ coherentData]
	}
	
coccyx = {
		type : sw.container,
		localData : [
		      	partlySymmetricBoneSegment ,
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_20229",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Coccyx",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_20229"],
					key : "classSelection"
				}, 
				regionalQuery
				],
		elements : [ coherentData]
	}
*/
