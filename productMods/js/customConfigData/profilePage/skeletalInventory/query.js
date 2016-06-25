pageData.queries = [
		{   
			parameters : [
				{ type : "local", name : "queryType", value : "coherentBones" },
				{ type : "global", varName : "individual", name : "skeletalInventory" },
			],
			mapping : "dataLoader",
			toVariable : "coherentBones",
		}
	]