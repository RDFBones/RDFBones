

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
		
		object.subjectUri = subjectUri
		if(testOn[object.task]) {
			console.log("AJAX call object :")
			DataLib.debugObject(object)
			returnFunction(testData[object.task])
		} else {
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
}

var dt1 = {
		dataTransformationType : "http://w3id.org/rdfbones/extensions/FrAgeEst#DataTransformation.Fr.AgeEst.CoronalSuture2",
		dataTransformation : "345677",
		uri : "1234",
		measurementDatum :	{
			type : "FrAgeEst#ABC",
			dataType : "http://www.w3.org/2001/XMLSchema#float",	
			value : "0.00",
		}
}

var dt2 = {
	
	dataTransformationType : "http://w3id.org/rdfbones/extensions/FrAgeEst#DataTransformation.Fr.AgeEst.CoronalSuture2",
	dataTransformation : "345677",
	measurementDatum :	{
		type : "FrAgeEst#XYZ",
		catLabType : "FrAgeEst#MeasDatumType",
		value : "123456",
		instances : [
			{ uri : "13456", label : "First Instance"},
			{ uri : "13457", label : "Second Instance"},
		]}
	}

var testData = {
	outputType : dt2	
}

var testOn = {
	outputType : false,
	del : false,
	inputs : false,
}
