/*
var initStack = function() {

	$.each(pageData, function(key, pageDat) {
		stack.push({
			refrence : pageData,
			key : key,
		})
	})
}

$.each(pageData.variableSettings, function(i, variable) {

	dataArray = object
	var referenceArray = checkReference(variable);
})

var checkReference = function(variable) {

	of = stack[variable.of]
	var type = DataLib.getType(of.reference[of.key])

	arr.push(of.reference)
	if (stack[of.reference] != undefined) {
		// We go further
		checkReference()
	}
}

*/




var prepareLocalData = function(dataQueue, level, localData) {

	if(localData[dataQueue[level].of][dataQueue[level].key] === undefined){
		
		//Here we set the reference in the parent object
		if(dataQueue[level].type == "object"){
			localData[dataQueue[level].of][dataQueue[level].key] = new Object()
		} else { //Array
			localData[dataQueue[level].of][dataQueue[level].key] = []
		}
		
		//Here the localData object gets the referene so that we can access it
		localData[dataQueue[level].key] = localData[dataQueue[level].of][dataQueue[level].key]
		
		level++;
		PerformOperation(dataQueue, level, localData)
		
	} else {
		
		//Here we do not need to set the reference
		levelPlus = level + 1
		switch (dataQueue[level].type) {
			
			case "array":
			arr = localData[dataQueue[level].of][dataQueue[level].key]
			numOfOperation += arr.length - 1
			$.each(arr, function(i, value){
				newLocalData = $.extend({}, localData)
				newLocalData[dataQueue[level].key] = value 
				PerformOperation(dataQueue, levelPlus, newLocalData)
			})
			break;
		case "object" :
			localData[dataQueue[level].key] = localData[dataQueue[level].of][dataQueue[level].key]
			level++
			PerformOperation(dataQueue, level, localData)
			break;
		}
	}
}	




var PerformOperation = function(dataQueue, level, localData) {

	if(dataQueue.length > level){
		prepareLocalData(dataQueue, level, localData)
	} else {
		dataOperation = dataQueue[level - 1].operation
		switch(dataOperation.type){
			case "query" :
				performQuery(dataOperation, localData, dataQueue[level-1].key)
				break;
		}		
	}	
}


var performQuery = function(dataOperation, localData, key){
	
	var data = new Object()
	array = null
	$.each(dataOperation.parameters, function(i, param){
		
		data[param.parameterName] = evaluate(localData, param)
		console.log(data[param.parameterName])
		if(DataLib.getType(data[param.parameterName]) == "array"){
			array = data[param.parameterName]
			arrayParameterName = param.parameterName
			numOfOperation += array.length - 1
		}
	})
	data.queryType = dataOperation.queryType
	dataToStore = localData[key]
	
	if(array == null){
		sendQuery(data, dataToStore)
	} else {
		$.each(array, function(i, value){
			data[arrayParameterName] = value
			sendQuery(data, dataToStore)
		})
	}
}


var sendQuery = function(data, dataToStore){
	
	$.ajax({
		dataType : "json",
		url : baseUrl + "dataLoader",
		data : data,
	}).done(function(result){
		$.merge(dataToStore, result)
		checkReady()
	})
}


var current = 0
var numOfOperation = 1
var opCounter = 0


var checkReady = function(){
	
	current++ 
	if(current == numOfOperation){
		numOfOperation = 1
		opCounter++ 
		if(opCounter < testArray.length){
			prepareLocalData(testArray[opCounter], 0, localData)	
		}
	}
}

localData = {
	pageData : pageData
}


var evaluate = function(localData, dataDef){
	
	if(DataLib.getType(dataDef) != "object"){
		return dataDef
	}
	switch(dataDef.type){
	
	case "http://softwareOntology.com/local" :
		return localData[dataDef.varName][dataDef.key]
	case "http://softwareOntology.com/Field" :
		return evaluate(localData, dataDef.of)[evaluate(localData, dataDef.key)]
	case "http://softwareOntology.com/global" :
		return pageData[dataDef.key]
	case undefined : 
		return localData[dataDef.varName][dataDef.key]
	default :
		return null
	}
}

prepareLocalData(testArray[0], 0, localData)



