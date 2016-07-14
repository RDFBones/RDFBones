
inputClass = {
    value : "this.uri",
    name : "classUri",
}

extract = {
      type : "extract",
      what :  "this.systemicClassQuery",
      fromBy : "uri",
      whatBy : "subClassUri", 
   }

merge = {
	type : "merge",    
	variables : [this.systemicParts],	
}

symmetricBonesQuery = {
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

systemicPartsQuery = {
	dataOperation : "query", 
	queryType : "systemicPartsWithout", 
	parameters : [inputClass], 
}

partlySymmetric2 = {
		   dataOperation : "query",
		   queryType : "systemicPartsWithout",
		   parameters : [inputClass], 
		   systemicParts : systemicPartsQuery,
		   symmetricClasses : symmetricBonesQuery,
		   systemicParts : extract,
		   systemicParts : merge, 
		}

partlySymmetric1 = { 
   dataOperation : "query", 
   queryType : "systemicPartsWithout", 
   parameters : [inputClass], 
   systemicParts : partlySymmetric2,  
} 
