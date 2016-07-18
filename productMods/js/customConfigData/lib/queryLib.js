
/*
 * Input Parameters
 */


querySwitch = {
	type : sw.switchCase,
	on : "pageData.simpleQuery",
	cases : [{
		value : "simpleQuery",
		toReturn : "systemicPartsWithout",
	}],
	defaultCase : "systemicPartsWithoutNoBoneOrgan"	
}


inputClass = {
    value : "this.uri",
    name : "classUri",
}

skeletalInventory = {
    value : "pageData.individual",
    name : "skeletalInventory",
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

partlySymmetric1 = { 
   dataOperation : "query", 
   queryType : "systemicPartsWithout", 
   parameters : [inputClass], 
   systemicParts : partlySymmetric2,  
   symmetricClasses : symmetricBonesQuery,
   systemicParts$1 : extract,
   symmetricClasses$1 : group,
   systemicParts$2 : merge,
} 


partlySymmetricNoBoneOrgan = { 
		   dataOperation : "query", 
		   queryType : querySwitch,
		   parameters : [inputClass], 
		   systemicParts : partlySymmetric2,  
		   symmetricClasses : symmetricBonesQuery,
		   systemicParts$1 : extract,
		   symmetricClasses$1 : group,
		   systemicParts$2 : merge,
		} 



consitutionalSubClass = {
	
	dataOperation : "query",
	queryType : "constitutionalParts",
	parameters : [inputClass], 
	subClasses : subClass
}