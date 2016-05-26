

/*
 * 
 * The peculiarity of this DataController that it has to call the 
 * parent data controller class as add because the data entry is 
 * just a single element. It does not have Save and Cancel button.
 * 
 */

var DataEntryDataController = function(dataField, newVar, property, parentDataController){
	
	DataController.call(this, dataField, newVar, property, parentDataController)
}

DataEntryDataController.prototype = Object.create(DataController.prototype)

var dataEntryControllerMethod = {
	
	add : function(){
		
		this.parentDataConroller.add()
	},
	
	remove : function(){
		this.parentDataConroller.remove()
	}

}

$.extend(DataEntryDataController.prototype, dataEntryControllerMethod)
