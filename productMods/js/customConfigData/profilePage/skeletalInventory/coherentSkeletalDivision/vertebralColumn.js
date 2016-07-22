
vertebralColumn = {
		type : sw.container,
		localData : [
				coherentSkeletalDivisionCEF, 
				{
					type : sw.constant,
					value : "http://purl.obolibrary.org/obo/FMA_13478",
					key : "coherentSkeletalDivisionType",
				},{
					type : sw.constant,
					value : "Vertebral Column",
					key : "typeLabel",
				} ],
		elements : [ coherentSkeletalDivisionData]
	}	

coherentVertebra = {
		
		type : sw.container,
		localData : [ partlySymmetricCoherentCEF, 
		{
			type : sw.constant,
			value : "http://purl.obolibrary.org/obo/FMA_13478",
			key : "skeletalRegionType"
		}, {
			type : sw.constant,
			value : [ FMA + "24138", 
			          FMA + "9140",
			          FMA + "16203"],
			key : "classSelection"
		}, {
			type : sw.constant,
			value : "Coherent Skeletal Divisions of Vertebral Column",
			key : "typeLabel",
		}],
		elements : [ skeletalDivisionData]
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
					key : "typeLabel",
				}] ,
		elements : [ singleBones ]
	}

vertebralColumnTab = {
		type : sw.tab,
		tabTitle : "Vertebral Column",
		elements : [vertebralColumn, coherentVertebra, singleVertebra]
	}
