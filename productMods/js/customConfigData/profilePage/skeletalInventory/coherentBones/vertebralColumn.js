systemicQuery = {
		type : sw.constant,
		key : "queryType",
		value : "systemicPartsWithout",
}


vertebraUri = {
		type : sw.constant,
		value : "http://purl.obolibrary.org/obo/FMA_13478",
		key : "skeletalDivision"
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
		elements : [ coherentData]
	}	

cervical = {
		type : sw.container,
		localData : [
				partlySymmetricBoneSegment, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_24138",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Cervical Vertebral Column",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_24138"],
					key : "classSelection"
				}, systemicQuery ],
		elements : [ coherentData]
	}

thoracic = {
		type : sw.container,
		localData : [
				partlySymmetricBoneSegment, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_9140",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Thoracic Vertebral Column",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_9140"],

					key : "classSelection"
				}, systemicQuery],
		elements : [ coherentData]
	}

lumbar = {
		type : sw.container,
		localData : [
				partlySymmetricBoneSegment, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_16203",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Lumbar Vertebral Column",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_16203"],
					key : "classSelection"
				}, systemicQuery],
		elements : [ coherentData]
	}

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
		elements : [vertebralColumn, cervical, thoracic, lumbar, sacrum, coccyx, singleVertebra]
	}
