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

//From the above defined dataSet, we have to generate the following array 
//for the operation

var generateArray = function(def){
	
	var varArr =  def.object.split(".")
	var array = []
	$.each(varArr, function(index, variable){
		var a = new Object()
		a.of = variable
		a.key = varArr[index + 1]
		if(index  ==  varArr.length - 2){
			//The last object in the row
			a.operation = def.operation
			a.type = "array"
			array.push(a)
			return false
		} 
		array.push(a)
	})
	return array
}
