
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
		localData : [ 
		coherentSkeletalSubdivisionCEF, 
		coherentSkeletalSubdivisionCEFUri,
		{
			type : sw.constant,
			value : "http://purl.obolibrary.org/obo/FMA_13478",
			key : "skeletalDivisionType",
		}, {
			type : sw.constant,
			value : [ FMA + "24138", 
			          FMA + "9140",
			          FMA + "16203"],
			key : "classSelection"
		}, {
			type : sw.constant,
			value : "Skeletal subdivisions of Vertebral Column",
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
					value : "Single Bones of Vertebral Column",
					key : "typeLabel",
				}] ,
		elements : [ singleBones ]
	}

vertebralColumnTab = {
		type : sw.tab,
		tabTitle : "Vertebral Column",
		elements : [vertebralColumn, coherentVertebra, singleVertebra]
	}
