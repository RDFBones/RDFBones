pageData.dataOperations = [
                          	
     {
		type : "grouping",
		processes : [
			{  	
				inputVariable : "boneDivisions1", by : "inputClass", within : ["inputClassLabel"], to : "systemicParts",
				rename : [ { key : "inputClass" , to : "uri"}, { key : "inputClassLabel" , to : "label"}]
			}, {  	
				inputVariable : "systemicParts", by : "boneDivision", within : ["boneDivisionLabel"], to : "subClasses",
				rename : [ { key : "boneDivision" , to : "uri"}, { key : "boneDivisionLabel", to : "label"} ]
			}, {  	
				inputVariable : "subClasses", by : "subClass", within : ["subClassLabel"],
				rename : [ { key : "subClass" , to : "uri"}, { key : "subClassLabel", to : "label"} ]
			}
		]
	},{ 
		type : "grouping",
		processes : [
			{  	
				inputVariable : "boneDivisions2", by : "boneDivision", within : ["boneDivisionLabel"], to : "systemicParts",
				rename : [ { key : "boneDivision" , to : "uri"},{ key : "boneDivisionLabel", to : "label"}  ]
			}, {  	
				inputVariable : "systemicParts", by : "systemicPart", within : ["systemicPartLabel"], to : "unused",
				rename : [ { key : "systemicPart" , to : "uri"},{ key : "systemicPartLabel", to : "label"}  ]
			}
		]
	}, 	 {
		type : "mergeArrays", arrays : ["boneDivisions1", "boneDivisions2"],
		output : "boneDivisions"
  		}
  	]


