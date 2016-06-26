pageData.queries = [
		{   
			parameters : [
				{ type : sw.global, varName : "queryType", value : "boneOrgans" },
				{ type : sw.local, 	key : "individual", varName : "boneDivision" },
			],
			mapping : "dataLoader",
			toVariable : "systemicParts",
		}
	]