

class DTAJAX {
	
	static addInput(dt, inputUri){
		
		var object = {
			dataTransformation : dt,
			input : inputUri,
			task : "addInput",
		}
		this.callWithout(object)
	}

	static removeInput(dt, inputUri){
		
		var object = {
			dataTransformation : dt,
			input : inputUri,
			task : "removeInput",
		}
		this.callWithout(object)
	}
	
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
			if(flag === undefined){
				PopUpController.done()	
			}
		}).bind(this))
	}
	
}