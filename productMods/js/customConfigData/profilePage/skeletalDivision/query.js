
pageData.boneOrgans = {
	dataOperation : "query",
	queryType : "boneOrganOfSkeletalDivision",
	parameters : [{
		name : "skeletalDivision",
		value : "pageData.individual",
	}]
}

pageData.type = individualType


pageData.skeletalInventory = {
		
	dataOperation : "query",
	queryType : "skeletalInventory2",
	singleQuery : true,
	resultKey : "skeletalInventory",
	parameters : [{
		value : {
			type : sw.global,
			key : "individual",
		},
		name : "coherentSkeletalDivision",
	}]
}

pageData.skeletalInventoryLabel = {
		
	dataOperation : "query",
	queryType : "literal",
	type : "literal",
	singleQuery : true,
	parameters : [
			{
			value : {
				type : sw.global,
				key : "skeletalInventory",
			},
			name : "subject",
			}, {
				value : {
					type : sw.constant,
					value : "http://www.w3.org/2000/01/rdf-schema#label", 
				},
				name : "predicate",
			}
	]
}