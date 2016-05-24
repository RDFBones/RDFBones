
var offlineTest = false 

var currentTestData = null

var AJAXController = {
		
	getData : function(inputData, returnObject){
		if(!offlineTest){
			$.ajax(inputData).done(
				(function(results){
					returnObject.returnRoutine($.parseJSON(results))
				}).bind(returnObject))
		} else {
			returnObject.returnRoutine(currentTestData)
		}
	}
	
}