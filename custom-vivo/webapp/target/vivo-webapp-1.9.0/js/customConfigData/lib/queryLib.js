
/*
 * Input Parameters
 */

inputClass = {
    value : "this.uri",
    name : "classUri",
}

skeletalInventory = {
    value : "pageData.individual",
    name : "skeletalInventory",
} 

skeletalDivision = {
    value : "pageData.individual",
    name : "skeletalDivision",	
}

querySwitch = {
	type : sw.switchCase,
	on : "pageData.simpleQuery",
	cases : [{
		value : "simpleQuery",
		toReturn : "systemicPartsWithout",
	}],
	defaultCase : "systemicPartsWithoutNoBoneOrgan"	
}

uri = {
	value : "this.uri",
	name : "uri",
}

mstQuery = {
	dataOperation : "query",
	queryType : "mostSpecificType",
	type : "literal",
	singleQuery : true,
	parameters : [uri]
}


inputType = {
   value : "this.uri",
   name : "inputType",
}

subClass = {
	dataOperation : "query",
	queryType : "subClassesWithout",
	parameters : [inputClass]
}

subClass2 = {
	dataOperation : "query",
	queryType : "subClass2",
	parameters : [inputClass], 
	subClasses : subClass
}

subClass3 = {
		
	dataOperation : "query",
	queryType : "subClass3",
	subClass1 : subClass2,
	parameters : [inputClass]
}


labelQuery = {	
		
	dataOperation : "query",
	queryType : "literal",
	type : "literal",
	singleQuery : true,
	parameters : [
			{
				value : "this.uri",
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


typeQuery = {	
		
	dataOperation : "query",
	queryType : "object",
	type : "literal",
	singleQuery : true,
	parameters : [
			{
				value : "this.uri",
				name : "subject",
			}, {
				value : {
					type : sw.constant,
					value : "http://vitro.mannlib.cornell.edu/ns/vitro/0.7#mostSpecificType", 
				},
				name : "predicate",
			}
	]
}

individualType = {
	
	dataOperation : "query",
	queryType : "object",
	type : "literal",
	singleQuery : true,
	parameters : [
			{
				value : "pageData.individual",
				name : "subject",
			}, {
				value : {
					type : sw.constant,
					value : "http://vitro.mannlib.cornell.edu/ns/vitro/0.7#mostSpecificType", 
				},
				name : "predicate",
			}
	]
}



extract = {
      dataOperation : "extraction",
      what :  "this.symmetricClasses",
      fromBy : "uri",
      whatBy : "uri", 
   }

merge = {
	dataOperation : "merge",    
	what : "this.symmetricClasses",
}

group = {
	dataOperation : "group",
	by : "inputClass",
	within : ["inputClassLabel"],
	to : "subClasses",
	rename : [{
		key : "inputClass",
		to : "uri"
	}, {
		key : "inputClassLabel",
		to : "label"
	}]
}
/*
 * Systemic Part of Skeletal Region
 */

systemicPartOfSkeletalRegion = {
	
	dataOperation : "query",
	queryType : "systemicParts",	
	parameters : [skeletalDivision],
	sortBy : "type",
}

/*
 * Existing Bone Organs of skeletalInventory
 */

existingBoneOrgans = {
	dataOperation : "query",
	queryType : "existingBoneOrgan1",
	parameters : [skeletalInventory],
	sortBy : "type"
}

existingCoherentSkeletalRegions = {
		dataOperation : "query",
		queryType : "existingCoherentSkeletalRegion",
		parameters : [skeletalInventory],
		sortBy : "type"
	}

systemicParts = {
		
	dataOperation : "query",
	queryType : "systemicParts",
	parameters : [{
		value : "this.uri",
		name : "skeletalRegion",
	}]
}

systemicPartsSorted = {
		
		dataOperation : "query",
		queryType : "systemicParts",
		parameters : [{
			value : "this.uri",
			name : "skeletalRegion",
		}],
		sortBy : "type",
}


systemicPartsWithCompletenessSorted = {
		
	dataOperation : "query",
	queryType : "systemicPartsWithCompleteness",
	parameters : [{
		value : "this.uri",
		name : "skeletalRegion",
	}],
	sortBy : "type",
}

systemicPartsSorted = {
		
	dataOperation : "query",
	queryType : "systemicParts",
	parameters : [{
		value : "this.uri",
		name : "skeletalRegion",
	}],
	sortBy : "type",
}

symmetricBonesQuery = {
	dataOperation : "query",
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
					key : "this.uri",
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

systemicPartsQuery = {
		dataOperation : "query", 
		queryType : "systemicPartsWithout", 
		parameters : [inputClass], 
	}

subclassSystemic = {
		
		dataOperation : "query",
		queryType : "subClassesWithout",
		parameters : [inputClass],
		systemicParts : systemicPartsQuery,
}

systemicSubclass = {
	dataOperation : "query", 
	queryType : "systemicPartsWithout", 
	parameters : [inputClass], 
	subClasses : subClass,
}

systemicNoBoneOrganSubclass = {
	dataOperation : "query", 
	queryType : "systemicPartsWithoutNoBoneOrgan", 
	parameters : [inputClass], 
	subClasses : subClass,
}

partlySymmetric2 = {
	   dataOperation : "query",
	   queryType : "systemicPartsWithout",
	   parameters : [inputClass], 		 
	}


partlySymmetricLoad = { 
	   dataOperation : "query", 
	   queryType : querySwitch,
	   parameters : [inputClass], 
	   systemicParts : partlySymmetric2,  
	   symmetricClasses : symmetricBonesQuery,
	   systemicParts$1 : extract,
	   symmetricClasses$1 : group,
	   systemicParts$2 : merge,
	   existingToAdd : {
		   dataOpertion : "query",
		   queryType : "filteredCoherentBones",
		   parameters : [{
			   value : "pageData.individual",
			   name : "skeletalInventory",
		   }, {
			   value : "this.uri",
			   name : "coherentSkeletalDivision",
		   }]

	   }
}


systemicParts2 = {
		
	dataOperation : "query",
	queryType : "systemicParts",
	parameters : [{
		value : "this.uri",
		name : "skeletalRegion",
	}],
	systemicParts : systemicPartsWithCompletenessSorted,
}

consitutionalSubClass = {
	
	dataOperation : "query",
	queryType : "constitutionalParts",
	parameters : [inputClass], 
	subClasses : subClass
}