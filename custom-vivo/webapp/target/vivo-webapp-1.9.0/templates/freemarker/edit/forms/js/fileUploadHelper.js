var setByFile = false;
var infoOnceShown = false;

$("#datafile").change(function(){
	console.log($(this).val());
	if($(this).val()){	
			$("#fileDescriptionDiv").show();
	} else {
		$("#fileDescription").val("");
		$("#fileDescriptionDiv").hide();
	}
	
	if( setByFile == false){
		if(!infoOnceShown) {
			$("#infoMsg").show();
			infoOnceShown = true;
		}
		$("#labelInput").val($(this).val().replace(/^.*[\\\/]/, ''));
	} else {
		$("#infoMsg").hide();
	}
});	
	
$("#labelInput").change(function(){
	
	$("#infoMsg").hide();
	if( ! ($(this).val()) ) {
		console.log("null");
		setByFile = false;	
	} else {
		setByFile = true;
	}
});