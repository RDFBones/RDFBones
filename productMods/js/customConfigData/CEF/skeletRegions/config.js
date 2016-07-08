pageData.partlySymmetricBones = {

	//Neurocranium
	"http://purl.obolibrary.org/obo/FMA_53672" : {

		parentRegions : [ "http://purl.obolibrary.org/obo/FMA_9613" ]
	},

	//Viscerocranium
	"http://purl.obolibrary.org/obo/FMA_53673" : {

		parentRegions : [ "http://purl.obolibrary.org/obo/FMA_9711",
		  		"http://purl.obolibrary.org/obo/FMA_54736",
				"http://purl.obolibrary.org/obo/FMA_52737",
				"http://purl.obolibrary.org/obo/FMA_52741",
				"http://purl.obolibrary.org/obo/FMA_52745",
				"http://purl.obolibrary.org/obo/FMA_52746",
				"http://purl.obolibrary.org/obo/FMA_52747"]
	},

	//Cervical Vertebral Column
	"http://purl.obolibrary.org/obo/FMA_24138" : {

		parentRegions : [ "http://purl.obolibrary.org/obo/FMA_9915" ]
	},
	

	//Thoracic Vertebral Column
	"http://purl.obolibrary.org/obo/FMA_9140" : {

		parentRegions : [ "http://purl.obolibrary.org/obo/FMA_9139" ]
	},

	//Lumbar Vertebral Column
	"http://purl.obolibrary.org/obo/FMA_16203" : {

		parentRegions : [ "http://purl.obolibrary.org/obo/FMA_9921" ]
	},
	
	//Sacrum
	"http://purl.obolibrary.org/obo/FMA_16202" : {

		parentRegions : [ "http://purl.obolibrary.org/obo/FMA_12526" ]
	},
	
	//Coccygeal Vertebra
	"http://purl.obolibrary.org/obo/FMA_20229" : {
		parentRegions : [ "http://purl.obolibrary.org/obo/FMA_12527" ]
	},
}




pageData.skeletalDivision = {
		
	uri : "http://purl.obolibrary.org/obo/FMA_46565",
	label : "Skull",
}

queryDef1 = {
		
	object : "pageData.skeletalDivision",
	operation : {
		type : "query",
		variable : "boneDivisions",
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
		
		object : "pageData.skeletalDivision.boneDivisions",
		operation : {
			type : "query",
			variable : "systemicParts",
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
		
		object : "pageData.skeletalDivision.boneDivisions",
		operation : {
			type : "query",
			variable : "symmetricClasses",
			queryType : "subClassesWithout",
			parameters : [
				{
					type : sw.field,
					of : {
						type : sw.field,
						of : {
							type : sw.global,
							key : "partlySymmetricBones",
						},
						key : {
							value : "boneDivisions.uri",
						},
					},
					key : "parentRegions",
					name : "classUri",
				},
			],
		}
}


extractionDef = {
		
	object : "pageData.skeletalDivisions.boneDivisions",
	operation : {
		type : "extraction",
		from : "systemicParts",
		fromBy : "uri",
		what : "symmetricBones",
		whatBy : "uri",
	}
}
//From the above defined dataSet, we have to generate the following array 
//for the operation

var generateArray = function(def){
	
	var varArr =  def.object.split(".")
	var array = []
	$.each(varArr, function(index, arr){

		var a = new Object()
		a.of = arr
		a.key = varArr[index + 1]
		if(index  ==  varArr.length - 1){
			switch(def.operation.type){
			
			case "extraction" :
				if(def.operation.toNewVariable != undefined){
					a.key = def.operation.toNewVariable
				} else {
					a.key = def.operation.from	
				}
			break
			case "query" :
				a.key = def.operation.variable	
				if(def.operation.singleData != undefined){
					a.type = "object"
				} else {
					a.type = "array"
				}
				break
			}
		}
		a.operation = def.operation
		array.push(a)
	})
	return array
}
