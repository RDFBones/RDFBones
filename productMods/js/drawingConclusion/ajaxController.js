

class DTAJAX {

	static callWithout(object){
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataTransformationAJAX",
			data : "requestData=" + JSON.stringify(
					$.extend(object, {editKey : editKey, subjectUri : subjectUri}))
		})
	}
	
	static call(object, returnFunction, flag){
		
		if(returnFunction === undefined){
			returnFunction = function(){}
		}
		PopUpController.init("Please wait")
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "drawingConclusionAJAX",
			data : "requestData=" + JSON.stringify(
					$.extend(object, {editKey : editKey, subjectUri : subjectUri}))
		}).done((function(msg) {
			if(returnFunction != undefined){
				returnFunction(msg)
			}
			if(flag === undefined){
				PopUpController.done()	
			}
		}).bind(this))
	}
	
}