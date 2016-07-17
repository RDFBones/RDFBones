pageData.queries = [
		{   
			parameters : [
				{ type : sw.constant, varName : "queryType", value : "CoherentSkeletalRegionOfSkeletalDivision" },
				{ type : sw.global, key : "individual", varName : "skeletalDivision" },
				{ type : sw.global, key : "skeletalInventory"},
			],
			mapping : "dataLoader",
			toVariable : "boneOrgans",
		}
		]