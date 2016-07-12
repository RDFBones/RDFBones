pageData.queries = [
		{   
			parameters : [
				{ type : sw.constant, varName : "queryType", value : "coherentBonesOfSubdivision" },
				{ type : sw.global, key : "individual", varName : "skeletalSubdivision" },
				{ type : sw.global, key : "skeletalInventory"},
			],
			mapping : "dataLoader",
			toVariable : "boneOrgans",
		}
		]