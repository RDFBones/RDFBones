pageData.queries = [
		{   
			parameters : [
				{ type : sw.constant, varName : "queryType", value : "skeletalDivisionOfCoherentSkeletalDivision" },
				{ type : sw.global, key : "individual", varName : "coherentSkeletalDivision" },
				{ type : sw.global, key : "skeletalInventory"},
			],
			mapping : "dataLoader",
			toVariable : "skeletalDivisions",
		}
		] 

pageData.skeletalInventory = {
	dataOperation : "query",
	queryType : "skeletalInventory1",
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


pageData.type = individualType

pageData.pageElements = [{
	
	type : sw.DataTable,
	dataToDislay : {
		type : sw.global,
		key : "people"
	},
	dataFields : [
	 {
		 type : sw.literalField,
		 key : "label",
	 }, {
		 type : sw.editButton,
		 parameters : [
		   {
			  type : sw.constant,
			  value : "pageUri",
			  varName : "personProfilePage"
		   }, {
			   type : sw.local,
			   key : "person",
			   varName : "uri",
		   } 
		 ]
	 }
	]
}]