var communication = {

	getInstances: function(classUri){
		
		$.ajax({
            url: customFormData.newUrl,
            dataType: 'json',
            data : {
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
}

var showElements = {
		
		showResults : function(jsonArray){
			
			$.each(jsonArray, function(entryIndex, entryObject){
				//Create the two divs
				var div = $('<div/>').addClass("dataContainer")
				var div1 = $('<div/>').addClass("data").appendTo(div)
				var div2 = $('<div/>').addClass("data").appendTo(div)
				
				$.each(customFormData.listView, function(fieldIndex, fieldValue){
					var cellList = entryObject[fieldValue.name];
					//Fill the cell with the data
					$.each(cellList, function(index, cellObject){
						switch(fieldValue.type){
						
						case "http://myDisplayOntology.org#LinkField" : 
							
							div1.append(fieldElements.linkField(cellObject.value, cellObject.uri))
							break;
						case "http://myDisplayOntology.org#ImageField" : 
							
							div2.append(fieldElements.imageField(cellObject.fileName, cellObject.mimeType, cellObject.url))
							break;
						}
					})
				})
				div.appendTo(elements.elementList)
			});	
		}
}
var elements = {
	
	onLoad: function(){
		this.initObjects();
		this.initEventListeners();
	},
	
	initObjects: function(){
	
		this.choose = $('#choose')	
		this.newSelector = $('#newSelector')
		this.existingSelector = $("#existingSelector")
		this.newForm = $("#newForm")
		this.existingForm = $("#existingForm")
		this.backButton = $(".backButton")
		this.elementList = $('#elementList')
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
			this.elementList.empty()
		})
	}
}	

elements.onLoad()

var fieldElements = {
	
	linkField : function(value, uri){
		
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
			var container = "<div class='sideByside'>" + filename + "</div>"
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