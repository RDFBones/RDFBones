pageData.queries = [
		{   
			parameters : [
				{ type : sw.constant, varName : "queryType", value : "boneOrgans" },
				{ type : sw.global, key : "individual", varName : "boneDivision" },
			],
			mapping : "dataLoader",
			toVariable : "boneOrgans",
		}
		]