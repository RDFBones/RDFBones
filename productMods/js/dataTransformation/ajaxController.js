

class DTAJAX {
	
	static addInput(dt, inputUri){
		
		var object = {
			dataTransformation : dt,
			inputUri : inputUri,
			task : "addInput",
		}
		this.call(object)
	}

	static removeInput(dt, inputUri){
		
		var object = {
			dataTransformation : dt,
			inputUri : inputUri,
			task : "removeInput",
		}
		this.call(object)
	}
	
	static call(object, returnFunction){
		
		PopUpController.init("Please wait")
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataTransformationAJAX",
			data : "requestData=" + JSON.stringify(
					$.extend(object, {editKey : editKey, subjectUri : subjectUri}))
		}).done((function(msg) {
			if(returnFunction != undefined){
				returnFunction(msg)
			}
			PopUpController.done()
		}).bind(this))
	}
	
}