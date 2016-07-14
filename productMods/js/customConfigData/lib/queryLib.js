
inputClass = {
    value : "this.uri",
    name : "classUri",
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
		name : "inputClass",
		to : "uri"
	}, {
		name : "inputClassLabel",
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
