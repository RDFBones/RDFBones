
var DataOperations = {

	getLeafNodes : function(object) {
		var returnArray = []
		var initial
		if (DataLibrary.isArray(object)) {
			initial = object
		} else {
			/*
			 * It right now I assume by the children dataset that is in the
			 * children field. We could program the application later that we
			 * create a new instance of the getLeadNodes class/function and we
			 * set the parameters to handle.
			 */
			initial = object.children
		}
		// We have to return the last objects. Depth first search
		$.each(initial, function(index, value) {
			console.log("children")
			dataOperations.helper1(value, returnArray)
		})
		console.log(returnArray)
		return returnArray
	},

	helper1 : function(object, returnArray, n, k) {
		if (object.children === undefined || object.children.length == 0) {
			returnArray.push(object)
		} else {
			$.each(object.children, function(index, value) {
				dataOperations.helper1(value, returnArray)
			})
		}
	},

	treeStructureLevel : function(treeStructure, n) {

		var returnArray = []
		var k = 1;
		// We have to return the last objects. Depth first search
		$.each(treeStructure.children, function(index, value) {
			console.log("children")
			dataOperations.helper2(value, returnArray, n, k)
		})
		return returnArray
	},

	helper2 : function(object, returnArray, n, k) {

		if (n == k) {
			returnArray.push(object)
		} else {
			k++
			if (object.children != undefined) {
				$.each(object.children, function(index, value) {
					dataOperations.helper2(value, returnArray, n, k)
				})
			}
			k--
		}
	},

	joinTables : {

		inputParameters : [ {
			name : "table1",
			type : "Object"
		}, {
			name : "table2",
			type : "Object"
		} ],

		code : function(table1, table2) {

			var results = new Object()
			$.each(table1, function(key, value) {
				if (key in table2) {
					results[key] = new Object()
					$.extend(results[key], table2[key])
					$.extend(results[key], value);
				}
			})
			return results
		},
	},

	groupToArray : function(def, data) {
		var toReturn = new Object()
		$.each(data, function(key, value) {
			if (!(value[def.by] in toReturn)) {
				toReturn[value[def.by]] = []
			}
			var obj = new Object()
			$.each(value, function(key, value) {
				if (key != def.by) {
					obj[key] = value
				}
			})
			toReturn[value[def.by]].push(obj)
		})
		return toReturn
	},

	groupToObject : function(def, array) {
		var toReturn = new Object()
		$.each(array, function(key, object) {
			toReturn[object[def.by]] = new Object()
			$.each(object, function(key, field) {
				if (key != def.by) {
					toReturn[object[def.by]][key] = field
				}
			})
		})
		return toReturn
	},

	groupArray : (function(def, value) {
		var toReturn = new Object()
		return PageConfiguration["dataOperation"][def.type](def,
				PageData[def.dataKey])

	}).bind(this),

	groupArrayOfObject : function(inputArray, def) {
		var toReturn = new Object()
		$.each(inputArray, function(key, array) {
			toReturn[key] = PageConfiguration["dataOperation"][def.type](def,
					array)
		})
		return toReturn
	},

	/*	p1 : array, p2 : filterBy, p3, same : [a,b], p4 :toArray
	 *   array of object : { a,b,c,d } 
	 *   { a : {
	 *   	b : "
	 *   	p4 : [
	 *   	{ c, d}
	 *   	]	
	 *   }
	 *   }
 	 */ 

	twoLevelGroupArrayToObject : function(inputArray, filterBy1, same1 , toArray1,
			filterBy2, same2, toArray2){
	
		//First Level 
		toReturn = DataOperations.groupArrayToObject(inputArray, filterBy1, same1, toArray1)
		$.each(toReturn, function(index, value){
			value[toArray1] = DataOperations.groupArrayToObject(value[toArray1], filterBy2, same2, toArray2)
		})
		return toReturn
	},
	
	
	groupArrayToObject : function(inputArray, filterBy, same , toArray){
		
		var toReturn = new Object()
		$.each(inputArray, function(index,value){
			if(!(value[filterBy] in toReturn)){
				toReturn[value[filterBy]] = new Object()
				toReturn[value[filterBy]][toArray] = []
				$.each(same, function(index, s){
					toReturn[value[filterBy]][s] = value[s]
				})
			}
			var add = new Object()
			$.each(value, function(fieldKey, fieldValue){
				if(same.indexOf(fieldKey) == -1){
					add[fieldKey] = fieldValue
				}
			})
			toReturn[value[filterBy]][toArray].push(add)
		})
		return toReturn
	},
	
	selectIntoTwo : function(array, array1, array2, field) {

		$.each(array, function(index, value) {
			if (value[field] != null) {
				array1.push(value)
			} else {
				array2.push(value)
			}
		})
	}
}

var getDataType = function() {

	if (DataLib.typeCheck(dataDescriptors.bonesOfSkeletalInvetoryByClass, [
			"listmap", "list" ])) {
	}
}
