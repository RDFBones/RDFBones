ribcage = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_7480",
					key : "skeletalRegion",
				},{
					type : sw.constant,
					value : "Rib Cage",
					key : "typeLabel",
				},{
		        	type : sw.constant,
		        	key : "skeletalDivisionClass",
		        	value : FMA + "7480",
		        },{
					type : sw.constant,
					value : [ "http://purl.obolibrary.org/obo/FMA_7480"],
					key : "classSelection"
				} ],
		elements : [ coherentSkeletalDivisionData]
	}

coherentRibCage = {
		type : sw.container,
		localData : [
				partlySymmetricCoherentCEF,
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_7480",
					key : "skeletalRegion"
				}, {
					type : sw.constant,
					value : "Coherent Skeletal Divisions of Rib Cage",
					key : "typeLabel",
				},{
					type : sw.constant,
					value : "subDivision",
					key : "subDivision",
				},{
					type : sw.constant,
					value : "simpleQuery",
					key : "simpleQuery",
				},{
					type : sw.constant,
					value : [FMA + "20229", FMA+ "16202"],
					key : "classSelection"
				},{
					type : sw.constant,
					value : "partlySymmetricBoneDivision",
					key : "cefPageUri",
				}],
		elements : [ skeletalDivisionData]
	}	

singleThorax = {
		
		type : sw.container,
		localData : [
		        {
		        	type : sw.constant,
		        	value : "singleThoracicBones",
		        	key : "pageUri",
		        }, {
		        	type : sw.constant,
		        	value : "singleThoracicBones",
		        	key : "dataKey",
		        }, {
					type : sw.constant,
					value : "Single Bones of Rib Cage",
					key : "typeLabel",
				}] ,
		elements : [ singleBones ]
	}


thoraxTab = {
	type : sw.tab,
	tabTitle : "Thorax",
	elements : [ribcage, coherentRibCage, singleThorax]
}