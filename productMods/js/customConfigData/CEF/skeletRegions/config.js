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

var systemicPartsQuery1 = {
		
		type : "query",
		queryType : "systemicPartsWithout",
		parameters : [
			{
				key : "uri",
				varName : "skeletalDivision",
				parameterName : "classUri",
			}, 
		],
	}

var systemicPartsQuery2 = {
		
		type : "query",
		queryType : "systemicPartsWithout",
		parameters : [
			{
				key : "uri",
				varName : "boneDivisions",
				parameterName : "classUri",
			}, 
		],
	}


var symmetricClassQuery = {
		
		type : "query",
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
						type : sw.local,
						varName : "boneDivisions",
						key : "uri",
					},
				},
				key : "parentRegions",
				parameterName : "classUri",
			}
		],
		mergeResults : true,	
	}

pageData.variableSetting = [
     {
    	type : sw.setField,
    	of : "skeletalDivison",
    	key : "boneDivisions",
    	operation : systemicPartsQuery1,
    }, {
    	type : sw.setField,
    	of : "boneDivisions",
    	key : "systemicParts",
    	operation : systemicPartsQuery2,	
    }
]



// I already have the array in the pageData.skeletalDivision.systemicParts
testArray = [
    [{
    	key : "skeletalDivision",
      	of : "pageData",
    	type : "object",
    }, {
    	of : "skeletalDivision",
    	key : "boneDivisions",
    	type : "array",
    	operation : systemicPartsQuery1,
    }], [
      {
      	key : "skeletalDivision",
      	of : "pageData",
      	type : "object",
      }, {
    	key : "boneDivisions",
    	of : "skeletalDivision",
    	type : "array",
      },{
    	key : "systemicParts",
    	of : "boneDivisions",
    	type : "array",
    	operation : systemicPartsQuery2,
      }], [
          {
          	key : "skeletalDivision",
          	of : "pageData",
          	type : "object",
          }, {
        	key : "boneDivisions",
        	of : "skeletalDivision",
        	type : "array",
          },{
        	key : "symmetricClasses",
        	of : "boneDivisions",
        	type : "array",
        	operation : symmetricClassQuery,
          }
      ]
]



stack = {
    
	skeletalDivison : {
		reference : pageData,
		key : "skeletalDivision", 
	},
	
	//This field was created after the finish of the second
    boneDivisions : {
    	reference : "skeletalDivision",
    	key : "boneDivisions",
    },
	
    systemicParts : {
    	reference : "boneDivisions",
    	key : "systemicParts",
    },    
}

/*
pageData.queries = [


//Get the systemic parts of the inputfield                
{
	
	queryType : "systemicPartClass",
	parameters : [ {
		type : sw.global,
		key : "existingSkeletalRegion",
		varName : "skeletalRegion"
	}],
	mapping : "dataLoader",
	toVariable : "systemicParts",
}]

var subClassesQuery = {
		
		type : sw.arrayFromQuery,
		queryUri : "subClasses",
		parameters : [
			{
				type : sw.field,
				of : {
					type : sw.global,
					key : "boneDivisions",
				},
				key : {
					type : sw.field,
					of : {
						type : sw.local,
						key : "boneDivision",
					},
					key : "uri",
				},
				varName : "classUri",
			}, 
		],
	}
*/

