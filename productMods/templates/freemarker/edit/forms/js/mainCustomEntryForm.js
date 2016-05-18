var communication = {

	getInstances: function(){
		
		$.ajax({
            url: customFormData.newUrl,
            dataType: 'json',
            data : {
            	cmd : "getInstances",
            	subjectUri : customFormData.subjectUri ,
            	predicateUri : customFormData.predicateUri ,
            	customEntryFormUri : 	customFormData.customEntryFormUri , 
            },
            complete: function(xhr, status) {
               
            	var results = $.parseJSON(xhr.responseText);
            	console.log(results);
            	showElements.showResults(results);
            }
    	})
	},
	
	
	saveInstance : function(objectUri, div){
		
		elements.waitForResponse.show();
		$.ajax({
            url: customFormData.newUrl,
            dataType: 'json',
            data : {
            	cmd : "saveInstance",
            	subjectUri : customFormData.subjectUri ,
            	predicateUri : customFormData.predicateUri ,
            	objectUri : objectUri,
            },
            complete: function(xhr, status) {
               
            	var response = $.parseJSON(xhr.responseText)
            	elements.waitForResponse.hide()
            	div.remove()
            	alert("Saved")
            }
    	})
	}
} 

var showElements = {
		
		showResults : function(jsonArray){
			$.each(jsonArray, function(entryIndex, entryObject){
				//Create the two divs
				var skip = false;
				var entryDiv = $('<div/>').addClass("dataContainer")
				$.each(customFormData.listView, function(fieldIndex, fieldValue){
					var cellList = entryObject[fieldValue.name];
					//Fill the cell with the data
					var fieldDiv = $('<div/>').addClass('data')
					if(cellList.length == 0 && fieldValue.name == "image" ){
						var fieldArrayDiv = $('<div/>').addClass("sideByside")
						fieldArrayDiv.append(fieldElements.linkField("", "", entryObject["mainObjectUri"]))
						fieldDiv.append(fieldArrayDiv)
					}
					$.each(cellList, function(index, cellObject){
						var fieldArrayDiv = $('<div/>').addClass("sideByside")
						switch(fieldValue.type){
						
						case "http://myDisplayOntology.org#LinkField" : 
							if(cellObject.value.indexOf("per") > -1 || cellObject.value == ""){
								console.log("indexOf "  + cellObject.value.indexOf("per"))
								console.log("cellObject.value == " + cellObject.value)
								skip = true
							}
							fieldArrayDiv.append(fieldElements.linkField(cellObject.value, cellObject.uri, entryObject["mainObjectUri"]))
							break;
						case "http://myDisplayOntology.org#ImageField" : 
							
							fieldArrayDiv.append(fieldElements.imageField(cellObject.fileName, cellObject.mimeType, cellObject.url))
							break;
						}
						fieldDiv.append(fieldArrayDiv)
					})
					entryDiv.append(fieldDiv)
				})
				console.log("Skip : " + skip)
				if(!skip){
					entryDiv.appendTo(elements.elementList).click(function(){
						communication.saveInstance(entryObject["mainObjectUri"], this)
					})
				}
			});	
		}
}


var fieldElements = {
	
	linkField : function(value, linkUrl, uri){
		
		if(value == ""){
			value = uri
		}
		console.log("linkField :  name - " + value + " uri - " + uri)
		var container = "<div>" +
							"" + value + "" +
						"</div>"
		return container
	}, 

	imageField : function(fileName, mimeType, url){
	
		console.log("imageField :  fileName - " + fileName + " mimeType - " + mimeType + " url - " + url)
		var container = "<div>"
		var m = mimeType.toUpperCase();
		if(m == ".JPG" || m == ".PNG" || m == ".JPEG"){
			container = "" +
					"<div class='sideByside'>  " +
					"	<img style='margin-left: 10px; width:100px; height:100px; ' " +
					"		src='" + customFormData.urlBase + url + "'>" +
					"</div> ";
		} else {
			//Only the fileName is shown
			var container = "<div class='sideByside'>" + fileName + "</div>"
		}
		//The downloadLink is show anyway
		container += "<div class='sideByside'> " +
					"	<a href='" + customFormData.urlBase + url + "' download style='color:white'>" +
					" 		<img style='width:12px; height:12px; margin-left: 10px;' " +
					"			src='" + customFormData.urlBase + "/images/individual/download-icon.png' >" +		
				    " 	</a>" +
				    " </div>"
		container +="</div>"
		return container		
	}
}

var uiAction = {
	
	
	showList : function(){
		
		
	},
	
	showChoiceAgain : function(){
		elements.choose.show()
		elements.newForm.hide()
		elements.existingForm.hide()
	},
	
	showExistingForm : function(){
		
		this.hideSelectors();
		this.showForm("existing");
	},
	
	showNewForm : function(){
		
		this.hideSelectors();
		this.showForm("new");
	},
	
	hideSelectors : function(){
		elements.choose.hide()
	},
	
	showForm : function(formType){
		switch(formType){
			case "new" :
				elements.newForm.show()
				break
			case "existing" :
				elements.existingForm.show()
				break
		}
	}
}

var elements = {
	
	onLoad: function(){
		this.initObjects();
		if(customFormData.objectUri != null){
			this.showOnlyForm()
		} else {
			this.initEventListeners();
		}
	},
	
	initObjects: function(){
	
		this.choose = $('#choose')	
		this.newSelector = $('#newSelector')
		this.existingSelector = $("#existingSelector")
		this.newForm = $("#newForm")
		this.existingForm = $("#existingForm")
		this.backButton = $(".backButton")
		this.elementList = $('#elementList')
		this.waitForResponse = $('#waitForResponse')
	},

	initEventListeners : function(){
		
		this.newSelector.click(function(){
			uiAction.showNewForm();
		})
		
		this.existingSelector.click(function(){			
			uiAction.showExistingForm()
			communication.getInstances()
		})
		
		this.backButton.click(function(){
			uiAction.showChoiceAgain()
			elements.elementList.empty()
		})
	},
	
	showOnlyForm : function(){
		uiAction.showNewForm()
		this.backButton.hide()
	}
}	

elements.onLoad()

