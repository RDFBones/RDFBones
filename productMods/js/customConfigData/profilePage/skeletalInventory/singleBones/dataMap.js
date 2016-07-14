


pageData.singleBones = {
		
	skull : {
		uri : "http://purl.obolibrary.org/obo/FMA_46565",
	},

	vertebra : {
		uri : "http://purl.obolibrary.org/obo/FMA_9914",
	},
	 
	upperLimb : {
		uri : "http://purl.obolibrary.org/obo/FMA_24139",
	},
	
	lowerLimb : {
		uri : "http://purl.obolibrary.org/obo/FMA_24140",
	},
	
	thoracic : {
		uri : "http://purl.obolibrary.org/obo/FMA_7480",
	},
	
	pelvicGirdle : {
		uri : "http://purl.obolibrary.org/obo/FMA_16580",
	}
}

singleBoneLoading = {
	
	object : "pageData.singleBones.keys.dataSet",
	operation : {
		dataOperation : "query",
		queryType : "singleBoneQuery",
		parameters : [{
			value : "this.uri",
			name : "classUri",
		}, {
			value : "pageData.skeletalInventory",
			name : "skeletalInventory",
		}]
	}
}


newQueryDefinition = []
newQueryDefinition.push(singleBoneLoading)