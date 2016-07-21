


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
	    
		if(typeof newQueryDefinition != "undefined"){
			$.merge(this.operationArray, newQueryDefinition)
		}
		this.array = []
		
		if(typeof customPageDataOperations != "undefined"){
			$.merge(this.operationArray, customPageDataOperations)
		}
		console.log(this.operationArray)
		$.each(this.operationArray, (function(i, element){
		//$.each(customDataOperations, (function(i, element){
			this.array.push(this.generateArray(element))
		}).bind(this))
	},
		
	perform	: function(){
		
		var localData = {
				pageData : pageData,
		}
		if(this.array.length > 0){
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
				if(def.operation.type != undefined){
					a.type = def.operation.type
				} else {
					a.type = "array"
				}
				array.push(a)
				return false
			} 
			array.push(a)
		})
		return array
	},

	prepareLocalData : function(dataQueue, level, localData) {

		if(dataQueue[level].operation != undefined){
			
			if(localData[dataQueue[level].of][dataQueue[level].key] === undefined){
				if(dataQueue[level].type == "object" || dataQueue[level].operation.sortBy != undefined){
					localData[dataQueue[level].of][dataQueue[level].key] = new Object()
				} else { //Array
					localData[dataQueue[level].of][dataQueue[level].key] = []
				}
			} else {
				if(localData[dataQueue[level].of][dataQueue[level].key].dataOperation != undefined){
					if(dataQueue[level].type == "object" || dataQueue[level].operation.sortBy != undefined){
						localData[dataQueue[level].of][dataQueue[level].key] = new Object()
					} else { //Array
						localData[dataQueue[level].of][dataQueue[level].key] = []
					}
				}
				//console.log(dataQueue[level].of + "   "  + dataQueue[level].key)
			}
			
			localData[dataQueue[level].key] = localData[dataQueue[level].of][dataQueue[level].key]			
			this.performOperation(dataQueue, level, localData)
		} else {
			levelPlus = level + 1
			
			
			var arrayName = null
			if(dataQueue[level].key.indexOf("[") > -1){
				arrayName = dataQueue[level].key.cutFromCharacter("[")
				num = dataQueue[level].key.getArrayNumber()
				obj = localData[dataQueue[level].of][arrayName][num]
				dataQueue[level + 1].of = arrayName
				dataQueue[level].key = arrayName
			} else {
				obj = localData[dataQueue[level].of][dataQueue[level].key]
			}
			
			switch(type(obj)){
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
				
				if(arrayName != null){
					localData[arrayName] = localData[dataQueue[level].of][arrayName][num]
				} else {
					localData[dataQueue[level].key] = localData[dataQueue[level].of][dataQueue[level].key]
				}
				
				if(dataQueue[level + 1].key == "keys"){
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
			   default : 
				   this.numOfOperation--
				   break;			
			}
		}
	},

	performOperation : function(dataQueue, level, localData) {

		dataOperation = dataQueue[level].operation
		//We create a reference
		localData.dataToStore = localData[dataQueue[level].key]
		if(level == 0){
			localData["this"] = pageData
		} else {
			localData["this"] = localData[dataQueue[level - 1].key]
		}
		
		switch(dataOperation.dataOperation){
			case "query" :
				this.performQuery(dataOperation, localData, dataQueue, level)
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
			case "sortToKey" :
				this.sortToKey(dataOperation, localData)
				break;
			case "selection" :
				this.selection(dataOperation, localData)
			default : break;
		}	
	}, 

	 performQuery : function(dataOperation, localData, dataQueue, level){
		
		 
		var flag = false
		var data = new Object()
		array = null
		$.each(dataOperation.parameters, (function(i, param){
			data[param.name] = this.evaluate(localData, param.value)
			if(typeof data[param.name] == "undefined"){
				flag = true
				return false
			}
			if(DataLib.getType(data[param.name]) == "array"){
				array = data[param.name]
				arrayParameterName = param.name
				this.numOfOperation += array.length - 1
			}
		}).bind(this))
		
		if(flag){
			this.checkReady()
			return false
		}
		
		data.queryType = this.getQueryVariable(dataOperation.queryType, localData)
		
		if(array == null){
			if(dataOperation.singleQuery != undefined){
				this.sendSingleQuery(data, localData["this"], dataQueue[level].key)
			} else {
				this.sendQuery(data, localData.dataToStore, dataOperation)
			}		
		} else {
			$.each(array, (function(i, value){
				data[arrayParameterName] = value
				this.sendQuery(data, localData.dataToStore, dataOperation)
			}).bind(this))
		}
	},
	
	sendQuery : function(data, dataToStore, dataOperation){
		
		$.ajax({
			dataType : "json",
			url : baseUrl + "dataLoader",
			data : data,
		}).done((function(result){

			if(dataOperation.sortBy != undefined){
				var sortBy = dataOperation.sortBy
				$.each(result, function(i, object){
					if(dataToStore[object[sortBy]] === undefined){
						dataToStore[object[sortBy]] = []
					}
					dataToStore[object[sortBy]].push(object)
				})
			} else {
				$.merge(dataToStore, result)
			}
			this.checkReady()
		}).bind(this)).fail((function(){
			this.sendQuery(data, dataToStore, dataOperation)
		}).bind(this))
	},

	sendSingleQuery : function(data, object, key){
		
		$.ajax({
			dataType : "json",
			url : baseUrl + "dataLoader",
			data : data,
		}).done((function(result){
			object[key] = result[0].object
			this.checkReady()
		}).bind(this))
	},

	
	getQueryVariable : function(queryDef, localData){
		
		if(type(queryDef) == "object"){
			if(queryDef.type == sw.switchCase){
				
				on = this.evaluate(localData, queryDef.on)
				if(on != "" && on != undefined){
					toReturn = null
					$.each(queryDef.cases, function(i, _case){
						if(_case.value == on){
							toReturn = _case.toReturn
							return false
						}
					})
					return toReturn
				} else {
					return queryDef.defaultCase
				}
				
			} else {
				return null
			}
		} else {
			return queryDef
		}
	},
	
	extract : function(dataOperation, localData){
		
		if(dataOperation.toNewVariable != undefined){
			from = $.extend({}, this.evaluate(localData, dataOperation.from))
		} else {
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

	sortToKey : function(process, localData){
		
		$.each(this.evaluate(localData, process.object), function(i, object){
			
			if(localData.dataToStore[object[process.by]] === undefined){
				localData.dataToStore[object[process.by]] = []
			}
			localData.dataToStore[object[process.by]].push(object)
		})
		this.checkReady()
	},
	
	
	selection : function(process, localData){
		
		
		object = this.evaluate(localData, process.object)
		key = this.evaluate(localData, process.by)
		
		if(object != undefined && object != undefined){
			arr = object[key]
		}
		
		if(arr != undefined){
			$.merge(localData.dataToStore, arr)
		}
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
		if(this.current >= this.numOfOperation){
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
				case 2 : 
					if(localData[arr[0]][arr[1]] != undefined){
						return  localData[arr[0]][arr[1]]	
					} else {
						return undefined
					}
				case 3 : 
					if(localData[arr[0]][arr[1]][arr[2]] != undefined){
						return  localData[arr[0]][arr[1]][arr[2]]	
					} else {
						return undefined
					}
				case 4 : 
					if(localData[arr[0]][arr[1]][arr[2]][arr[3]] != undefined){
						return  localData[arr[0]][arr[1]][arr[2]][arr[3]]
					} else {
						return undefined
					}	
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