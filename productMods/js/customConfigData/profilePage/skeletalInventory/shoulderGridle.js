pectoralGridle = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_23217",
					key : "boneUri",
				},{
					type : sw.constant,
					value : "Pectoral Girdle",
					key : "boneLabel",
				},{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_23217"],
					key : "classSelection"
				} ],
		elements : [ coherentData]
	}


shoulderGridleTab = {
		type : sw.tab,
		tabTitle : "Shoulder Girdle",
		elements : [pectoralGridle]
	}