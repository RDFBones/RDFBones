/*
 * David Konkoly   <konkoly.david@gmail.com>
 * 
 */


var dataLibrary = {

	/*
	 * This function helps to get the element of an array
	 * which contains a map
	 */
	removeElementFromMapArray : function(array, key, valueToFind){
		
		$.each(array, function(index, value){
			if(value[key] == valueToFind){
				array.splice(index, 1)
				return false
			}
		})
	}
}


var ui = {
		
	getNewDiv : function(){
		 return $("<div/>")
	},
	
	
	getNewDiv : function(classes){
		 return $("<div/>").addClass(classes)
	},

	getNewDivT : function(text){
		 return $("<div/>").text(text)
	},
	getNewDiv : function(classes, text){
		 return $("<div/>").addClass(classes).text(text)
	},

	getSelectorField : function(){
		return selector = $("<select/>" , {
			class : "" ,
		})
	},
	
	selectorFieldWithout : function(dataset, value, text){
		
		var selector = this.getSelectorField()
		this.selectorField(dataset, value, text, selector)
		return selector
	},
	
	createSelectorFieldWith : function(dataset, value, text, selectorMsg){
		
		var sel = this.getSelectorField()
		$("<option/>" , {
			text : selectorMsg
		}).appendTo(sel) 
		this.selectorField(dataset, value, text).appendTo(sel)
		return sel
	},
	
	selectorField : function(dataset, value, text, selector){
		$.each(dataset, function(index, data){
			$("<option/>" , {
				value : data[value] ,
				text : data[text] ,
			}).appendTo(selector) 
		})
		
	}
		
}
