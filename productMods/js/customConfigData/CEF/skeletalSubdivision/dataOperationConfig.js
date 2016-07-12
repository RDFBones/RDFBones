labelQuery = {
		
	object : "pageData.skeletalDivision.label",
	operation : {
		type : "query",
		queryType : "literal",
		singleQuery : true,
		parameters : [
  			{
  				value : "skeletalDivision.uri",
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
}

queryDef1 = {
		
	object : "pageData.skeletalDivision.boneDivisions",
	operation : {
		type : "query",
		queryType : "systemicPartsWithout",
		parameters : [
			{
				value : "skeletalDivision.uri",
				name : "classUri",
			}, 
		]
	}
}

queryDef2 = {
		object : "pageData.skeletalDivision.boneDivisions.systemicParts",
		operation : {
			type : "query",
			queryType : "systemicPartsWithout",
			parameters : [
				{
					value : "boneDivisions.uri",
					name : "classUri",
				}, 
			]
		}
	}

queryDef3 = {
		
		object : "pageData.skeletalDivision.boneDivisions.symmetricBones",
		operation : {
			type : "query",
			queryType : "subClasses",
			parameters : [
				{
					value : {
						type : sw.field,
						of : {
							type : sw.field,
							of : {
								type : sw.global,
								key : "partlySymmetricBones",
							},
							key : "boneDivisions.uri",
						},
						key : {
							type : sw.constant,
							value : "parentRegions",
						},
					},
					name : "classUri",
				},
			],
		}
}

queryDef4 = {
		
		object : "pageData.skeletalDivision.boneDivisions.existing",
		operation : {
			type : "query",
			queryType : "filteredCoherentBones",
			requirement : true,
			parameters : [
				{
					name : "boneDivisionType",
					value : "boneDivisions.uri"
				}, {
					name : "skeletalInventory",
					value : {
						type : sw.constant,
						value : "http://testIndividual",
					}
				}
			],
		}
}

queryDef5 = {
		
		object : "pageData.skeletalDivision.boneDivisions.existingToSelect",
		operation : {
			type : "query",
			queryType : "filteredCoherentBones",
			parameters : [
				{
					name : "boneDivisionType",
					value : "boneDivisions.uri"
				}, {
					name : "skeletalInventory",
					value : {
						type : sw.constant,
						value : "http://testIndividual",
					}
				}
			],
		}
}



extractionDef = {
		
	object : "pageData.skeletalDivision.boneDivisions.systemicParts",
	operation : {
		type : "extraction",
		fromBy : "uri",
		what : "boneDivisions.symmetricBones",
		whatBy : "uri",
	}
}

groupDef = {
		object : "pageData.skeletalDivision.boneDivisions.existing",
		operation : {
			type : "group",
			by : "boneDivision",
			within :["boneDivisionLabel"],
			to : "systemicParts",
			rename : [
			 {
				 key : "boneDivision",
				 to : "uri",
			 }, {
				key : "boneDivisionLabel",
				to : "label",
			 }
			]
		}
	}


groupDef = {
		object : "pageData.skeletalDivision.boneDivisions.symmetricBones",
		operation : {
			type : "group",
			by : "inputClass",
			within :["inputClassLabel"],
			to : "subClasses",
			rename : [
			 {
				 key : "inputClass",
				 to : "uri",
			 }, {
				key : "inputClassLabel",
				to : "label",
			 }
			]
		}
	}

mergeDefinition = {
		
		object : "pageData.skeletalDivision.boneDivisions.systemicParts",
		operation : {
			type : "merge",
			what : "boneDivisions.symmetricBones"
		}
	}
