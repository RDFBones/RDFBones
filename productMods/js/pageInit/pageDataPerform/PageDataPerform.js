


var PageDataPerform = function(pageInit){
	
	this.current = 0
	this.numOfOperation = 1
	this.opCounter = 0
    this.pageInit = pageInit
    
    this.prepare()
    this.perform()
}

PageDataPerform.prototype = {
		
	prepare : function(){
		
		this.operationArray = 
			new CheckDataOperation("pageData", pageData).dataOperations
	    
		console.log(this.operationArray)
		if(typeof newQueryDefinition != "undefined"){
			console.log(typeof newQueryDefinition)
			$.merge(this.operationArray, newQueryDefinition)
		}
		this.array = []
		$.each(this.operationArray, (function(i, element){
			this.array.push(this.generateArray(element))
		}).bind(this))
		//this.numOfOperation = this.array.length
	},
		
	perform	: function(){
		
		var localData = {
				pageData : pageData,
		}
		if(this.array.length > 0){
			console.log(this.array[0])
			this.prepareLocalData(this.array[0], 0, localData)	
		} else {
			this.pageInit.done()
		}
	},
   
	generateArray : function(def){
		
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
	},

	prepareLocalData : function(dataQueue, level, localData) {

		if(dataQueue[level].operation != undefined){
			
			//if(localData[dataQueue[level].of][dataQueue[level].key] === undefined){
				if(dataQueue[level].type == "object"){
					localData[dataQueue[level].of][dataQueue[level].key] = new Object()
				} else { //Array
					localData[dataQueue[level].of][dataQueue[level].key] = []
				}
			//} 
			
			localData[dataQueue[level].key] = localData[dataQueue[level].of][dataQueue[level].key]			
			this.performOperation(dataQueue, level, localData)
		} else {
			levelPlus = level + 1
			switch(DataLib.getType(localData[dataQueue[level].of][dataQueue[level].key])){
				case "array":
				arr = localData[dataQueue[level].of][dataQueue[level].key]
				this.numOfOperation += arr.length - 1
				$.each(arr, (function(i, value){
					newLocalData = $.extend({}, localData)
					newLocalData[dataQueue[level].key] = value 
					this.prepareLocalData(dataQueue, levelPlus, newLocalData)
				}).bind(this))
				break;
			case "object" :
				
				localData[dataQueue[level].key] = localData[dataQueue[level].of][dataQueue[level].key]
				console.log(dataQueue[level + 1].key)
				if(dataQueue[level + 1].key == "keys" ){
					var levelPlus = level + 1
					$.each(localData[dataQueue[level].key], (function(key, value){
						dataQueue[levelPlus].key = key 
						dataQueue[levelPlus + 1].of = key
						newLocalData = $.extend({}, localData)
						newLocalData[dataQueue[levelPlus].key] = value 
						var levelP = levelPlus
						this.prepareLocalData(dataQueue, levelP, localData) 
					}).bind(this))
				} else {
					level++
					this.prepareLocalData(dataQueue, level, localData)
				}
				break;			
			}
		}
	},

	performOperation : function(dataQueue, level, localData) {

		dataOperation = dataQueue[level].operation
		//We create a reference
		localData.dataToStore = localData[dataQueue[level].key]
		localData["this"] = localData[dataQueue[level - 1].key]
		switch(dataOperation.dataOperation){
			case "query" :
				this.performQuery(dataOperation, localData)
				break;
			case "extraction" :
				this.extract(dataOperation, localData)
				break;
			case "group" :
				this.group(dataOperation, localData)
				break;			
			case "merge" :
				this.merge(dataOperation, localData)
				break;
		}	
	}, 

	 performQuery : function(dataOperation, localData){
		
		var data = new Object()
		array = null
		$.each(dataOperation.parameters, (function(i, param){
			data[param.name] = this.evaluate(localData, param.value)
			if(DataLib.getType(data[param.name]) == "array"){
				array = data[param.name]
				arrayParameterName = param.name
				numOfOperation += array.length - 1
			}
		}).bind(this))
		
		data.queryType = dataOperation.queryType
		
		if(array == null){
			
			if(dataOperation.singleQuery != undefined){
				this.sendSingeQuery(data, localData.dataToStore)
			} else {
				this.sendQuery(data, localData.dataToStore)
			}		
			
		} else {
			$.each(array, function(i, value){
				data[arrayParameterName] = value
				this.sendQuery(data, localData.dataToStore)
			})
		}
	},
	
	sendQuery : function(data, dataToStore){
		
		$.ajax({
			dataType : "json",
			url : baseUrl + "dataLoader",
			data : data,
		}).done((function(result){
			$.merge(dataToStore, result)
			this.checkReady()
		}).bind(this))
	},

	sendSingleQuery : function(data, dataToStore){
		
		$.ajax({
			dataType : "json",
			url : baseUrl + "dataLoader",
			data : data,
		}).done((function(result){
			dataToStore = result[0].object
			this.checkReady()
		}).bind(this))
	},

	extract : function(dataOperation, localData){
		
		if(dataOperation.toNewVariable != undefined){
			from = $.extend({}, this.evaluate(localData, dataOperation.from))
		} else {
			console.log(localData)
			//from = this.evaluate(localData, dataOperation.from)
			from = localData.dataToStore
		}
		
		what = this.evaluate(localData, dataOperation.what)
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
		this.checkReady()
	},

    merge : function(process, localData){
		$.merge(localData.dataToStore, this.evaluate(localData, process.what))
		this.checkReady()
	},

   group : function(process, localData) {

		var arr = []
		var obj = new Object()

		inputArray = localData.dataToStore
		
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
		this.checkReady()
	},

	checkReady : function(){
		
		this.current++ 
		if(this.current == this.numOfOperation){
			this.current = 0
			this.numOfOperation = 1
			this.opCounter++ 
			if(this.opCounter < this.array.length){
				var localData = {
						pageData : pageData,
				}
				this.prepareLocalData(this.array[this.opCounter], 0, localData)	
			} else {
				this.pageInit.done()
			}
		}
	},

	evaluate : function(localData, dataDef){
		
		if(DataLib.getType(dataDef) != "object"){
			var arr = dataDef.split(".")
			switch(arr.length){
				case 1 : 
					return localData.dataToStore[arr[0]]
				case 2 : return  localData[arr[0]][arr[1]]
			}
		} else { 
			switch(dataDef.type){
			
			case "http://softwareOntology.com/local" :
				return localData[dataDef.varName][dataDef.key]
			case "http://softwareOntology.com/Field" :
				return this.evaluate(localData, dataDef.of)[this.evaluate(localData, dataDef.key)]
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
}