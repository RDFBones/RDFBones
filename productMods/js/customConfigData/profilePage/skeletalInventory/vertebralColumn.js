cervical = {
		type : sw.container,
		localData : [
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
				} ],
		elements : [ coherentData]
	}

thoracic = {
		type : sw.container,
		localData : [
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
				} ],
		elements : [ coherentData]
	}

lumbar = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_716203",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Lumbar Vertebral Column",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_716203"],
					key : "classSelection"
				} ],
		elements : [ coherentData]
	}

sacrum = {
		type : sw.container,
		localData : [
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
				} ],
		elements : [ coherentData]
	}

coccyx = {
		type : sw.container,
		localData : [
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
				} ],
		elements : [ coherentData]
	}

vertebralColumnTab = {
		type : sw.tab,
		tabTitle : "Vertebral Column",
		elements : [cervical, thoracic, lumbar, sacrum, coccyx]
	}
