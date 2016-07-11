pageData.queries = [
		{   
			parameters : [
				{ type : sw.constant, varName : "queryType", value : "boneDivisions" },
				{ type : sw.global, key : "individual", varName : "skeletalRegion" },
			],
			mapping : "dataLoader",
			toVariable : "boneOrgans",
		}
		]