pageData.queries = [
		{   
			parameters : [
				{ type : sw.constant, varName : "queryType", value : "coherentBones" },
				{ type : sw.global, varName : "skeletalInventory", key : "individual" },
			],
			mapping : "dataLoader",
			toVariable : "coherentBones",
		}
	]