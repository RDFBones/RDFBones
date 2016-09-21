

var SingleBoneCEFController = function(){
	
	this.container = html.div()
	this.dataToStore = []
	
	this.content = html.div()
	this.saveContainer = html.div("upperBorderContainer")
	this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
	this.cancelButton = new TextButton("Cancel", (this.cancelRoutine).bind(this))

	this.init()
	this.assemble()
}


SingleBoneCEFController.prototype = {
		
	assemble : function(){
		
		UI.assemble(this.container,[
		      this.content, 
		      this.saveContainer,
		      	this.saveButton.container,
		      	this.cancelButton.container], [0, 0, 1, 1])
	},

	init : function(){
		
		var arr = []
		if(type(pageData.classesToSelect) == "object"){
			arr.push(pageData.classesToSelect)
		 } else if (type(pageData.classesToSelect) == "array"){
			 arr = pageData.classesToSelect
		 }	
		
		$.each(arr, (function(i, object){
			switch(object.uiType){
			
			case "partlySymmetric" :
				this.addToContent(new PartlySymmetric(object, this.dataToStore).container)
				break;
			case "default" :
				this.addToContent(new DefaultSingleBone(object, this.dataToStore).container)
				break;
			case "primary" :
				this.addToContent(new Primary(object, this.dataToStore).container)
				break;
			case "singleBone" :
				this.addToContent(new SingleBoneOrganAdder(object, this.dataToStore).container)
				break;
			default : break;
			}	
		}).bind(this))
	},
	
	addToContent : function(cont){
		
		this.content.append(cont)
	},
	
	saveRoutine : function(){
		//Check if we have any entry 
		if(this.dataToStore.length == 0){
			alert("You must add at least one bone organ!")
		} else {
			this.sendData()
		}
	},

	sendData : function(){
		
		var toSend = {
				operation : "addSingleBoneRegion",
				individual : pageData.individual,
				skeletalRegion : pageData.classesToSelect.uri,
				skeletalDivisionClass : pageData.skeletalDivisionClass,
				boneOrgan : this.dataToStore
			}
			console.log(toSend)
			PopUpController.init()
			
			$.ajax({
				type : 'POST',
				context : this,
				dataType : 'json',
				url : baseUrl + "dataInput",
				data : "dataToStore=" + JSON.stringify(toSend)
			}).done((function(msg) {
					
				var urlObject = {
					pageUri : "skeletalInventory",
					individual : pageData.individual,
				}
				
				window.location = baseUrl
						+ "pageLoader?"
						+ DataLib.getUrl(urlObject)
			}).bind(this))
		
	},
	
	cancelRoutine : function(){
		var urlObject = {
				pageUri : "skeletalInventory",
				individual : pageData.individual,
			}
		
		window.location = baseUrl
				+ "pageLoader?"
				+ DataLib.getUrl(urlObject)
		
	}
	
}