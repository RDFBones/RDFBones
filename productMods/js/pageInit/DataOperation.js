
var DataOperation = {
		
	perform : function(pageInit){
		
		if(pageData.dataOperations != undefined){
			$.each(pageData.dataOperations, (function(index, operation){
				
				switch(operation.type){
				
				case "grouping" : 
					this.group(operation.processes, 0, pageData)
					break;
				case "mergeArrays" :
					this.mergeArrays(operation)
					break;
				case "a" : 
					this.selection(operation)
					break
				default : break;
				}
			}).bind(this))
		}
		pageInit.done()
	},
	
	selection : function(operation){
	
		var result = []
		$.each(pageData[operation.input], function(index, value){
			if(value[operation.onField] == operation.filterValue){
				result.push(value)
			}
		})
		pageData[operation.toVariable] = result
	},

	mergeArrays : function(operation){

		pageData[operation.output] = pageData[operation.arrays[0]].concat(pageData[operation.arrays[1]])
	},

	group : function(processArray, i,  inputObject){
	
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
				DataOperation.group(processArray, i, object)
			})
		}
	}	
}