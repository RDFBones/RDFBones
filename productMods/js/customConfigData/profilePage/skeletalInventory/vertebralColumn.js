systemicQuery = {
		type : sw.constant,
		key : "queryType",
		value : "systemicPartsWithout",
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

vertebralColumnTab = {
		type : sw.tab,
		tabTitle : "Vertebral Column",
		elements : [cervical, thoracic, lumbar, sacrum, coccyx]
	}
