
var DataOperation = {

	perform : function(pageInit) {

		if (pageData.dataOperations != undefined) {
			$.each(pageData.dataOperations, (function(index, operation) {

				switch (operation.type) {

				case "grouping":
					this.group(operation.processes, 0,
							pageData[operation.processes[0].inputVariable])
					break
				case "groupList":
					this.groupList(operation.processes, pageData)
					break;
				case "mergeArrays":
					this.mergeArrays(operation)
					break;
				case "a":
					this.selection(operation)
					break
				case "extraction" :
					this.extraction(operation)
					break
				case sw.arrayOfObjectArray:
					pageData[operation.toVariable] = getData1(operation)
				default:
					break;
				}
			}).bind(this))
		}
		pageInit.done()
	},

	selection : function(operation) {

		var result = []
		$.each(pageData[operation.input], function(index, value) {
			if (value[operation.onField] == operation.filterValue) {
				result.push(value)
			}
		})
		pageData[operation.toVariable] = result
	},

	mergeArrays : function(operation) {

		pageData[operation.output] = pageData[operation.arrays[0]]
				.concat(pageData[operation.arrays[1]])
	},

	groupList : function(processArray, inputObject) {

		$.each(inputObject[processArray[0].inputVariable], (function(index,
				array) {
			this.group(processArray, 0, array)
		}).bind(this))
	},

	group : function(processArray, i, inputArray) {

		var arr = []
		var obj = new Object()

		var process = processArray[i]

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

			// Rename the fields according to the process defintion
			$.each(value, function(dataKey, dataValue) {
				$.each(process.rename, function(r, rename) {
					if (rename.key == dataKey) {
						delete value[dataKey]
						value[rename.to] = dataValue
					}
				})
			})
			inputArray.push(value)
		})	
		
		i++
		if(processArray[i] != undefined){
			$.each(inputArray, function(index, object) {
				DataOperation.group(processArray, i,
						object[processArray[i].inputVariable])
			})			
		}
	},

	"http://softwareOntology.com/fieldsOfArray" : function(config) {
		pageData[config.toVariable] = getData1(config)
	},

	extraction : function(config) {

		from = getData1(config.from)
		arrayToExtract = []
		//array of object
		what = getData1(config.what)
		if(DataLib.getType(what[0]) == "object"){
			arrayToExtract = what
		} else { //array of array
			//we have to concatenate the arrays
			$.each(what, function(i, element){
				arrayToExtract = arrayToExtract.concat(element)
			})
		}
		
		$.each(arrayToExtract, function(k, toExtract){
			DataLib.removeObjectFromArrayByKey(from, config.fromBy, toExtract[config.whatBy])
		})
		
	}
}


