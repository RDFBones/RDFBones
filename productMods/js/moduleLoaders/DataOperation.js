
var DataOperation = function(){
	
	this.perform()
}

DataOperation.prototype = {
		
	perform : function(){
		
		$.each(pageData.dataOperations, function(index, operation){
			
			switch(operation.type){
			
			case "grouping" : 
				group(operation.processes, 0, pageData)
				break;
			case "mergeArrays" :
				mergeArrays(operation)
				break;
			}
		})
		
		if(pageData.pageUri != undefined){
			new PageElementLoader(pageData.pageUri)
		} else {
			PageAssembler.loadPage()
		}
	}	
}

var mergeArrays = function(operation){

	pageData[operation.output] = pageData[operation.arrays[0]].concat(pageData[operation.arrays[1]])
}

var group = function(processArray, i,  inputObject){
	
		var arr = []
		var obj = new Object()
		var process = processArray[i]

		/*
		 * Cache the vars that comes to the to field as object
		 */
		
		var varsToGroup = []
		$.each(inputObject[process.inputVariable][0], function(key, value){
			if(key != process.by && process.within.indexOf(key) == -1){
				varsToGroup.push(key)
			}	
		})

		var obj = new Object()
		
		/*
		 * Make an object from the array with uniqe keys
		 */
		
		$.each(inputObject[process.inputVariable], function(i, data){
			
			if(obj[data[process.by]] === undefined){
				
				obj[data[process.by]] = new Object()
				//Place the vars in the within arrays
				$.each(process.within, function(j, _within){
					obj[data[process.by]][_within] = data[_within]
				})
				obj[data[process.by]][process.to] = []
			}
			
			
			//Iterate through the fields of it
			var a = new Object()
			$.each(varsToGroup, function(u, key){
				a[key] = data[key]
			})
			
			obj[data[process.by]][process.to].push(a)
		})
		
		/*
		 * Back object to array
		 */
		inputObject[process.inputVariable] = []
		$.each(obj, function(key, value){
			value[process.by] = key
			
			//Rename the fields according to the process defintion
			$.each(value, function(dataKey, dataValue){
				$.each(process.rename, function(r, rename){
					if(rename.key == dataKey){
						delete value[dataKey]
						value[rename.to] = dataValue
					}
				})
			})
			
			inputObject[process.inputVariable].push(value)
		})
		
		
		
		
		if(processArray.length > i + 1){
			i++
			$.each(inputObject[process.inputVariable], function(index, object){
				group(processArray, i, object)
			})
		}
}	
	

var testData = new Object()
testData["systemicParts"] =  [
        { inputClass : "1", inputLabel : "label", boneDivision : "b1", label : "b1l", subClass : "C1", subLabel : "subLabel"},
        { inputClass : "1", inputLabel : "label", boneDivision : "b1", label : "b1l", subClass : "C2", subLabel : "subLabel"},
        { inputClass : "1", inputLabel : "label", boneDivision : "b2", label : "b2l", subClass : "C3", subLabel : "subLabel"},
        { inputClass : "1", inputLabel : "label", boneDivision : "b2", label : "b2l", subClass : "C4", subLabel : "subLabel"},
        { inputClass : "1", inputLabel : "label", boneDivision : "b3", label : "b3l", subClass : "C5", subLabel : "subLabel"},
        { inputClass : "1", inputLabel : "label", boneDivision : "b3", label : "b3l", subClass : "C6", subLabel : "subLabel"},
        { inputClass : "1", inputLabel : "label", boneDivision : "b4", label : "b4l", subClass : "C7", subLabel : "subLabel"},
        { inputClass : "1", inputLabel : "label", boneDivision : "b4", label : "b4l", subClass : "C8", subLabel : "subLabel"} 
    ]

testData["test"] =  [
        {  boneDivision : "1", label : "l1", subClass : "1", subLabel : "s1"},
        {  boneDivision : "1", label : "l1", subClass : "2", subLabel : "s1"},
        {  boneDivision : "2", label : "l1", subClass : "1", subLabel : "s1"},
        {  boneDivision : "2", label : "l1", subClass : "2", subLabel : "s1"},        
 ]

var testOperation = {
			
	processes : [
	   { 
		   inputVariable : "test", by : "boneDivision", within : ["label"], to : "systemicParts",
		   rename : [ { key : "inputClass" , to : "uri"}, { key : "inputLabel" , to : "label"}] 
	   }
	]
}
