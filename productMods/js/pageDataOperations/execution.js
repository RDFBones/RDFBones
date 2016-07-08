
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
		//switch (dataQueue[level].type) {
		switch(DataLib.getType(localData[dataQueue[level].of][dataQueue[level].key])){
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
			case "extraction" :
				extract(dataOperation, localData, dataQueue[level-1].key)
				break;
			case "group" :
				group(dataOperation, localData, dataQueue[level-1].key)
				break;			
		}
	}	
}


var performQuery = function(dataOperation, localData, key){
	
	var data = new Object()
	array = null
	$.each(dataOperation.parameters, function(i, param){
		
		data[param.name] = evaluate(localData, param.value)
		if(DataLib.getType(data[param.name]) == "array"){
			array = data[param.name]
			arrayParameterName = param.name
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

var extract = function(dataOperation, localData, key){
	
	
	if(dataOperation.toNewVariable != undefined){
		from = $.extend({}, evaluate(localData, dataOperation.from))
	} else {
		from = evaluate(localData, dataOperation.from)
	}
	
	//array of object
	what = evaluate(localData, dataOperation.what)
	
	if(what === undefined){
		return true
	}
	/* 
	if(DataLib.getType(what[0]) == "object"){
		arrayToExtract = what
	} else { 
		//array of array
		//we have to concatenate the arrays
		$.each(what, function(i, element){
			arrayToExtract = arrayToExtract.concat(element)
		})
	} */ 
	$.each(what, function(k, toExtract){
		DataLib.removeObjectFromArrayByKey(from, dataOperation.fromBy, toExtract[dataOperation.whatBy])
	})
	if(dataOperation.toNewVariable != undefined){
		dataToStore = localData[key]
	}
	checkReady()
}

var group = function(process, localData) {

	var arr = []
	var obj = new Object()

	inputArray = evaluate(localData, process.input)
	
	var varsToGroup = []
	$.each(inputArray[0], function(key, value) {
		if (key != process.by && process.within.indexOf(key) == -1) {
			varsToGroup.push(key)
		}
	})
	
	var obj = new Object()
	$.each(inputArray, function(i, data) {

		if (obj[data[process.by]] === undefined) {

			obj[data[process.by]] = new Object()
			// Place the vars in the within arrays
			$.each(process.within, function(j, _within) {
				obj[data[process.by]][_within] = data[_within]
			})
			obj[data[process.by]][process.to] = []
		}

		// Iterate through the fields of it
		var a = new Object()
		$.each(varsToGroup, function(u, key) {
			a[key] = data[key]
		})

		obj[data[process.by]][process.to].push(a)
	})
	
	inputArray.length = 0
	$.each(obj, function(key, value) {
		value[process.by] = key

		if(process.rename != undefined){
			// Rename the fields according to the process defintion
			$.each(value, function(dataKey, dataValue) {
				$.each(process.rename, function(r, rename) {
					if (rename.key == dataKey) {
						delete value[dataKey]
						value[rename.to] = dataValue
					}
				})
			})
		}
		inputArray.push(value)
	})	
}


var current = 0
var numOfOperation = 1
var opCounter = 0


var checkReady = function(){
	
	current++ 
	if(current == numOfOperation){
		current = 0
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
		var arr = dataDef.split(".")
		switch(arr.length){
			case 1 : return localData[arr[0]]
			case 2 : return  localData[arr[0]][arr[1]]
		}
		
	} else { 
		switch(dataDef.type){
		
		case "http://softwareOntology.com/local" :
			return localData[dataDef.varName][dataDef.key]
		case "http://softwareOntology.com/Field" :
			return evaluate(localData, dataDef.of)[evaluate(localData, dataDef.key)]
		case "http://softwareOntology.com/global" :
			return pageData[dataDef.key]
		case "http://softwareOntology.com/Constant": 
			return dataDef.value
		case undefined : 
			return localData[dataDef.varName][dataDef.key]
		default :
			return null
		}
	}
}


var testArray = []
testArray[0] = generateArray(queryDef1)
testArray[1] = generateArray(queryDef2)
testArray[2] = generateArray(queryDef3)
testArray[3] = generateArray(extractionDef)
testArray[4] = generateArray(groupDef)

prepareLocalData(testArray[0], 0, localData)

